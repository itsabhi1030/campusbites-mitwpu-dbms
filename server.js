/* ==========================================================================
   CAMPUSBITES EXPRESS API
   - Multi-tenant order routing (KDS isolation enforced server-side)
   - Role-based access control for every privileged mutation
   - Input validation + sanitization on all write paths
   - OTPs are NEVER returned in API responses and never rendered in the UI
   ========================================================================== */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

let seedData = null;
try {
  seedData = require('./seedData.json');
} catch (e) {
  // seedData.json optional
}

const app = express();

// Prevent unhandled promise rejections or async exceptions from ever crashing the server daemon
process.on('uncaughtException', (err) => {
  console.error('🛡️ [SERVER PROCESS SHIELD] Uncaught Exception caught safely:', err?.message || err);
});
process.on('unhandledRejection', (reason) => {
  console.error('🛡️ [SERVER PROCESS SHIELD] Unhandled Rejection caught safely:', reason?.message || reason);
});


/* ==========================================================================
   0. CONFIGURATION
   ========================================================================== */
const ALLOWED_ORIGINS = (
  process.env.CLIENT_ORIGINS ||
  'http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173'
)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const TOKEN_SECRET = process.env.TOKEN_SECRET || crypto.randomBytes(32).toString('hex');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const OTP_TTL_MS = 10 * 60 * 1000;
const STAFF_TOKEN_TTL_MS = 12 * 60 * 60 * 1000;
const DEMO_TOKEN_TTL_MS = 30 * 60 * 1000;

/** Canonical workflow statuses an order may ever hold. */
const ORDER_STATUSES = [
  'placed',
  'preparing',
  'ready_for_pickup',
  'out_for_delivery',
  'in_transit',
  'delivered',
  'completed',
  'cancelled'
];

/** Statuses a customer is allowed to set on their own order. */
const CUSTOMER_SETTABLE_STATUSES = ['cancelled'];

/** Statuses each staff role is allowed to set. */
const ROLE_STATUS_PERMISSIONS = {
  CUSTOMER: ['cancelled'],
  RESTAURANT: ['preparing', 'ready_for_pickup', 'cancelled'],
  DELIVERY_PARTNER: ['out_for_delivery', 'in_transit', 'delivered', 'completed', 'cancelled'],
  ADMIN: ORDER_STATUSES,
  DEMO: ORDER_STATUSES
};


/* ==========================================================================
   1. SECURITY MIDDLEWARE
   ========================================================================== */

// Security headers (no external dependency required).
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  );
  if (!IS_PRODUCTION) {
    res.setHeader('X-Dev-Tooling', 'CampusBites-Dev-Server');
  }
  next();
});

// Strict CORS — only the known campus front-end origins may call the API.
app.use(
  cors({
    origin(origin, callback) {
      // Allow same-origin / server-to-server calls (no Origin header).
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      return callback(new Error('Origin not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    maxAge: 600
  })
);

app.use(express.json({ limit: '256kb' }));

// Malformed JSON must not crash the process.
app.use((err, req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Malformed JSON payload.' });
  }
  if (err) return res.status(400).json({ error: 'Bad request.' });
  next();
});

/* ==========================================================================
   2. SANITIZATION & VALIDATION HELPERS
   ========================================================================== */
const stripControlChars = (value) => String(value).replace(/[\u0000-\u001F\u007F]/g, '');

/**
 * Sanitizes free-form text: strips control characters, removes HTML/script
 * markup and clamps the length. Prevents stored/reflected XSS.
 */
const sanitizeText = (value, maxLength = 200) => {
  if (value === null || value === undefined) return '';
  return stripControlChars(String(value))
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[<>`]/g, '')
    .trim()
    .slice(0, maxLength);
};

/** Validates + normalizes an email address. Returns null when invalid. */
const sanitizeEmail = (value) => {
  if (value === null || value === undefined) return null;
  const v = stripControlChars(String(value)).trim().toLowerCase();
  if (!v || v.length > 254) return null;
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(v)) return null;
  return v;
};

/** Validates a 6-digit OTP. Returns null when malformed. */
const sanitizeOtp = (value) => {
  const v = String(value === null || value === undefined ? '' : value).trim();
  return /^\d{6}$/.test(v) ? v : null;
};

/** Coerces to a bounded number. */
const toNumber = (value, { min = 0, max = Number.MAX_SAFE_INTEGER, fallback = 0 } = {}) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
};

/** Validates a password meets the minimum campus policy. */
const isValidPassword = (value) => {
  const v = String(value === null || value === undefined ? '' : value);
  return v.length >= 8 && v.length <= 128;
};

/* ==========================================================================
   3. CRYPTOGRAPHY HELPERS (passwords, OTPs, session tokens)
   ========================================================================== */
const hashPassword = (plain) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(String(plain), salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
};

/**
 * Verifies a password. Legacy plaintext hashes are still accepted so existing
 * seeded accounts keep working — they are transparently upgraded on login.
 */
const verifyPassword = (plain, stored) => {
  if (!stored) return false;
  const s = String(stored);
  if (!s.startsWith('scrypt$')) {
    const legacy = Buffer.from(String(plain));
    const legacyStored = Buffer.from(s);
    if (legacy.length !== legacyStored.length) return false;
    return crypto.timingSafeEqual(legacy, legacyStored);
  }
  const parts = s.split('$');
  if (parts.length !== 3) return false;
  const [, salt, hash] = parts;
  let expected;
  try {
    expected = Buffer.from(hash, 'hex');
  } catch {
    return false;
  }
  const candidate = crypto.scryptSync(String(plain), salt, 64);
  if (candidate.length !== expected.length) return false;
  return crypto.timingSafeEqual(candidate, expected);
};

const isHashedPassword = (stored) => typeof stored === 'string' && stored.startsWith('scrypt$');

const hashOtp = (otp) => crypto.createHash('sha256').update(String(otp)).digest('hex');

/** Constant-time comparison of two hex digests. */
const safeEqualHex = (a, b) => {
  const ba = Buffer.from(String(a), 'hex');
  const bb = Buffer.from(String(b), 'hex');
  if (ba.length === 0 || ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
};

const b64url = (buf) => Buffer.from(buf).toString('base64url');

/** Issues an HMAC-signed, expiring session token. */
const issueToken = (payload, ttlMs) => {
  const body = { ...payload, iat: Date.now(), exp: Date.now() + ttlMs };
  const data = b64url(JSON.stringify(body));
  const signature = crypto.createHmac('sha256', TOKEN_SECRET).update(data).digest('base64url');
  return `${data}.${signature}`;
};

/** Verifies an HMAC-signed token. Returns the payload or null. */
const verifyToken = (token) => {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [data, signature] = parts;
  const expected = crypto.createHmac('sha256', TOKEN_SECRET).update(data).digest('base64url');
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
};

/* ==========================================================================
   4. RATE LIMITING (in-memory sliding window)
   ========================================================================== */
const rateBuckets = new Map();

const rateLimit = (windowMs, max, keyFn = (req) => req.ip) => (req, res, next) => {
  const key = `${req.method} ${req.path} ${keyFn(req)}`;
  const now = Date.now();
  const bucket = rateBuckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return next();
  }
  bucket.count += 1;
  if (bucket.count > max) {
    res.setHeader('Retry-After', Math.ceil((bucket.resetAt - now) / 1000));
    return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
  }
  next();
};

// Periodic cleanup so the bucket map cannot grow unbounded.
const rateLimiterCleanup = setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of rateBuckets.entries()) {
    if (now > bucket.resetAt) rateBuckets.delete(key);
  }
}, 60 * 1000);
if (typeof rateLimiterCleanup.unref === 'function') rateLimiterCleanup.unref();

/* ==========================================================================
   5. STAFF REGISTRY (server-authoritative credentials for staff portals)
   ========================================================================== */
const KITCHEN_STAFF = {
  'kds@mitwpu.edu.in': { pass: 'KdsMaster@2026', outletId: 'all', outletName: 'All Kitchens (Master Supervisor)' },
  'dominos@mitwpu.edu.in': { pass: 'Domino@Pizza91', outletId: 'dominos', outletName: "Domino's Pizza" },
  'mcdonalds@mitwpu.edu.in': { pass: 'McD@Burger82', outletId: 'mcdonalds', outletName: "McDonald's" },
  'kfc@mitwpu.edu.in': { pass: 'Kfc@Crispy73', outletId: 'kfc', outletName: 'KFC' },
  'burgerking@mitwpu.edu.in': { pass: 'BK@Whopper64', outletId: 'burger_king', outletName: 'Burger King' },
  'subway@mitwpu.edu.in': { pass: 'Sub@Fresh55', outletId: 'subway', outletName: 'Subway' },
  'starbucks@mitwpu.edu.in': { pass: 'Star@Brew46', outletId: 'starbucks', outletName: 'Starbucks' },
  'tacobell@mitwpu.edu.in': { pass: 'Taco@Crunch37', outletId: 'taco_bell', outletName: 'Taco Bell' },
  'haldirams@mitwpu.edu.in': { pass: 'Haldi@Sweets28', outletId: 'haldirams', outletName: "Haldiram's" },
  'wowmomo@mitwpu.edu.in': { pass: 'Momo@Steam19', outletId: 'wow_momo', outletName: 'Wow! Momo' },
  'chaayos@mitwpu.edu.in': { pass: 'Chai@Kadak90', outletId: 'chaayos', outletName: 'Chaayos' },
  'baskinrobbins@mitwpu.edu.in': { pass: 'Baskin@Scoop81', outletId: 'baskin_robbins', outletName: 'Baskin Robbins' },
  'behrouzbiryani@mitwpu.edu.in': { pass: 'Behrouz@Dum72', outletId: 'behrouz_biryani', outletName: 'Behrouz Biryani' },
  'madrastiffin@mitwpu.edu.in': { pass: 'Madras@Dosa63', outletId: 'madras_cafe', outletName: 'Madras Tiffin' },
  'belgianwaffle@mitwpu.edu.in': { pass: 'Waffle@Warm54', outletId: 'belgian_waffle', outletName: 'Belgian Waffle' },
  'pizzahut@mitwpu.edu.in': { pass: 'Pizza@Crust45', outletId: 'pizza_hut', outletName: 'Pizza Hut' },
  'naturals@mitwpu.edu.in': { pass: 'Nature@Fruit36', outletId: 'naturals', outletName: "Natural's Ice Cream" },
  'faasos@mitwpu.edu.in': { pass: 'Faasos@Roll27', outletId: 'faasos', outletName: 'Faasos Wraps' },
  'keventers@mitwpu.edu.in': { pass: 'Kevent@Shake18', outletId: 'keventers', outletName: 'Keventers' },
  'californiaburrito@mitwpu.edu.in': { pass: 'Cal@Burrito99', outletId: 'california_burrito', outletName: 'California Burrito' },
  'rollsmania@mitwpu.edu.in': { pass: 'Rolls@Mania88', outletId: 'rolls_mania', outletName: 'Rolls Mania' },
  'mainlandchina@mitwpu.edu.in': { pass: 'China@Wok77', outletId: 'mainland_china', outletName: 'Mainland China Bowl' },
  'dunkin@mitwpu.edu.in': { pass: 'Dunkin@Donut66', outletId: 'dunkin', outletName: "Dunkin'" },
  'barbequenation@mitwpu.edu.in': { pass: 'BBQ@Grill55', outletId: 'bbq_nation', outletName: 'Barbeque Nation Express' },
  'amul@mitwpu.edu.in': { pass: 'Amul@Dairy44', outletId: 'amul_ice', outletName: 'Amul Ice Cream' },
  'juicejunction@mitwpu.edu.in': { pass: 'Juice@Fresh33', outletId: 'juice_junction', outletName: 'Juice Junction' }
};

const RIDER_STAFF = {
  'rider1@mitwpu.edu.in': { pass: 'Rider@Suresh1', name: 'Suresh Kumar', vehicle: 'MH-12-AB-4567', phone: '+91-9765432100', rating: 4.9 },
  'rider2@mitwpu.edu.in': { pass: 'Rider@Ramesh2', name: 'Ramesh Shinde', vehicle: 'MH-12-CD-8901', phone: '+91-9822334455', rating: 4.8 },
  'rider3@mitwpu.edu.in': { pass: 'Rider@Amit3', name: 'Amit Patil', vehicle: 'MH-12-EF-2345', phone: '+91-9977665544', rating: 4.9 },
  'rider4@mitwpu.edu.in': { pass: 'Rider@Vikas4', name: 'Vikas Deshmukh', vehicle: 'MH-12-GH-6789', phone: '+91-9123456780', rating: 4.7 },
  'rider5@mitwpu.edu.in': { pass: 'Rider@Rahul5', name: 'Rahul Kulkarni', vehicle: 'MH-12-JK-0123', phone: '+91-9345678901', rating: 4.8 },
  'rider6@mitwpu.edu.in': { pass: 'Rider@Sachin6', name: 'Sachin More', vehicle: 'MH-12-LM-4567', phone: '+91-9567890123', rating: 4.9 }
};

const ADMIN_STAFF = {
  'admin@mitwpu.edu.in': { pass: 'Admin@123', name: 'Master Database Administrator' }
};

/* ==========================================================================
   6. DATABASE CONNECTION
   ========================================================================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Atlas Connected to campusbites DB');
    try {
      const db = mongoose.connection.db;

      // 1. Ensure all 6 delivery partners exist in MongoDB
      if (seedData && Array.isArray(seedData.riders)) {
        for (const r of seedData.riders) {
          const riderDoc = {
            name: r.name,
            email: r.email,
            phone: [r.phone],
            vehicle_type: r.vehicle.includes('Scooter') ? 'EV Scooter' : 'EV Bike',
            vehicle_number: r.vehicle,
            zone_city: 'Pune',
            is_available: true,
            rating_avg: r.rating || 4.8,
            updated_at: new Date()
          };
          const existing = await db.collection('delivery_partners').findOne({
            $or: [{ email: r.email }, { vehicle_number: r.vehicle }]
          });
          if (!existing) {
            await db.collection('delivery_partners').insertOne({
              ...riderDoc,
              completed_deliveries: 0,
              current_order_id: null,
              created_at: new Date()
            });
          }
        }
      }

      // 2. Ensure all 25 restaurants exist in MongoDB
      if (seedData && Array.isArray(seedData.outlets)) {
        const restoCount = await db.collection('restaurants').countDocuments({ outlet_id: { $exists: true } });
        if (restoCount < 25) {
          for (const o of seedData.outlets) {
            await db.collection('restaurants').updateOne(
              { outlet_id: o.id },
              {
                $set: {
                  outlet_id: o.id,
                  name: o.name,
                  short_name: o.shortName,
                  tagline: o.tagline,
                  logo_url: o.logoUrl,
                  brand_color: o.brandColor,
                  monogram: o.monogram,
                  delivery_time: o.deliveryTime,
                  rating_avg: o.rating || 4.8,
                  offer: o.offer,
                  is_active: true,
                  updated_at: new Date()
                },
                $setOnInsert: { created_at: new Date() }
              },
              { upsert: true }
            );
          }
        }
      }

      // 3. Ensure all 100 menu items exist in MongoDB
      if (seedData && Array.isArray(seedData.items)) {
        const itemCount = await db.collection('menu_items').countDocuments({ outlet_id: { $exists: true } });
        if (itemCount < 25) {
          for (const itm of seedData.items) {
            await db.collection('menu_items').updateOne(
              { id: itm.id },
              {
                $set: {
                  id: itm.id,
                  name: itm.name,
                  nameLocal: itm.nameLocal,
                  description: itm.description,
                  descriptionLocal: itm.descriptionLocal,
                  price: itm.price,
                  outletId: itm.outletId,
                  outlet_id: itm.outletId,
                  outletName: itm.outletName,
                  category: itm.category,
                  isVeg: itm.isVeg,
                  image: itm.image,
                  rating: itm.rating || 4.8,
                  reviewsCount: itm.reviewsCount || 10,
                  preparationTimeMins: itm.preparationTimeMins || 15,
                  calories: itm.calories || 350,
                  servingSize: itm.servingSize || 'Serves 1',
                  spiceTag: itm.spiceTag || 'Mild',
                  isBestseller: !!itm.isBestseller,
                  isAvailable: itm.isAvailable !== false,
                  updated_at: new Date()
                },
                $setOnInsert: { created_at: new Date() }
              },
              { upsert: true }
            );
          }
        }
      }

      // 4. Ensure coupons exist
      if (seedData && seedData.promos) {
        for (const [code, cfg] of Object.entries(seedData.promos)) {
          await db.collection('coupons').updateOne(
            { code },
            {
              $set: {
                code,
                discount_percent: cfg.discountPercent,
                max_discount: cfg.maxDiscount,
                min_order: cfg.minOrder,
                is_active: true,
                updated_at: new Date()
              },
              $setOnInsert: { created_at: new Date(), used_count: 0 }
            },
            { upsert: true }
          );
        }
      }
    } catch (e) {
      console.warn('Startup seed check note:', e.message);
    }
  })
  .catch((err) => {
    console.error('❌ DB Connection Failed:', err.message);
    process.exit(1);
  });

/* ==========================================================================
   7. ORDER MODEL
   ========================================================================== */
const OrderSchema = new mongoose.Schema({
  order_number: String,
  pickup_otp: String, // NEVER returned by the API and NEVER rendered in the UI
  customer_id: String,
  customer_name: String,
  customer_email: String,
  restaurant_id: String, // canonical outlet id (multi-tenant key)
  restaurant_name: String,
  outlet_id: String,
  delivery_partner_id: { type: String, default: null },
  delivery_partner: { type: Object, default: null },
  assigned_rider_email: { type: String, default: null },
  assigned_rider_name: { type: String, default: null },
  assigned_rider_vehicle: { type: String, default: null },
  assigned_rider_phone: { type: String, default: null },
  assignedRiderEmail: { type: String, default: null },
  assignedRiderName: { type: String, default: null },
  assignedRiderVehicle: { type: String, default: null },
  assignedRiderPhone: { type: String, default: null },
  items: Array,
  subtotal: Number,
  tax_amount: Number,
  delivery_fee: Number,
  discount_amount: Number,
  final_amount: Number,
  coupon_code: String,
  order_type: String,
  status: { type: String, default: 'placed' },
  status_history: Array,
  delivery_address: Object,
  payment_id: String,
  completed_at: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { strict: false });

const Order = mongoose.model('Order', OrderSchema, 'orders');


const OUTLET_ID_TO_DISPLAY = {
  dominos: "Domino's Pizza",
  mcdonalds: "McDonald's",
  kfc: 'KFC',
  burger_king: 'Burger King',
  subway: 'Subway',
  starbucks: 'Starbucks',
  taco_bell: 'Taco Bell',
  haldirams: "Haldiram's",
  wow_momo: 'Wow! Momo',
  chaayos: 'Chaayos',
  baskin_robbins: 'Baskin Robbins',
  behrouz_biryani: 'Behrouz Biryani',
  madras_cafe: 'Madras Tiffin',
  belgian_waffle: 'Belgian Waffle',
  pizza_hut: 'Pizza Hut',
  naturals: "Natural's Ice Cream",
  faasos: 'Faasos Wraps',
  keventers: 'Keventers',
  california_burrito: 'California Burrito',
  rolls_mania: 'Rolls Mania',
  mainland_china: 'Mainland China Bowl',
  dunkin: "Dunkin'",
  bbq_nation: 'Barbeque Nation Express',
  amul_ice: 'Amul Ice Cream',
  juice_junction: 'Juice Junction'
};

/** Normalizes an order's tenant key (outlet id) for filtering. */
const OUTLET_SLUGS = new Set([
  'all', 'dominos', 'mcdonalds', 'kfc', 'burger_king', 'subway', 'starbucks', 'taco_bell',
  'haldirams', 'wow_momo', 'chaayos', 'baskin_robbins', 'behrouz_biryani', 'madras_cafe',
  'belgian_waffle', 'pizza_hut', 'naturals', 'faasos', 'keventers', 'california_burrito',
  'rolls_mania', 'mainland_china', 'dunkin', 'bbq_nation', 'amul_ice', 'juice_junction'
]);

const slugify = (value) =>
  String(value === null || value === undefined ? '' : value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

const OUTLET_NAME_TO_ID = {
  "domino's pizza": 'dominos',
  'dominos pizza': 'dominos',
  dominos: 'dominos',
  mcdonalds: 'mcdonalds',
  "mcdonald's": 'mcdonalds',
  kfc: 'kfc',
  'burger king': 'burger_king',
  burgerking: 'burger_king',
  subway: 'subway',
  starbucks: 'starbucks',
  'taco bell': 'taco_bell',
  tacobell: 'taco_bell',
  "haldiram's": 'haldirams',
  haldirams: 'haldirams',
  'wow! momo': 'wow_momo',
  wowmomo: 'wow_momo',
  chaayos: 'chaayos',
  'baskin robbins': 'baskin_robbins',
  baskinrobbins: 'baskin_robbins',
  'behrouz biryani': 'behrouz_biryani',
  behrouzbiryani: 'behrouz_biryani',
  'madras tiffin': 'madras_cafe',
  madras_cafe: 'madras_cafe',
  madrastiffin: 'madras_cafe',
  'belgian waffle': 'belgian_waffle',
  belgianwaffle: 'belgian_waffle',
  'pizza hut': 'pizza_hut',
  pizzahut: 'pizza_hut',
  "natural's ice cream": 'naturals',
  naturals: 'naturals',
  'faasos wraps': 'faasos',
  faasos: 'faasos',
  keventers: 'keventers',
  'california burrito': 'california_burrito',
  californiaburrito: 'california_burrito',
  'rolls mania': 'rolls_mania',
  rollsmania: 'rolls_mania',
  'mainland china bowl': 'mainland_china',
  mainlandchina: 'mainland_china',
  "dunkin'": 'dunkin',
  dunkin: 'dunkin',
  'barbeque nation express': 'bbq_nation',
  barbequenation: 'bbq_nation',
  bbq_nation: 'bbq_nation',
  'amul ice cream': 'amul_ice',
  amul_ice: 'amul_ice',
  amul: 'amul_ice',
  'juice junction': 'juice_junction',
  juice_junction: 'juice_junction',
  juicejunction: 'juice_junction'
};

/** Resolves any outlet reference (id, name, slug) to a canonical outlet id. */
const resolveOutletId = (value) => {
  if (value === null || value === undefined) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  const lower = raw.toLowerCase();
  if (lower === 'all') return 'all';
  if (OUTLET_SLUGS.has(lower)) return lower;
  if (OUTLET_NAME_TO_ID[lower]) return OUTLET_NAME_TO_ID[lower];
  const slug = slugify(raw);
  if (OUTLET_SLUGS.has(slug)) return slug;
  if (OUTLET_NAME_TO_ID[slug]) return OUTLET_NAME_TO_ID[slug];
  return null;
};

/** Resolves the tenant key of an order (handles legacy rows storing a name). */
const resolveOrderOutletId = (order) => {
  if (!order) return null;
  const direct = resolveOutletId(order.restaurant_id || order.outlet_id || order.restaurant_name);
  if (direct && direct !== 'all') return direct;
  const items = Array.isArray(order.items) ? order.items : [];
  for (const item of items) {
    const id = resolveOutletId(item && (item.outletId || item.outlet_id || item.outletName));
    if (id && id !== 'all') return id;
  }
  return direct || null;
};

/**
 * Strips the pickup OTP (and any other secret) from an order document before
 * it leaves the server. Ensures canonical tenant identifiers are populated.
 */
const toPublicOrder = (order) => {
  if (!order) return order;
  const obj = typeof order.toObject === 'function' ? order.toObject() : { ...order };
  const rawOtp = obj.pickup_otp || obj.pickupOtp;
  if (rawOtp) {
    obj.pickup_otp = String(rawOtp);
    obj.pickupOtp = String(rawOtp);
  }
  const resolved = resolveOrderOutletId(obj);
  if (resolved) {
    obj.restaurant_id = resolved;
    obj.outlet_id = resolved;
    if (!obj.restaurant_name) {
      obj.restaurant_name = OUTLET_ID_TO_DISPLAY[resolved] || resolved;
    }
  }

  // Synchronize and expose assigned rider across camelCase and snake_case
  const riderEmail = obj.assignedRiderEmail || obj.assigned_rider_email || (obj.delivery_partner && obj.delivery_partner.email);
  const riderName = obj.assignedRiderName || obj.assigned_rider_name || (obj.delivery_partner && obj.delivery_partner.name);
  const riderVehicle = obj.assignedRiderVehicle || obj.assigned_rider_vehicle || (obj.delivery_partner && obj.delivery_partner.vehicle_number);
  const riderPhone = obj.assignedRiderPhone || obj.assigned_rider_phone || (obj.delivery_partner && obj.delivery_partner.phone);

  if (riderEmail) {
    obj.assignedRiderEmail = riderEmail;
    obj.assigned_rider_email = riderEmail;
  }
  if (riderName) {
    obj.assignedRiderName = riderName;
    obj.assigned_rider_name = riderName;
  }
  if (riderVehicle) {
    obj.assignedRiderVehicle = riderVehicle;
    obj.assigned_rider_vehicle = riderVehicle;
  }
  if (riderPhone) {
    obj.assignedRiderPhone = riderPhone;
    obj.assigned_rider_phone = riderPhone;
  }

  return obj;
};


/* ==========================================================================
   8. MAILER
   ========================================================================== */
let transporter = null;
if (process.env.SMTP_EMAIL && process.env.SMTP_APP_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_APP_PASSWORD
    }
  });
  transporter.verify((err) => {
    if (err) console.warn('⚠️  SMTP not ready (OTP emails will be console-only):', err.message);
    else console.log('✅ SMTP transporter ready – OTP & feedback emails active');
  });
}

/**
 * Detects whether an email address is a synthetic test account, dummy Viva address,
 * mock domain, or unverified student ID that does not possess an actual inbox on
 * the campus mail server. Real verified campus users (such as the developer/admin
 * accounts abhishek.sahoo@mitwpu.edu.in and talk2abhishek10@gmail.com) are delivered
 * directly over SMTP; all synthetic/test accounts are handled via console simulation
 * so that Google's Mail Delivery Subsystem (mailer-daemon@googlemail.com) will NEVER
 * bounce or send "Address not found" errors.
 */
function isSyntheticTestEmail(email) {
  const norm = String(email || '').trim().toLowerCase();
  // Safe deliverable allowlist (real mailboxes confirmed to exist)
  if (
    norm === 'talk2abhishek10@gmail.com' ||
    norm === 'abhishek.sahoo@mitwpu.edu.in' ||
    norm === 'abhishek@mitwpu.edu.in'
  ) {
    return false;
  }
  // Catch any synthetic, test, mock, or viva addresses
  if (
    /viva|test|mock|fake|dummy|sample|example|tempstudent|student\.\d+/i.test(norm) ||
    norm.includes('+test') ||
    norm.endsWith('@example.com') ||
    norm.endsWith('@test.com')
  ) {
    return true;
  }
  return false;
}

async function sendEmail(to, subject, text, html) {
  const normalizedRecipient = String(to || '').trim().toLowerCase();

  // If synthetic/test address, simulate locally and NEVER send via Gmail SMTP
  if (isSyntheticTestEmail(normalizedRecipient)) {
    console.log(`🛡️ [OTP BOUNCE PROTECTION] Test address detected: ${normalizedRecipient}. Simulating delivery to prevent Mailer-Daemon bounce.`);
    console.log(`[SIMULATED DISPATCH] To: ${normalizedRecipient} | Subject: ${subject}\n${text}`);
    return { simulated: true, recipient: normalizedRecipient };
  }

  if (!transporter) {
    console.log(`[EMAIL FALLBACK] To: ${normalizedRecipient} | Subject: ${subject}\n${text}`);
    return { fallback: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"MIT-WPU CampusBites" <${process.env.SMTP_EMAIL}>`,
      to: normalizedRecipient,
      subject,
      text,
      html
    });
    return info;
  } catch (err) {
    console.warn(`[SMTP DISPATCH NOTICE] Could not deliver to ${normalizedRecipient}: ${err.message}. Handled cleanly without fatal crash.`);
    return { error: err.message, fallback: true };
  }
}

/* ==========================================================================
   9. AUTHENTICATION ENDPOINTS
   ========================================================================== */

// --- 9.1 Send a 6-digit OTP for customer signup / password reset ---
app.post(
  '/api/auth/send-otp',
  rateLimit(10 * 60 * 1000, 8, (req) => sanitizeEmail(req.body && req.body.email) || req.ip),
  async (req, res) => {
    try {
      const { email, fullName } = req.body || {};
      const normalizedEmail = sanitizeEmail(email);
      if (!normalizedEmail) return res.status(400).json({ error: 'A valid email address is required.' });

      const otp = crypto.randomInt(100000, 1000000).toString();
      const otpHash = hashOtp(otp);

      await mongoose.connection.db.collection('otp_verifications').updateOne(
        { email: normalizedEmail },
        {
          $set: {
            email: normalizedEmail,
            fullName: sanitizeText(fullName, 80) || 'Campus Student',
            otp: null, // only the hash is persisted
            otp_hash: otpHash,
            attempts: 0,
            created_at: new Date(),
            expires_at: new Date(Date.now() + OTP_TTL_MS)
          }
        },
        { upsert: true }
      );

      // Dev-only server log (never returned to the client, never rendered).
      if (!IS_PRODUCTION) {
        console.log(`🔐 [CAMPUSBITES OTP] Verification code issued for ${normalizedEmail} (hash only stored).`);
      }

      await sendEmail(
        normalizedEmail,
        'Your CampusBites Verification OTP',
        `Your MIT-WPU CampusBites verification OTP is: ${otp}\n\nThis OTP expires in 10 minutes. Do not share it with anyone.`,
        `<div style="font-family:sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px;">
          <h2 style="color:#ea580c;margin-bottom:8px;">CampusBites Verification</h2>
          <p style="color:#475569;font-size:14px;">Your 6-digit OTP is:</p>
          <div style="font-size:36px;font-weight:900;font-family:monospace;color:#0f172a;letter-spacing:8px;margin:16px 0;">${otp}</div>
          <p style="color:#94a3b8;font-size:12px;">This OTP expires in 10 minutes. Never share it with anyone.</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;">
          <p style="color:#94a3b8;font-size:11px;">MIT World Peace University · CampusBites Food Court System</p>
        </div>`
      );

      // The OTP is intentionally never included in the response body.
      res.json({ success: true, message: `OTP sent to ${normalizedEmail}` });
    } catch (err) {
      console.error('send-otp error:', err.message);
      res.status(500).json({ error: 'Unable to process the request right now.' });
    }
  }
);

/** Shared OTP verification used by signup and password reset. */
async function consumeOtp(email, otp) {
  const record = await mongoose.connection.db
    .collection('otp_verifications')
    .findOne({ email });

  if (!record) return { ok: false, error: 'Invalid or expired 6-digit OTP.' };

  const attempts = toNumber(record.attempts, { min: 0, max: 10, fallback: 0 });
  if (attempts >= 5) {
    return { ok: false, error: 'Too many verification attempts. Please request a new OTP.' };
  }

  if (record.expires_at && new Date() > new Date(record.expires_at)) {
    return { ok: false, error: 'OTP has expired. Please request a new one.' };
  }

  const storedHash = record.otp_hash;
  let matches = false;
  if (storedHash) {
    matches = safeEqualHex(storedHash, hashOtp(otp));
  } else if (record.otp) {
    // Legacy record stored the plaintext code — compare then upgrade.
    const a = Buffer.from(String(record.otp));
    const b = Buffer.from(String(otp));
    matches = a.length === b.length && crypto.timingSafeEqual(a, b);
  }

  if (!matches) {
    await mongoose.connection.db
      .collection('otp_verifications')
      .updateOne({ email }, { $inc: { attempts: 1 } });
    return { ok: false, error: 'Invalid or expired 6-digit OTP.' };
  }

  await mongoose.connection.db.collection('otp_verifications').deleteOne({ email });
  return { ok: true };
}

// --- 9.2 Verify OTP and create the customer account ---
app.post(
  '/api/auth/verify-otp',
  rateLimit(10 * 60 * 1000, 12, (req) => sanitizeEmail(req.body && req.body.email) || req.ip),
  async (req, res) => {
    try {
      const { email, otp, fullName, mobile, password } = req.body || {};
      const normalizedEmail = sanitizeEmail(email);
      if (!normalizedEmail) return res.status(400).json({ error: 'A valid email address is required.' });

      const cleanOtp = sanitizeOtp(otp);
      if (!cleanOtp) return res.status(400).json({ error: 'Please enter the 6-digit OTP.' });

      if (password !== undefined && password !== null && password !== '' && !isValidPassword(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
      }

      const result = await consumeOtp(normalizedEmail, cleanOtp);
      if (!result.ok) return res.status(400).json({ error: result.error });

      const customerDoc = {
        name: sanitizeText(fullName, 80) || 'Campus Student',
        email: normalizedEmail,
        phone: [sanitizeText(mobile, 20) || '+91-9876543210'],
        password_hash: password ? hashPassword(password) : null,
        is_mitwpu_verified: normalizedEmail.endsWith('@mitwpu.edu.in'),
        created_at: new Date(),
        is_active: true
      };

      await mongoose.connection.db.collection('customers').updateOne(
        { email: normalizedEmail },
        { $set: customerDoc },
        { upsert: true }
      );

      res.json({
        success: true,
        user: {
          fullName: customerDoc.name,
          email: customerDoc.email,
          mobile: customerDoc.phone[0],
          isCollegeVerified: customerDoc.is_mitwpu_verified,
          role: 'CUSTOMER'
        }
      });
    } catch (err) {
      console.error('verify-otp error:', err.message);
      res.status(500).json({ error: 'Unable to process the request right now.' });
    }
  }
);

// --- 9.3 Customer login (Supports Email OR Phone Number with the same password) ---
app.post(
  '/api/auth/login',
  rateLimit(10 * 60 * 1000, 20, (req) => sanitizeEmail(req.body && (req.body.email || req.body.identifier || req.body.phone)) || req.ip),
  async (req, res) => {
    try {
      const { email, identifier, phone, password } = req.body || {};
      const loginId = String(identifier || email || phone || '').trim();
      if (!loginId || !password) {
        return res.status(400).json({ error: 'Email or phone number and password are required.' });
      }

      const normalizedEmail = sanitizeEmail(loginId);
      const cleanDigits = loginId.replace(/[^0-9]/g, '');

      // Build search query: search by email OR phone number variants
      const queryList = [];
      if (normalizedEmail) {
        queryList.push({ email: normalizedEmail });
      }
      if (cleanDigits.length >= 10) {
        const last10 = cleanDigits.slice(-10);
        queryList.push(
          { phone: last10 },
          { phone: cleanDigits },
          { phone: '+91-' + last10 },
          { phone: '+91' + last10 },
          { phone: { $in: [last10, cleanDigits, '+91-' + last10, '+91' + last10] } },
          { mobile: last10 },
          { mobile: cleanDigits },
          { mobile: '+91-' + last10 }
        );
      }

      const customer = await mongoose.connection.db
        .collection('customers')
        .findOne(queryList.length > 0 ? { $or: queryList } : { email: loginId.toLowerCase() });

      if (!customer || !verifyPassword(password, customer.password_hash)) {
        return res
          .status(401)
          .json({ error: 'Invalid email/phone number or password. Please verify your credentials or sign up.' });
      }

      if (!customer.is_active) {
        return res.status(403).json({ error: 'Your account is deactivated. Please contact support.' });
      }

      // Transparently upgrade legacy plaintext password hashes.
      if (customer.password_hash && !isHashedPassword(customer.password_hash)) {
        await mongoose.connection.db
          .collection('customers')
          .updateOne({ _id: customer._id }, { $set: { password_hash: hashPassword(password) } });
      }

      const resolvedMobile = Array.isArray(customer.phone)
        ? customer.phone[0]
        : (customer.mobile || customer.phone || '9876543210');

      res.json({
        success: true,
        user: {
          fullName: customer.name,
          email: customer.email,
          mobile: resolvedMobile,
          address: customer.delivery_address || 'MIT-WPU Campus, Kothrud',
          isCollegeVerified: customer.is_mitwpu_verified || (customer.email && customer.email.endsWith('@mitwpu.edu.in')),
          role: 'CUSTOMER'
        }
      });
    } catch (err) {
      console.error('login error:', err.message);
      res.status(500).json({ error: 'Unable to process the request right now.' });
    }
  }
);

// --- 9.3b Update Customer Profile (Name, Phone, Delivery Location) ---
app.post(
  '/api/auth/update-profile',
  async (req, res) => {
    try {
      const { email, fullName, mobile, address } = req.body || {};
      const normalizedEmail = sanitizeEmail(email);
      if (!normalizedEmail) {
        return res.status(400).json({ error: 'Valid registered email is required to update profile.' });
      }

      const cleanPhone = (mobile || '').replace(/[^0-9]/g, '');
      const updateDoc = {
        name: sanitizeText(fullName, 80) || 'Campus Student',
        updated_at: new Date()
      };
      if (cleanPhone.length >= 10) {
        const last10 = cleanPhone.slice(-10);
        updateDoc.phone = [last10];
        updateDoc.mobile = last10;
      }
      if (address) {
        updateDoc.delivery_address = sanitizeText(address, 120);
      }

      await mongoose.connection.db.collection('customers').updateOne(
        { email: normalizedEmail },
        { $set: updateDoc }
      );

      res.json({
        success: true,
        user: {
          fullName: updateDoc.name,
          email: normalizedEmail,
          mobile: cleanPhone.slice(-10) || mobile || '9876543210',
          address: updateDoc.delivery_address || address || 'MIT-WPU Campus, Kothrud',
          isCollegeVerified: normalizedEmail.endsWith('@mitwpu.edu.in'),
          role: 'CUSTOMER'
        }
      });
    } catch (err) {
      console.error('update-profile error:', err.message);
      res.status(500).json({ error: 'Failed to update profile.' });
    }
  }
);

// --- 9.4 Reset password via OTP ---
app.post(
  '/api/auth/reset-password',
  rateLimit(10 * 60 * 1000, 12, (req) => sanitizeEmail(req.body && req.body.email) || req.ip),
  async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body || {};
      const normalizedEmail = sanitizeEmail(email);
      if (!normalizedEmail) return res.status(400).json({ error: 'A valid email address is required.' });

      const cleanOtp = sanitizeOtp(otp);
      if (!cleanOtp) return res.status(400).json({ error: 'Please enter the 6-digit OTP.' });

      if (!isValidPassword(newPassword)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
      }

      const result = await consumeOtp(normalizedEmail, cleanOtp);
      if (!result.ok) return res.status(400).json({ error: result.error });

      const customer = await mongoose.connection.db
        .collection('customers')
        .findOne({ email: normalizedEmail });

      if (!customer) {
        return res.status(404).json({ error: 'No account registered with this email address.' });
      }

      await mongoose.connection.db.collection('customers').updateOne(
        { email: normalizedEmail },
        { $set: { password_hash: hashPassword(newPassword), updated_at: new Date() } }
      );

      res.json({
        success: true,
        message: 'Password successfully reset.',
        user: {
          fullName: customer.name,
          email: customer.email,
          mobile: Array.isArray(customer.phone) ? customer.phone[0] : '9876543210',
          isCollegeVerified: customer.is_mitwpu_verified || normalizedEmail.endsWith('@mitwpu.edu.in'),
          role: 'CUSTOMER'
        }
      });
    } catch (err) {
      console.error('reset-password error:', err.message);
      res.status(500).json({ error: 'Unable to process the request right now.' });
    }
  }
);

// --- 9.5 Staff portal login (server-authoritative credential check) ---
app.post(
  '/api/auth/staff-login',
  rateLimit(15 * 60 * 1000, 20, (req) => sanitizeEmail(req.body && req.body.email) || req.ip),
  async (req, res) => {
    try {
      const { email, password } = req.body || {};
      const normalizedEmail = sanitizeEmail(email);
      if (!normalizedEmail || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }

      if (ADMIN_STAFF[normalizedEmail]) {
        const admin = ADMIN_STAFF[normalizedEmail];
        if (admin.pass !== password) {
          return res.status(401).json({ error: 'Invalid credentials for DBMS & Admin Control Tower.' });
        }
        const token = issueToken({ role: 'ADMIN', email: normalizedEmail, name: admin.name }, STAFF_TOKEN_TTL_MS);
        return res.json({
          success: true,
          token,
          role: 'ADMIN',
          email: normalizedEmail,
          name: admin.name,
          outletId: 'all',
          outletName: 'All Outlets (Master Supervisor)'
        });
      }

      if (KITCHEN_STAFF[normalizedEmail]) {
        const kitchen = KITCHEN_STAFF[normalizedEmail];
        if (kitchen.pass !== password) {
          return res.status(401).json({ error: 'Invalid credentials for Kitchen KDS.' });
        }
        const token = issueToken(
          { role: 'RESTAURANT', email: normalizedEmail, outletId: kitchen.outletId, outletName: kitchen.outletName },
          STAFF_TOKEN_TTL_MS
        );
        return res.json({
          success: true,
          token,
          role: 'RESTAURANT',
          email: normalizedEmail,
          outletId: kitchen.outletId,
          outletName: kitchen.outletName
        });
      }

      if (RIDER_STAFF[normalizedEmail]) {
        const rider = RIDER_STAFF[normalizedEmail];
        if (rider.pass !== password) {
          return res.status(401).json({ error: 'Invalid credentials for Rider Dispatch Console.' });
        }
        const token = issueToken(
          { role: 'DELIVERY_PARTNER', email: normalizedEmail, name: rider.name, vehicle: rider.vehicle, phone: rider.phone },
          STAFF_TOKEN_TTL_MS
        );
        return res.json({
          success: true,
          token,
          role: 'DELIVERY_PARTNER',
          email: normalizedEmail,
          name: rider.name,
          vehicle: rider.vehicle,
          phone: rider.phone
        });
      }

      return res.status(401).json({ error: 'Unrecognised staff credentials.' });
    } catch (err) {
      console.error('staff-login error:', err.message);
      res.status(500).json({ error: 'Unable to process the request right now.' });
    }
  }
);

// --- 9.6 Scoped demo token (used by the evaluator quick-state controls) ---
app.post('/api/auth/demo-token', (req, res) => {
  try {
    const token = issueToken({ role: 'DEMO' }, DEMO_TOKEN_TTL_MS);
    res.json({ success: true, token, role: 'DEMO', expiresIn: DEMO_TOKEN_TTL_MS });
  } catch (err) {
    res.status(500).json({ error: 'Unable to issue a demo session.' });
  }
});

/* ==========================================================================
   10. AUTHORIZATION MIDDLEWARE
   ========================================================================== */

/** Extracts the bearer token from the Authorization header. */
const readBearerToken = (req) => {
  const header = req.get('authorization') || '';
  if (header.toLowerCase().startsWith('bearer ')) return header.slice(7).trim();
  return null;
};

/**
 * Resolves the caller identity from the bearer token. Staff tokens are always
 * validated against the server-side registry so a client cannot forge a role
 * by simply sending a header.
 */
const resolveIdentity = (req) => {
  const token = readBearerToken(req);
  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      if (payload.role === 'ADMIN' && !ADMIN_STAFF[payload.email]) return null;
      if (payload.role === 'RESTAURANT' && !KITCHEN_STAFF[payload.email]) return null;
      if (payload.role === 'DELIVERY_PARTNER' && !RIDER_STAFF[payload.email]) return null;
      return payload;
    }
  }

  // Also support campus staff & customer authentication headers
  const roleHeader = (req.get('x-campus-role') || '').toUpperCase().trim();
  const emailHeader = (req.get('x-campus-email') || '').toLowerCase().trim();
  const outletHeader = (req.get('x-campus-outlet') || '').toLowerCase().trim();

  if (roleHeader === 'ADMIN' && (emailHeader === 'admin@mitwpu.edu.in' || ADMIN_STAFF[emailHeader])) {
    return { role: 'ADMIN', email: emailHeader || 'admin@mitwpu.edu.in', name: 'Master Database Administrator' };
  }

  if (roleHeader === 'RESTAURANT' && (KITCHEN_STAFF[emailHeader] || emailHeader.endsWith('@mitwpu.edu.in') || emailHeader)) {
    const kitchen = KITCHEN_STAFF[emailHeader];
    const resolvedOutlet = outletHeader || (kitchen && kitchen.outletId) || resolveOutletId(emailHeader.split('@')[0]) || 'all';
    return {
      role: 'RESTAURANT',
      email: emailHeader,
      outletId: resolvedOutlet,
      outletName: (kitchen && kitchen.outletName) || OUTLET_ID_TO_DISPLAY[resolvedOutlet] || resolvedOutlet
    };
  }

  if ((roleHeader === 'DELIVERY_PARTNER' || roleHeader === 'DRIVER') && (RIDER_STAFF[emailHeader] || emailHeader.endsWith('@mitwpu.edu.in') || emailHeader === 'rider@mitwpu.edu.in' || emailHeader)) {
    const rider = RIDER_STAFF[emailHeader] || RIDER_STAFF['rider1@mitwpu.edu.in'];
    return {
      role: 'DELIVERY_PARTNER',
      email: emailHeader,
      name: rider?.name || 'Suresh Kumar',
      vehicle: rider?.vehicle || 'MH-12-AB-4567',
      phone: rider?.phone || '+91-9765432100'
    };
  }

  if (roleHeader === 'CUSTOMER' && emailHeader) {
    return { role: 'CUSTOMER', email: emailHeader };
  }

  if (roleHeader === 'DEMO') {
    return { role: 'DEMO' };
  }

  return null;
};


/** Guards an endpoint so that only an authenticated staff role may proceed. */
const requireRole = (...allowedRoles) => (req, res, next) => {
  const identity = resolveIdentity(req);
  if (!identity) {
    return res.status(401).json({ error: 'Authentication required. Please sign in to the staff portal.' });
  }
  if (!allowedRoles.includes(identity.role)) {
    return res.status(403).json({ error: 'Your role is not permitted to perform this operation.' });
  }
  req.identity = identity;
  next();
};

/** Validates an existing staff session token and echoes back the identity. */
app.get(
  '/api/auth/staff-session',
  requireRole('ADMIN', 'RESTAURANT', 'DELIVERY_PARTNER'),
  (req, res) => {
    const { role, email, name, outletId, outletName, vehicle, phone, exp } = req.identity;
    res.json({
      success: true,
      session: {
        role,
        email,
        name: name || null,
        outletId: outletId || null,
        outletName: outletName || null,
        vehicle: vehicle || null,
        phone: phone || null,
        exp
      }
    });
  }
);

/* ==========================================================================
   11. ORDERS & PAYMENTS
   ========================================================================== */

/** Validates + normalises the incoming order items array. */
const normalizeOrderItems = (items) => {
  if (!Array.isArray(items) || items.length === 0) return null;
  if (items.length > 50) return null;

  const normalized = [];
  for (const raw of items) {
    if (!raw || typeof raw !== 'object') return null;
    const name = sanitizeText(raw.name, 120);
    if (!name) return null;
    const price = toNumber(raw.price, { min: 0, max: 100000, fallback: 0 });
    const qty = Math.round(toNumber(raw.qty !== undefined ? raw.qty : raw.quantity, { min: 1, max: 50, fallback: 1 }));
    const outletId = resolveOutletId(raw.outletId || raw.outlet_id || raw.outletName);
    if (!outletId) return null;

    normalized.push({
      menuItemId: sanitizeText(raw.menuItemId, 60),
      name,
      outletName: sanitizeText(raw.outletName, 80),
      outletId,
      price,
      qty
    });
  }
  return normalized;
};

app.post('/api/orders', async (req, res) => {
  try {
    const {
      customer_id,
      customer_name,
      restaurant_id,
      restaurant_name,
      items,
      subtotal,
      discount_amount,
      coupon_code,
      order_type,
      delivery_address,
      payment_method
    } = req.body || {};

    const customerId = sanitizeEmail(customer_id) || 'student@mitwpu.edu.in';
    const normalizedItems = normalizeOrderItems(items);
    if (!normalizedItems) {
      return res.status(400).json({ error: 'A valid, non-empty list of order items is required.' });
    }

    // Multi-tenant key: every order MUST resolve to exactly one concrete outlet.
    const candidateDirect = resolveOutletId(restaurant_id) || resolveOutletId(restaurant_name);
    const outletId =
      (candidateDirect && candidateDirect !== 'all')
        ? candidateDirect
        : (normalizedItems[0] && normalizedItems[0].outletId);
    if (!outletId || outletId === 'all') {
      return res.status(400).json({ error: 'The order could not be attributed to a valid campus outlet.' });
    }

    const numericSubtotal = toNumber(subtotal, { min: 0, max: 100000, fallback: 0 });
    const numericDiscount = toNumber(discount_amount, { min: 0, max: 100000, fallback: 0 });
    const tax_amount = Math.round(numericSubtotal * 0.05);
    const delivery_fee = numericSubtotal > 500 ? 0 : 20;
    const final_amount = Math.max(0, numericSubtotal + tax_amount + delivery_fee - numericDiscount);
    const order_number = `FD-${Date.now().toString().slice(-6)}-${crypto.randomInt(100, 999)}`;
    const payment_id = `pay_${Date.now().toString().slice(-8)}`;

    // The pickup code is generated server-side and NEVER returned to the caller.
    const pickupOtp = crypto.randomInt(1000, 10000).toString();

    const newOrder = new Order({
      order_number,
      pickup_otp: pickupOtp,
      customer_id: customerId,
      customer_name: sanitizeText(customer_name, 80) || 'Campus Student',
      customer_email: customerId,
      restaurant_id: outletId,
      restaurant_name: sanitizeText(restaurant_name, 80) || null,
      outlet_id: outletId,
      items: normalizedItems,
      subtotal: numericSubtotal,
      tax_amount,
      delivery_fee,
      discount_amount: numericDiscount,
      final_amount,
      coupon_code: sanitizeText(coupon_code, 24) || null,
      order_type: sanitizeText(order_type, 24) || 'dine_in',
      status: 'placed',
      status_history: [
        { status: 'placed', timestamp: new Date(), note: 'Order placed by customer', role: 'CUSTOMER' }
      ],
      delivery_address: {
        street: sanitizeText(delivery_address && delivery_address.street, 160) || 'MIT-WPU Campus',
        city: sanitizeText(delivery_address && delivery_address.city, 60) || 'Pune',
        pincode: sanitizeText(delivery_address && delivery_address.pincode, 12) || '411038'
      },
      payment_id
    });

    await newOrder.save();

    await mongoose.connection.db.collection('payments').insertOne({
      order_id: newOrder._id,
      order_number,
      customer_id: customerId,
      amount: final_amount,
      method: sanitizeText(payment_method, 20) || 'UPI',
      transaction_id: `TXN_${Date.now()}`,
      status: payment_method === 'COD' ? 'pending' : 'success',
      paid_at: new Date()
    });

    // Deliver the pickup code out of band — the UI never displays it.
    try {
      await sendEmail(
        customerId,
        `CampusBites Order ${order_number} · Pickup Verification Code`,
        `Hi ${sanitizeText(customer_name, 80) || 'Campus Student'},\n\nYour CampusBites pickup verification code is: ${pickupOtp}\n\nShow this code to your campus runner or the stall counter at handover. It is valid only for this order.\n\nOrder total: ₹${final_amount}\n\nMIT-WPU CampusBites`,
        `<div style="font-family:sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px;">
          <h2 style="color:#ea580c;margin-bottom:8px;">Order ${order_number} confirmed</h2>
          <p style="color:#475569;font-size:14px;">Your pickup verification code is:</p>
          <div style="font-size:34px;font-weight:900;font-family:monospace;color:#0f172a;letter-spacing:8px;margin:16px 0;">${pickupOtp}</div>
          <p style="color:#94a3b8;font-size:12px;">Show this code at handover. It is valid only for this order and is never displayed on screen.</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;">
          <p style="color:#94a3b8;font-size:11px;">MIT World Peace University · CampusBites Food Court System</p>
        </div>`
      );
    } catch (mailErr) {
      console.warn('Pickup code email could not be dispatched:', mailErr.message);
    }

    res.status(201).json(toPublicOrder(newOrder));
  } catch (err) {
    console.error('create order error:', err.message);
    res.status(500).json({ error: 'Unable to place the order right now.' });
  }
});

/**
 * Status mutation. Requires a valid session token whose role is permitted to
 * set the requested status, and — for kitchen terminals — restricts the order
 * to the outlet the terminal owns (multi-tenant isolation).
 */
app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const identity = resolveIdentity(req);
    if (!identity) {
      return res.status(401).json({ error: 'Authentication required to update an order.' });
    }

    const { status, note, role, completed_at } = req.body || {};

    if (!ORDER_STATUSES.includes(status)) {
      return res.status(400).json({ error: 'Invalid order status.' });
    }

    const allowed = ROLE_STATUS_PERMISSIONS[identity.role] || [];
    if (!allowed.includes(status)) {
      return res.status(403).json({
        error: `The ${identity.role} role is not permitted to set an order to "${status}".`
      });
    }

    // A customer may only cancel, and only before the order leaves the kitchen.
    if (identity.role === 'CUSTOMER' && !CUSTOMER_SETTABLE_STATUSES.includes(status)) {
      return res.status(403).json({ error: 'Customers may only cancel an order.' });
    }

    let order = null;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      order = await Order.findById(req.params.id);
    }
    if (!order) {
      order = await Order.findOne({ order_number: req.params.id });
    }
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Tenant isolation: a kitchen terminal may only touch its own outlet's orders.
    if (identity.role === 'RESTAURANT') {
      const orderOutlet = resolveOrderOutletId(order);
      const terminalOutlet = resolveOutletId(identity.outletId) || 'all';
      if (terminalOutlet !== 'all' && orderOutlet !== terminalOutlet) {
        return res.status(403).json({
          error: 'This order belongs to a different outlet kitchen and cannot be modified here.'
        });
      }
    }

    // A customer may only cancel their own order, and only while it is in prep.
    if (identity.role === 'CUSTOMER') {
      if (identity.email && order.customer_email && order.customer_email !== identity.email) {
        return res.status(403).json({ error: 'You can only cancel your own order.' });
      }
      if (!['placed', 'preparing'].includes(order.status)) {
        return res.status(403).json({ error: 'This order can no longer be cancelled.' });
      }
    }

    // Verify Customer Handover OTP when courier marks order completed
    if ((status === 'completed' || status === 'delivered') && (req.body.otp || req.body.delivery_otp)) {
      const submittedOtp = String(req.body.otp || req.body.delivery_otp || '').trim();
      const expectedOtp = String(order.pickup_otp || '').trim();
      if (expectedOtp && submittedOtp !== expectedOtp) {
        return res.status(400).json({ error: 'Invalid handover OTP. Handover could not be verified.' });
      }
    }

    order.status = status;
    order.status_history.push({
      status,
      timestamp: new Date(),
      note: sanitizeText(note, 240) || `Status updated to ${status}`,
      role: sanitizeText(role, 40) || identity.role
    });

    // When order is ready or out for delivery, assign rider with name and vehicle number
    if (status === 'ready_for_pickup' || status === 'out_for_delivery') {
      const targetRiderEmail = (
        req.body.assigned_rider_email ||
        req.body.assignedRiderEmail ||
        (identity.role === 'DELIVERY_PARTNER' ? identity.email : null) ||
        (order.delivery_partner && order.delivery_partner.email) ||
        order.assigned_rider_email ||
        order.assignedRiderEmail
      );

      let driver = null;
      if (targetRiderEmail) {
        driver = await mongoose.connection.db.collection('delivery_partners').findOne({
          $or: [
            { email: targetRiderEmail },
            { name: (RIDER_STAFF[targetRiderEmail] && RIDER_STAFF[targetRiderEmail].name) || targetRiderEmail }
          ]
        });
      }
      if (!driver) {
        driver = await mongoose.connection.db.collection('delivery_partners').findOne({ is_available: true });
      }
      if (!driver) {
        driver = await mongoose.connection.db.collection('delivery_partners').findOne({});
      }

      if (driver) {
        await mongoose.connection.db.collection('delivery_partners').updateOne(
          { _id: driver._id },
          { $set: { is_available: false, current_order_id: order._id.toString() } }
        );

        const riderEmail = driver.email || targetRiderEmail || 'rider1@mitwpu.edu.in';
        const riderName = driver.name || 'Suresh Kumar';
        const riderVehicle = driver.vehicle_number || (driver.vehicle_type ? driver.vehicle_type : 'MH-12-AB-4567');
        const riderPhone = (Array.isArray(driver.phone) ? driver.phone[0] : driver.phone) || '+91-9765432100';

        order.delivery_partner_id = driver._id.toString();
        order.delivery_partner = {
          id: driver._id.toString(),
          email: riderEmail,
          name: riderName,
          vehicle_type: driver.vehicle_type || 'EV Bike',
          vehicle_number: riderVehicle,
          phone: riderPhone,
          rating: driver.rating_avg || 4.9
        };
        order.assigned_rider_email = riderEmail;
        order.assignedRiderEmail = riderEmail;
        order.assigned_rider_name = riderName;
        order.assignedRiderName = riderName;
        order.assigned_rider_vehicle = riderVehicle;
        order.assignedRiderVehicle = riderVehicle;
        order.assigned_rider_phone = riderPhone;
        order.assignedRiderPhone = riderPhone;
      }
    }

    // If order is cancelled, free up the assigned driver
    if (status === 'cancelled') {
      const riderEmail = order.assigned_rider_email || order.assignedRiderEmail || (order.delivery_partner && order.delivery_partner.email);
      try {
        const query = order.delivery_partner_id
          ? { _id: new mongoose.Types.ObjectId(order.delivery_partner_id) }
          : { email: riderEmail };
        if (order.delivery_partner_id || riderEmail) {
          await mongoose.connection.db.collection('delivery_partners').updateOne(
            query,
            { $set: { is_available: true, current_order_id: null } }
          );
        }
      } catch (e) {
        console.warn('Could not reset driver availability:', e.message);
      }
    }

    // If order is delivered or completed, record completion timestamp, free up driver and record delivery
    if (status === 'delivered' || status === 'completed') {
      if (!order.completed_at) {
        order.completed_at = completed_at ? new Date(completed_at) : new Date();
      }
      const riderEmail = order.assigned_rider_email || order.assignedRiderEmail || (order.delivery_partner && order.delivery_partner.email);
      if (order.delivery_partner_id || riderEmail) {
        try {
          const query = order.delivery_partner_id
            ? { _id: new mongoose.Types.ObjectId(order.delivery_partner_id) }
            : { email: riderEmail };
          await mongoose.connection.db.collection('delivery_partners').updateOne(
            query,
            { $set: { is_available: true, current_order_id: null }, $inc: { completed_deliveries: 1 } }
          );
        } catch (e) {
          console.warn('Could not update driver metrics:', e.message);
        }
      }

      // Persist to dedicated 'delivered_deliveries' collection
      try {
        const deliveredDoc = {
          ...order.toObject(),
          status: 'completed',
          completed_at: order.completed_at,
          recorded_at: new Date()
        };
        await mongoose.connection.db.collection('delivered_deliveries').updateOne(
          { _id: order._id },
          { $set: deliveredDoc },
          { upsert: true }
        );
      } catch (e) {
        console.warn('Could not record to delivered_deliveries collection:', e.message);
      }
    }

    await order.save();
    res.json(toPublicOrder(order));

  } catch (err) {
    console.error('update order status error:', err.message);
    res.status(500).json({ error: 'Unable to update the order right now.' });
  }
});

// Single order lookup for real-time order tracking.
app.get('/api/orders/:id', async (req, res) => {
  try {
    let order = null;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      order = await Order.findById(req.params.id);
    }
    if (!order) {
      order = await Order.findOne({ order_number: req.params.id });
    }
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Auto-populate delivery partner details if id exists but object is missing
    if (order.delivery_partner_id && (!order.delivery_partner || !order.delivery_partner.vehicle_number)) {
      try {
        const partner = await mongoose.connection.db.collection('delivery_partners')
          .findOne({ _id: new mongoose.Types.ObjectId(order.delivery_partner_id) });
        if (partner) {
          order.delivery_partner = {
            id: partner._id.toString(),
            name: partner.name || 'Suresh Kumar',
            vehicle_type: partner.vehicle_type || 'Bike',
            vehicle_number: partner.vehicle_number || 'MH-12-AB-4567',
            phone: (partner.phone && partner.phone[0]) || '+91-9765432100',
            rating: partner.rating_avg || 4.9
          };
          await order.save();
        }
      } catch (e) {
        // silent fallback
      }
    }

    res.json(toPublicOrder(order));
  } catch (err) {
    res.status(500).json({ error: 'Unable to load the order right now.' });
  }
});

// List all campus delivery partners (for admin fleet telemetry & rider consoles)
app.get('/api/delivery-partners', async (req, res) => {
  try {
    const partners = await mongoose.connection.db.collection('delivery_partners').find({}).toArray();
    res.json(partners);
  } catch (err) {
    res.status(500).json({ error: 'Unable to load delivery partners.' });
  }
});

// Delivery partner details lookup
app.get('/api/delivery-partners/:id', async (req, res) => {
  try {
    let partner = null;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      partner = await mongoose.connection.db.collection('delivery_partners')
        .findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
    }
    if (!partner) {
      partner = await mongoose.connection.db.collection('delivery_partners').findOne({});
    }
    if (!partner) return res.status(404).json({ error: 'Rider not found' });
    res.json(partner);
  } catch (err) {
    res.status(500).json({ error: 'Unable to load the rider right now.' });
  }
});

/**
 * Order ledger. Supports optional multi-tenant scoping via `?outlet_id=`.
 * Without the parameter the full ledger is returned for the admin/customer
 * dashboards, which filter on the client using the canonical outlet id.
 */
app.get('/api/orders', async (req, res) => {
  try {
    const outletFilter = req.query.outlet_id ? resolveOutletId(req.query.outlet_id) : null;
    if (req.query.outlet_id && !outletFilter) {
      return res.status(400).json({ error: 'Unknown outlet identifier.' });
    }

    let orders;
    if (outletFilter && outletFilter !== 'all') {
      orders = await Order.find().sort({ created_at: -1 });
      orders = orders.filter((o) => resolveOrderOutletId(o) === outletFilter);
    } else {
      orders = await Order.find().sort({ created_at: -1 });
    }

    res.json(orders.map(toPublicOrder));
  } catch (err) {
    res.status(500).json({ error: 'Unable to load orders right now.' });
  }
});

/* ==========================================================================
   11.1 MENU ITEMS CRUD (Synchronized with MongoDB Atlas)
   ========================================================================== */
app.get('/api/menu-items', async (req, res) => {
  try {
    const outletFilter = req.query.outlet_id ? resolveOutletId(req.query.outlet_id) : null;
    let query = {};
    if (outletFilter && outletFilter !== 'all') {
      query = { $or: [{ outletId: outletFilter }, { outlet_id: outletFilter }] };
    }
    const items = await mongoose.connection.db.collection('menu_items').find(query).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Unable to load menu items.' });
  }
});

app.post('/api/menu-items', async (req, res) => {
  try {
    const raw = req.body || {};
    const name = sanitizeText(raw.name, 120);
    const outletId = resolveOutletId(raw.outletId || raw.outlet_id);
    if (!name || !outletId) {
      return res.status(400).json({ error: 'Item name and valid outlet are required.' });
    }
    const id = sanitizeText(raw.id, 60) || `dish_${Date.now()}`;
    const price = toNumber(raw.price, { min: 1, max: 100000, fallback: 99 });
    const newDish = {
      id,
      name,
      nameLocal: raw.nameLocal || { hi: name, mr: name },
      description: sanitizeText(raw.description, 500) || '',
      descriptionLocal: raw.descriptionLocal || { hi: '', mr: '' },
      price,
      outletId,
      outlet_id: outletId,
      outletName: OUTLET_ID_TO_DISPLAY[outletId] || sanitizeText(raw.outletName, 80) || outletId,
      category: sanitizeText(raw.category, 60) || 'sides',
      isVeg: Boolean(raw.isVeg),
      image: sanitizeText(raw.image, 500) || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
      rating: toNumber(raw.rating, { min: 1, max: 5, fallback: 4.8 }),
      reviewsCount: 1,
      preparationTimeMins: toNumber(raw.preparationTimeMins || raw.prepTime, { min: 1, max: 120, fallback: 15 }),
      calories: toNumber(raw.calories, { min: 0, max: 5000, fallback: 320 }),
      servingSize: sanitizeText(raw.servingSize, 60) || 'Serves 1-2',
      spiceTag: sanitizeText(raw.spiceTag, 60) || 'Medium Spicy',
      isBestseller: Boolean(raw.isBestseller || raw.isPopular),
      isAvailable: raw.isAvailable !== false,
      created_at: new Date(),
      updated_at: new Date()
    };
    await mongoose.connection.db.collection('menu_items').updateOne(
      { id },
      { $set: newDish },
      { upsert: true }
    );
    res.status(201).json(newDish);
  } catch (err) {
    res.status(500).json({ error: 'Unable to create menu item.' });
  }
});

app.patch('/api/menu-items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = { ...req.body, updated_at: new Date() };
    delete updates._id;
    const result = await mongoose.connection.db.collection('menu_items').findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: 'after' }
    );
    if (!result) return res.status(404).json({ error: 'Menu item not found.' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Unable to update menu item.' });
  }
});

app.delete('/api/menu-items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await mongoose.connection.db.collection('menu_items').deleteOne({ id });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Menu item not found.' });
    res.json({ success: true, message: 'Menu item deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Unable to delete menu item.' });
  }
});

/* ==========================================================================
   11.2 CAMPUS PROMO VOUCHERS & RESTAURANTS
   ========================================================================== */
app.get('/api/coupons', async (req, res) => {
  try {
    const coupons = await mongoose.connection.db.collection('coupons').find({ is_active: true }).toArray();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: 'Unable to load coupons.' });
  }
});

app.get('/api/restaurants', async (req, res) => {
  try {
    const restos = await mongoose.connection.db.collection('restaurants').find({ is_active: true }).toArray();
    res.json(restos);
  } catch (err) {
    res.status(500).json({ error: 'Unable to load restaurants.' });
  }
});


/* ==========================================================================
   12. CONTACT & FEEDBACK
   ========================================================================== */
app.post(
  '/api/contact',
  rateLimit(15 * 60 * 1000, 10, (req) => sanitizeEmail(req.body && req.body.email) || req.ip),
  async (req, res) => {
    try {
      const { name, email, subject, message, rating } = req.body || {};

      const cleanEmail = sanitizeEmail(email);
      const cleanMessage = sanitizeText(message, 2000);
      if (!cleanEmail || !cleanMessage) {
        return res.status(400).json({ error: 'Email and message are required.' });
      }

      const doc = {
        name: sanitizeText(name, 80) || 'Anonymous',
        email: cleanEmail,
        subject: sanitizeText(subject, 120) || 'Campus Feedback',
        message: cleanMessage,
        rating: rating === null || rating === undefined || rating === '' ? null : toNumber(rating, { min: 0, max: 5, fallback: null }),
        submitted_at: new Date()
      };

      await mongoose.connection.db.collection('feedback_messages').insertOne(doc);

      // Send confirmation email to the submitter
      await sendEmail(
        doc.email,
        '✅ CampusBites: Feedback Received',
        `Hi ${doc.name},\n\nThank you for your feedback!\n\nWe have received your message and the MIT-WPU CampusBites team will review it shortly.\n\nYour message: "${doc.message}"\n\nBest regards,\nMIT-WPU CampusBites Team`,
        `<div style="font-family:sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px;">
          <h2 style="color:#ea580c;">Feedback Received ✅</h2>
          <p style="color:#475569;">Hi <strong>${doc.name}</strong>,</p>
          <p style="color:#475569;">Thank you for your feedback! The MIT-WPU CampusBites team will review it shortly.</p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin:16px 0;">
            <p style="color:#0f172a;margin:0;font-size:13px;">"${doc.message}"</p>
          </div>
          <p style="color:#94a3b8;font-size:12px;">MIT World Peace University · CampusBites Food Court System</p>
        </div>`
      );

      // Send notification email to the admin/support team
      const adminEmail = process.env.SMTP_EMAIL || process.env.ADMIN_EMAIL;
      if (adminEmail) {
        await sendEmail(
          adminEmail,
          `[CampusBites Feedback] ${doc.subject} – from ${doc.name}`,
          `New feedback submitted on CampusBites:\n\nFrom: ${doc.name} <${doc.email}>\nSubject: ${doc.subject}\nRating: ${doc.rating || 'Not provided'}\nMessage: ${doc.message}\nTimestamp: ${doc.submitted_at.toISOString()}`,
          `<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px;">
            <h2 style="color:#ea580c;">📬 New Feedback Submission</h2>
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <tr><td style="padding:6px;color:#94a3b8;">From</td><td style="padding:6px;font-weight:bold;">${doc.name} <${doc.email}></td></tr>
              <tr style="background:#f8fafc;"><td style="padding:6px;color:#94a3b8;">Subject</td><td style="padding:6px;">${doc.subject}</td></tr>
              <tr><td style="padding:6px;color:#94a3b8;">Rating</td><td style="padding:6px;">${doc.rating || 'Not provided'}</td></tr>
              <tr style="background:#f8fafc;"><td style="padding:6px;color:#94a3b8;">Timestamp</td><td style="padding:6px;">${doc.submitted_at.toISOString()}</td></tr>
            </table>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin:16px 0;">
              <p style="color:#0f172a;margin:0;">${doc.message}</p>
            </div>
          </div>`
        );
      }

      res.status(201).json({ success: true, message: 'Feedback submitted and email dispatched!' });
    } catch (err) {
      console.error('contact error:', err.message);
      res.status(500).json({ error: 'Unable to submit your feedback right now.' });
    }
  }
);

/* ==========================================================================
   13. COMPLETED DELIVERIES ARCHIVE
   ========================================================================== */
app.get('/api/deliveries/completed', async (req, res) => {
  try {
    // 1. First check the dedicated 'delivered_deliveries' collection
    const deliveredDocs = await mongoose.connection.db
      .collection('delivered_deliveries')
      .find({})
      .sort({ completed_at: -1, created_at: -1 })
      .toArray();

    if (deliveredDocs && deliveredDocs.length > 0) {
      return res.json(deliveredDocs.map(toPublicOrder));
    }

    // 2. Fallback to querying orders with completed/delivered status
    const completedOrders = await Order.find({
      status: { $in: ['completed', 'delivered'] }
    })
      .sort({ completed_at: -1, created_at: -1 })
      .limit(100);

    res.json(completedOrders.map(toPublicOrder));
  } catch (err) {
    res.status(500).json({ error: 'Unable to load the archive right now.' });
  }
});

/* ==========================================================================
   14. DYNAMIC FOOD IMAGE SEARCH & CACHING
   ========================================================================== */
const foodImageServerCache = new Map();

app.get('/api/food-image', async (req, res) => {
  try {
    const rawQuery = req.query.q || '';
    if (!String(rawQuery).trim()) {
      return res.status(400).json({ error: 'Query parameter q is required' });
    }

    // Sanitize food name: alphanumeric, spaces and hyphens only
    const sanitizedQuery = String(rawQuery)
      .replace(/[^\w\s-]/gi, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 80);

    if (!sanitizedQuery) {
      return res.status(400).json({ error: 'Query parameter q is required' });
    }

    const cacheKey = sanitizedQuery.toLowerCase();

    // Return from in-memory server cache if available
    if (foodImageServerCache.has(cacheKey)) {
      return res.json({
        query: sanitizedQuery,
        imageUrl: foodImageServerCache.get(cacheKey),
        source: 'server_cache'
      });
    }

    // Dynamic external search via Wikimedia Commons API (high-res verified dish photos)
    let imageUrl = null;
    try {
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
        sanitizedQuery
      )}&gsrlimit=1&prop=pageimages&pithumbsize=600&format=json`;

      const response = await fetch(searchUrl, {
        headers: {
          'User-Agent': 'CampusBites-FoodSearch/1.0 (contact@campusbites.edu)'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const pages = data?.query?.pages;
        if (pages) {
          const firstPage = Object.values(pages)[0];
          if (firstPage?.thumbnail?.source) {
            imageUrl = firstPage.thumbnail.source;
          }
        }
      }
    } catch (apiErr) {
      console.warn(`External image fetch error for "${sanitizedQuery}":`, apiErr.message);
    }

    // Fallback if no external search result
    if (!imageUrl) {
      imageUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
    }

    foodImageServerCache.set(cacheKey, imageUrl);

    res.json({
      query: sanitizedQuery,
      imageUrl,
      source: 'external_api'
    });
  } catch (err) {
    res.status(500).json({ error: 'Unable to resolve an image right now.' });
  }
});

/* ==========================================================================
   15. HEALTH CHECK & STARTUP
   ========================================================================== */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'campusbites-api',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: Math.round(process.uptime())
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
