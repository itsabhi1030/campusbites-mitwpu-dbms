/* ==========================================================================
   CAMPUSBITES BRAND OUTLETS & 100+ DISHES CATALOG DATA
   All images are 100% verified food photos matching dish names accurately.
   ========================================================================== */

export const OUTLETS = [
  { id: 'all', name: 'All Outlets', shortName: 'All', tagline: 'Explore every kitchen on campus', logoUrl: '/logos/campusbites.svg', brandColor: 'from-orange-600 to-amber-600', monogram: 'CB', deliveryTime: '10-18m', rating: 4.9, offer: 'FLAT 50% OFF' },
  { id: 'dominos', name: "Domino's Pizza", shortName: "Domino's", tagline: 'Hand-stretched pizzas & molten bakes', logoUrl: '/logos/dominos.svg', brandColor: 'from-blue-600 to-red-600', monogram: 'DP', deliveryTime: '15m', rating: 4.8, offer: '30% OFF · DOMINOS30' },
  { id: 'mcdonalds', name: "McDonald's", shortName: 'McD', tagline: 'Golden fries, crispy burgers & shakes', logoUrl: '/logos/mcdonalds.svg', brandColor: 'from-red-600 to-amber-500', monogram: 'McD', deliveryTime: '12m', rating: 4.8, offer: 'FREE FRIES > ₹249' },
  { id: 'kfc', name: 'KFC', shortName: 'KFC', tagline: 'Crunch-coated fried chicken & zingers', logoUrl: '/logos/kfc.svg', brandColor: 'from-rose-700 to-red-600', monogram: 'KFC', deliveryTime: '15m', rating: 4.7, offer: 'FLAT ₹75 OFF' },
  { id: 'burger_king', name: 'Burger King', shortName: 'BK', tagline: 'Flame-grilled whoppers & peri-peri fries', logoUrl: '/logos/burger_king.svg', brandColor: 'from-orange-600 to-amber-700', monogram: 'BK', deliveryTime: '14m', rating: 4.7, offer: '2 WHOPPERS @ ₹299' },
  { id: 'subway', name: 'Subway', shortName: 'Subway', tagline: 'Oven-fresh artisan subs & protein salads', logoUrl: '/logos/subway.svg', brandColor: 'from-emerald-600 to-yellow-500', monogram: 'SUB', deliveryTime: '10m', rating: 4.9, offer: 'FREE COOKIE ON SUB' },
  { id: 'starbucks', name: 'Starbucks', shortName: 'Starbucks', tagline: 'Signature espresso roasts & frappuccinos', logoUrl: '/logos/starbucks.svg', brandColor: 'from-emerald-800 to-teal-700', monogram: 'SBX', deliveryTime: '8m', rating: 4.9, offer: '20% STUDENT PERK' },
  { id: 'taco_bell', name: 'Taco Bell', shortName: 'Taco Bell', tagline: 'Crunchy tacos, burritos & loaded nachos', logoUrl: '/logos/taco_bell.svg', brandColor: 'from-purple-700 to-indigo-600', monogram: 'TB', deliveryTime: '12m', rating: 4.6, offer: 'TACO PARTY COMBO' },
  { id: 'haldirams', name: "Haldiram's", shortName: "Haldiram's", tagline: 'Royal north Indian thalis, chaats & sweets', logoUrl: '/logos/haldirams.svg', brandColor: 'from-red-600 to-amber-600', monogram: 'HR', deliveryTime: '10m', rating: 4.9, offer: 'DESI FEAST 20% OFF' },
  { id: 'wow_momo', name: 'Wow! Momo', shortName: 'Wow! Momo', tagline: 'Himalayan steamed & sizzler pan-fried momos', logoUrl: '/logos/wow_momo.svg', brandColor: 'from-amber-500 to-orange-600', monogram: 'WM', deliveryTime: '10m', rating: 4.7, offer: 'MOMO PLATTER ₹149' },
  { id: 'chaayos', name: 'Chaayos', shortName: 'Chaayos', tagline: 'Earthen kulhad chai & warm bun maska', logoUrl: '/logos/chaayos.svg', brandColor: 'from-amber-700 to-emerald-700', monogram: 'CHY', deliveryTime: '6m', rating: 4.8, offer: 'CHAI + BUN @ ₹99' },
  { id: 'baskin_robbins', name: 'Baskin Robbins', shortName: 'Baskin 31', tagline: '31 handcrafted ice cream scoops & sundaes', logoUrl: '/logos/baskin_robbins.svg', brandColor: 'from-pink-600 to-blue-600', monogram: 'BR', deliveryTime: '5m', rating: 4.9, offer: 'DOUBLE SCOOP DEAL' },
  { id: 'behrouz_biryani', name: 'Behrouz Biryani', shortName: 'Behrouz', tagline: 'Slow-cooked royal dum biryanis & kebabs', logoUrl: '/logos/behrouz_biryani.svg', brandColor: 'from-amber-700 to-yellow-600', monogram: 'BB', deliveryTime: '18m', rating: 4.9, offer: 'FLAT ₹100 OFF · BIRYANI100' },
  { id: 'madras_cafe', name: 'Madras Tiffin', shortName: 'Madras', tagline: 'Ghee podi dosas, fluffy idlis & filter kaapi', logoUrl: '/logos/madras_cafe.svg', brandColor: 'from-emerald-700 to-lime-600', monogram: 'MTR', deliveryTime: '8m', rating: 4.9, offer: 'COMBO BREAKFAST' },
  { id: 'belgian_waffle', name: 'Belgian Waffle', shortName: 'Waffle Co', tagline: 'Warm crispy waff-wiches & Nutella drizzles', logoUrl: '/logos/belgian_waffle.svg', brandColor: 'from-amber-600 to-stone-800', monogram: 'BWC', deliveryTime: '10m', rating: 4.8, offer: 'FLAT 25% · WAFFLE25' },
  { id: 'pizza_hut', name: 'Pizza Hut', shortName: 'Pizza Hut', tagline: 'Signature pan pizzas & cheese garlic breads', logoUrl: '/logos/pizza_hut.svg', brandColor: 'from-red-700 to-rose-600', monogram: 'PH', deliveryTime: '16m', rating: 4.7, offer: 'PAN PIZZA @ ₹199' },
  { id: 'naturals', name: "Natural's Ice Cream", shortName: "Natural's", tagline: 'Real fruit scoops with zero preservatives', logoUrl: '/logos/naturals.svg', brandColor: 'from-green-600 to-emerald-700', monogram: 'NAT', deliveryTime: '5m', rating: 4.9, offer: 'SEASONAL MANGO HIT' },
  { id: 'faasos', name: 'Faasos Wraps', shortName: 'Faasos', tagline: 'Loaded masala wraps, shawarmas & rice bowls', logoUrl: '/logos/faasos.svg', brandColor: 'from-indigo-700 to-purple-700', monogram: 'FSS', deliveryTime: '11m', rating: 4.8, offer: 'WRAP DUO SAVE ₹60' },
  { id: 'keventers', name: 'Keventers', shortName: 'Keventers', tagline: 'Iconic thick milkshakes & cold coffee bottles', logoUrl: '/logos/keventers.svg', brandColor: 'from-sky-700 to-blue-600', monogram: 'KV', deliveryTime: '8m', rating: 4.8, offer: 'SHAKE DUO @ ₹219' },
  { id: 'california_burrito', name: 'California Burrito', shortName: 'Cal Burrito', tagline: 'Fresh Mexican burrito bowls, tacos & loaded nachos', logoUrl: '/logos/california_burrito.svg', brandColor: 'from-yellow-600 to-red-600', monogram: 'CB', deliveryTime: '12m', rating: 4.8, offer: 'RICE BOWL @ ₹199' },
  { id: 'rolls_mania', name: 'Rolls Mania', shortName: 'Rolls Mania', tagline: 'Loaded kathi rolls, egg wraps & spicy frankies', logoUrl: '/logos/rolls_mania.svg', brandColor: 'from-orange-600 to-red-700', monogram: 'RM', deliveryTime: '9m', rating: 4.7, offer: 'BUY 2 SAVE ₹50' },
  { id: 'mainland_china', name: 'Mainland China Bowl', shortName: 'Mainland', tagline: 'Wok-tossed hakka noodles, dim sums & spicy gravies', logoUrl: '/logos/mainland_china.svg', brandColor: 'from-red-800 to-amber-700', monogram: 'MC', deliveryTime: '15m', rating: 4.9, offer: 'DIM SUM FEST 20%' },
  { id: 'dunkin', name: "Dunkin'", shortName: 'Dunkin', tagline: 'Glazed artisan donuts, iced brew & signature bagels', logoUrl: '/logos/dunkin.svg', brandColor: 'from-pink-600 to-orange-500', monogram: 'DD', deliveryTime: '7m', rating: 4.8, offer: '6 DONUTS @ ₹349' },
  { id: 'bbq_nation', name: 'Barbeque Nation Express', shortName: 'BBQ Nation', tagline: 'Smoky skewered kebabs, grilled wings & biryani platters', logoUrl: '/logos/bbq_nation.svg', brandColor: 'from-amber-700 to-red-800', monogram: 'BN', deliveryTime: '16m', rating: 4.8, offer: 'GRILL BOX 25% OFF' },
  { id: 'amul_ice', name: 'Amul Ice Cream', shortName: 'Amul', tagline: "India's favourite real milk ice creams & kulfi", logoUrl: '/logos/amul_ice.svg', brandColor: 'from-sky-600 to-indigo-600', monogram: 'AM', deliveryTime: '4m', rating: 4.8, offer: 'KULFI DUO @ ₹69' },
  { id: 'juice_junction', name: 'Juice Junction', shortName: 'Juice+', tagline: 'Fresh-pressed juices, smoothies & energy shakes', logoUrl: '/logos/juice_junction.svg', brandColor: 'from-lime-600 to-green-700', monogram: 'JJ', deliveryTime: '5m', rating: 4.9, offer: 'BUY 2 GET 1 FREE' }
];

/* ==========================================================================
   MULTI-TENANT OUTLET RESOLUTION HELPERS (KDS ORDER ROUTING)
   Every order must be attributable to exactly one canonical outlet ID so the
   Kitchen Display System can isolate tickets per tenant. Legacy rows may hold
   an outlet *name* instead of an ID, so both are normalised through
   `resolveOutletId()` before any comparison is made.
   ========================================================================== */

/** Real (non-aggregator) outlets only — the 'all' pseudo-outlet is excluded. */
export const REAL_OUTLETS = OUTLETS.filter((o) => o.id !== 'all');

/** outletId -> canonical display name */
export const OUTLET_NAME_BY_ID = REAL_OUTLETS.reduce((acc, o) => {
  acc[o.id] = o.name;
  return acc;
}, {});

/** Normalised (lowercase) name / shortName / id -> outletId */
export const OUTLET_ID_BY_NAME = REAL_OUTLETS.reduce((acc, o) => {
  [o.id, o.name, o.shortName].forEach((key) => {
    if (!key) return;
    const norm = String(key).trim().toLowerCase();
    if (norm && !acc[norm]) acc[norm] = o.id;
  });
  return acc;
}, {});

const slugify = (value) =>
  String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

/**
 * Resolve any outlet reference (id, name, short name, or loose slug) to its
 * canonical outlet ID. Returns `null` when the reference cannot be mapped.
 */
export function resolveOutletId(value) {
  if (value === null || value === undefined) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  if (raw === 'all') return 'all';

  const norm = raw.toLowerCase();
  if (OUTLET_ID_BY_NAME[norm]) return OUTLET_ID_BY_NAME[norm];

  const slug = slugify(raw);
  if (!slug) return null;
  if (OUTLET_NAME_BY_ID[slug]) return slug;
  if (OUTLET_ID_BY_NAME[slug]) return OUTLET_ID_BY_NAME[slug];
  return null;
}

/** Resolve any outlet reference to its canonical display name (or `null`). */
export function resolveOutletName(value) {
  const id = resolveOutletId(value);
  return id && id !== 'all' ? OUTLET_NAME_BY_ID[id] || null : null;
}

/**
 * Tenant key for an order. Orders created before outlet IDs were enforced may
 * only carry the outlet name inside `items[]`, so every candidate field is
 * probed. Returns `null` when the order cannot be attributed to an outlet.
 */
export function resolveOrderOutletId(order) {
  if (!order) return null;

  const direct = resolveOutletId(order.restaurant_id || order.outlet_id || order.restaurant_name);
  if (direct && direct !== 'all') return direct;

  const items = Array.isArray(order.items) ? order.items : [];
  for (const item of items) {
    const id = resolveOutletId(item && (item.outletId || item.outlet_id || item.outletName));
    if (id && id !== 'all') return id;
  }
  return direct || null;
}

/** True when the order belongs to the given outlet tenant. */
export function orderBelongsToOutlet(order, outletId) {
  if (!outletId || outletId === 'all') return true;
  return resolveOrderOutletId(order) === outletId;
}

export const CATEGORIES = [
  { id: 'all', icon: '✨' },
  { id: 'pizzas', icon: '🍕' },
  { id: 'burgers', icon: '🍔' },
  { id: 'subs', icon: '🥖' },
  { id: 'biryani_rice', icon: '🥘' },
  { id: 'south_indian', icon: '🥞' },
  { id: 'asian_momos', icon: '🥟' },
  { id: 'chicken_crisps', icon: '🍗' },
  { id: 'indian_chaat', icon: '🍛' },
  { id: 'mexican', icon: '🌮' },
  { id: 'coffee_tea', icon: '☕' },
  { id: 'waffles_crepes', icon: '🧇' },
  { id: 'desserts_shakes', icon: '🍨' },
  { id: 'sides', icon: '🍟' },
];

export const PROMO_CODES = {
  CAMPUS50: { discountPercent: 50, maxDiscount: 100, minOrder: 199 },
  DOMINOS30: { discountPercent: 30, maxDiscount: 120, minOrder: 249 },
  BIRYANI100: { discountPercent: 35, maxDiscount: 100, minOrder: 299 },
  WAFFLE25: { discountPercent: 25, maxDiscount: 80, minOrder: 150 },
  FREEDEL: { discountPercent: 100, maxDiscount: 20, minOrder: 149 },
};

export const RIDERS_DATA = [
  { id: 'rider1', email: 'rider1@mitwpu.edu.in', pass: 'Rider@Suresh1', name: 'Suresh Kumar', vehicle: 'MH-12-AB-4567', phone: '+91-9765432100', rating: 4.9 },
  { id: 'rider2', email: 'rider2@mitwpu.edu.in', pass: 'Rider@Ramesh2', name: 'Ramesh Shinde', vehicle: 'MH-12-CD-8901', phone: '+91-9822334455', rating: 4.8 },
  { id: 'rider3', email: 'rider3@mitwpu.edu.in', pass: 'Rider@Amit3', name: 'Amit Patil', vehicle: 'MH-12-EF-2345', phone: '+91-9977665544', rating: 4.9 },
  { id: 'rider4', email: 'rider4@mitwpu.edu.in', pass: 'Rider@Vikas4', name: 'Vikas Deshmukh', vehicle: 'MH-12-GH-6789', phone: '+91-9123456780', rating: 4.7 },
  { id: 'rider5', email: 'rider5@mitwpu.edu.in', pass: 'Rider@Rahul5', name: 'Rahul Kulkarni', vehicle: 'MH-12-JK-0123', phone: '+91-9345678901', rating: 4.8 },
  { id: 'rider6', email: 'rider6@mitwpu.edu.in', pass: 'Rider@Sachin6', name: 'Sachin More', vehicle: 'MH-12-LM-4567', phone: '+91-9567890123', rating: 4.9 },
];

export const KITCHEN_CREDENTIALS = {
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
  'juicejunction@mitwpu.edu.in': { pass: 'Juice@Fresh33', outletId: 'juice_junction', outletName: 'Juice Junction' },
};

export const INITIAL_MENU_ITEMS = [
  // 1. Domino's Pizza (dominos)
  {
    id: 'dom-1', name: 'Margherita Pizza', nameLocal: { hi: 'मार्गेरिटा पिज़्ज़ा', mr: 'मार्गेरिटा पिझ्झा' },
    description: 'San Marzano tomato sauce topped with 100% real stretched mozzarella and sweet basil.',
    descriptionLocal: { hi: '१००% असली मोज़ेरेला चीज़ और ताज़ा बेसिल के साथ क्लासिक पिज़्ज़ा।', mr: '१००% अस्सल मोझरेला चीज आणि ताज्या तुळशीसह क्लासिक पिझ्झा.' },
    price: 199, outletId: 'dominos', outletName: "Domino's Pizza", category: 'pizzas', isVeg: true,
    image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 420, preparationTimeMins: 15, calories: 680, servingSize: 'Serves 1-2', spiceTag: 'Mild', isBestseller: true
  },
  {
    id: 'dom-2', name: 'Peppy Paneer Pizza', nameLocal: { hi: 'पेपी पनीर पिज़्ज़ा', mr: 'पेपी पनीर पिझ्झा' },
    description: 'Spiced malai paneer cubes, crunchy capsicum, and zesty red paprika over molten cheese.',
    descriptionLocal: { hi: 'मसालेदार पनीर, शिमला मिर्च और लाल पपरीका के साथ चीज़ी पिज़्ज़ा।', mr: 'मसालेदार पनीर, सिमला मिरची आणि तिखट रेड पाप्रीकासह चीझी पिझ्झा.' },
    price: 399, outletId: 'dominos', outletName: "Domino's Pizza", category: 'pizzas', isVeg: true,
    image: 'https://images.unsplash.com/photo-1672717973894-40efe25310db?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 580, preparationTimeMins: 18, calories: 820, servingSize: 'Serves 2-3', spiceTag: 'Medium Spicy', isBestseller: true
  },
  {
    id: 'dom-3', name: 'Pepper Barbecue Chicken Pizza', nameLocal: { hi: 'पेपर बारबेक्यू चिकन पिज़्ज़ा', mr: 'पेपर बारबेक्यू चिकन पिझ्झा' },
    description: 'Smoky barbecue roasted chicken chunks layered with golden corn and extra mozzarella.',
    descriptionLocal: { hi: 'स्मोकी बारबेक्यू चिकन और स्वीट कॉर्न से भरपूर पिज़्ज़ा।', mr: 'स्मोकी बारबेक्यू चिकन आणि कॉर्नने भरलेला चीझी पिझ्झा.' },
    price: 449, outletId: 'dominos', outletName: "Domino's Pizza", category: 'pizzas', isVeg: false,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 390, preparationTimeMins: 16, calories: 860, servingSize: 'Serves 2-3', spiceTag: 'Smoky Sweet', isBestseller: true
  },
  {
    id: 'dom-4', name: 'Herb Garlic Breadsticks', nameLocal: { hi: 'हर्ब गार्लिक ब्रेडस्टिक्स', mr: 'हर्ब गार्लिक ब्रेडस्टिक्स' },
    description: 'Warm oven-baked breadsticks brushed with roasted garlic butter and Italian oregano.',
    descriptionLocal: { hi: 'भुने लहसुन मक्खन और ओरेगैनो के साथ बेक की हुई ब्रेडस्टिक्स।', mr: 'भाजलेले लसूण बटर आणि ओरेगॅनोने बेक केलेल्या ब्रेडस्टिक्स.' },
    price: 129, outletId: 'dominos', outletName: "Domino's Pizza", category: 'sides', isVeg: true,
    image: 'https://images.unsplash.com/photo-1587676353811-1708ddf47031?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 710, preparationTimeMins: 10, calories: 360, servingSize: 'Serves 1-2', spiceTag: 'Garlic Butter', isBestseller: true
  },

  // 2. McDonald's (mcdonalds)
  {
    id: 'mcd-1', name: 'McSpicy Paneer Burger', nameLocal: { hi: 'मैकस्पाइसी पनीर बर्गर', mr: 'मॅकस्पायसी पनीर बर्गर' },
    description: 'Crispy battered cottage cheese fillet topped with iceberg lettuce and tandoori mayo.',
    descriptionLocal: { hi: 'क्रिस्पी मसालेदार पनीर पैटी और तंदूरी मेयो बर्गर।', mr: 'कुरकुरीत मसालेदार पनीर पॅटी आणि तंदूरी मेयो बर्गर.' },
    price: 199, outletId: 'mcdonalds', outletName: "McDonald's", category: 'burgers', isVeg: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 850, preparationTimeMins: 10, calories: 520, servingSize: 'Serves 1', spiceTag: 'Spicy', isBestseller: true
  },
  {
    id: 'mcd-2', name: 'McSpicy Chicken Burger', nameLocal: { hi: 'मैकस्पाइसी चिकन बर्गर', mr: 'मॅकस्पायसी चिकन बर्गर' },
    description: 'Juicy zesty chicken breast patty fried golden and served with creamy habanero sauce.',
    descriptionLocal: { hi: 'कुरकुरा रसीला चिकन पैटी बर्गर और क्रीमी सॉस।', mr: 'कुरकुरीत चिकन पॅटी, क्रीमी सॉस आणि ताजी लेट्यूस.' },
    price: 219, outletId: 'mcdonalds', outletName: "McDonald's", category: 'burgers', isVeg: false,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 920, preparationTimeMins: 11, calories: 540, servingSize: 'Serves 1', spiceTag: 'Fiery', isBestseller: true
  },
  {
    id: 'mcd-3', name: 'McAloo Tikki Burger', nameLocal: { hi: 'मैकआलू टिक्की बर्गर', mr: 'मॅकआलू टिक्की बर्गर' },
    description: 'Spiced potato and green peas patty with sweet tomato mayo and crisp red onions.',
    descriptionLocal: { hi: 'कुरकुरी आलू टिक्की, ताज़े टमाटर और स्पेशल मेयोनेज़।', mr: 'कुरकुरीत बटाटा टिक्की आणि चवदार मेयोनेझ.' },
    price: 69, outletId: 'mcdonalds', outletName: "McDonald's", category: 'burgers', isVeg: true,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 1120, preparationTimeMins: 7, calories: 340, servingSize: 'Serves 1', spiceTag: 'Mild Spicy', isBestseller: true
  },
  {
    id: 'mcd-4', name: 'World Famous Golden Fries', nameLocal: { hi: 'गोल्डन फ्रेंच फ्राइज़', mr: 'गोल्डन फ्रेंच फ्राईज' },
    description: 'Russet potatoes cut crisp, fried golden, and lightly salted while piping hot.',
    descriptionLocal: { hi: 'गोल्डन क्रिस्पी फ्रेंच फ्राइज़, हल्के नमक के साथ।', mr: 'सोनेरी कुरकुरीत फ्रेंच फ्राईज.' },
    price: 115, outletId: 'mcdonalds', outletName: "McDonald's", category: 'sides', isVeg: true,
    image: 'https://images.unsplash.com/photo-1714651620426-1ae32ca6b418?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 1450, preparationTimeMins: 6, calories: 440, servingSize: 'Serves 1-2', spiceTag: 'Salted', isBestseller: true
  },

  // 3. KFC (kfc)
  {
    id: 'kfc-1', name: 'Hot & Crispy Chicken Bucket (4 Pcs)', nameLocal: { hi: 'हॉट एंड क्रिस्पी चिकन', mr: 'हॉट आणि क्रिस्पी चिकन' },
    description: 'Signature bone-in chicken marinated in 11 secret herbs and double-breaded for extra crunch.',
    descriptionLocal: { hi: 'केएफसी का मशहूर कुरकुरा चिकन, ११ मसालों से तैयार।', mr: 'केएफसीचे प्रसिद्ध ११ मसाल्यांनी युक्त कुरकुरीत चिकन.' },
    price: 399, outletId: 'kfc', outletName: 'KFC', category: 'chicken_crisps', isVeg: false,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 1200, preparationTimeMins: 14, calories: 780, servingSize: 'Serves 2', spiceTag: 'Crunchy Spicy', isBestseller: true
  },
  {
    id: 'kfc-2', name: 'Classic Chicken Zinger Burger', nameLocal: { hi: 'चिकन ज़िंगर बर्गर', mr: 'चिकन झिंगर बर्गर' },
    description: 'Extra-crunchy whole muscle chicken fillet with signature pepper mayo in a toasted bun.',
    descriptionLocal: { hi: 'सुपर क्रंची चिकन फिलेट बर्गर, मेयो और लेट्यूस के साथ।', mr: 'सुपर क्रंची चिकन फिलेट बर्गर, मेयो आणि लेट्यूससह.' },
    price: 199, outletId: 'kfc', outletName: 'KFC', category: 'burgers', isVeg: false,
    image: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 890, preparationTimeMins: 10, calories: 510, servingSize: 'Serves 1', spiceTag: 'Pepper Crunch', isBestseller: true
  },
  {
    id: 'kfc-3', name: 'Peri Peri Boneless Chicken Strips', nameLocal: { hi: 'पेरी पेरी चिकन स्ट्रिप्स', mr: 'पेरी पेरी चिकन पट्ट्या' },
    description: 'Juicy boneless chicken tenders dusted with fiery African bird’s eye chili spice.',
    descriptionLocal: { hi: 'तीखे पेरी पेरी मसाले से भरी बोनलेस चिकन स्ट्रिप्स।', mr: 'तिखट पेरी पेरी मसाल्याने भरलेल्या बोनलेस चिकन पट्ट्या.' },
    price: 249, outletId: 'kfc', outletName: 'KFC', category: 'chicken_crisps', isVeg: false,
    image: 'https://images.unsplash.com/photo-1762631884776-e1a2e5cd6d8d?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 610, preparationTimeMins: 10, calories: 420, servingSize: 'Serves 1-2', spiceTag: 'Fiery Peri-Peri', isBestseller: false
  },
  {
    id: 'kfc-4', name: 'Krushers Choco Oreo Thickshake', nameLocal: { hi: 'ओरियो क्रशर शेक', mr: 'ओरियो क्रशर शेक' },
    description: 'Thick creamy milkshake blended with vanilla soft-serve and crushed chocolate Oreos.',
    descriptionLocal: { hi: 'ओरियो कुकीज़ और वनीला आइसक्रीम से बना गाढ़ा मिल्कशेक।', mr: 'ओरियो कुकीज आणि व्हॅनिला आईस्क्रीमचा थंडगार दाट शेक.' },
    price: 149, outletId: 'kfc', outletName: 'KFC', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 430, preparationTimeMins: 5, calories: 340, servingSize: 'Serves 1', spiceTag: 'Sweet Cream', isBestseller: true
  },

  // 4. Burger King (burger_king)
  {
    id: 'bk-1', name: 'Crispy Veg Double Patty Burger', nameLocal: { hi: 'क्रिस्पी वेज बर्गर', mr: 'क्रिस्पी व्हेज बर्गर' },
    description: 'Crunchy herb-spiced vegetable patty layered with onion rings and signature king sauce.',
    descriptionLocal: { hi: 'क्रिस्पी वेज पैटी, क्रीमी मेयो और ताज़ी लेट्यूस।', mr: 'कुरकुरीत व्हेज पॅटी, क्रीमी मेयो आणि ताजी लेट्यूस.' },
    price: 119, outletId: 'burger_king', outletName: 'Burger King', category: 'burgers', isVeg: true,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    rating: 4.6, reviewsCount: 380, preparationTimeMins: 10, calories: 410, servingSize: 'Serves 1', spiceTag: 'Mild', isBestseller: true
  },
  {
    id: 'bk-2', name: 'Flame-Grilled Veg Whopper', nameLocal: { hi: 'वेज व्हॉपर बर्गर', mr: 'व्हेज व्हॉपर बर्गर' },
    description: 'Oversized sesame bun stacked with flame-grilled patty, gherkins, tomatoes, and smoky sauce.',
    descriptionLocal: { hi: 'बड़ा फ्लेम-ग्रिल्ड वेज बर्गर, ताज़े टमाटर और सिग्नेचर सॉस।', mr: 'मोठा फ्लेम-ग्रिल्ड व्हेज बर्गर, ताजे टोमॅटो आणि स्वादीष्ट सॉस.' },
    price: 219, outletId: 'burger_king', outletName: 'Burger King', category: 'burgers', isVeg: true,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 495, preparationTimeMins: 14, calories: 590, servingSize: 'Serves 1', spiceTag: 'Smoky', isBestseller: true
  },
  {
    id: 'bk-3', name: 'Fiery Peri Peri Crinkle Fries', nameLocal: { hi: 'पेरी पेरी क्रिंकल फ्राइज़', mr: 'पेरी पेरी फ्राईज' },
    description: 'Thick-cut potato fries tossed in tangy red chili and garlic peri-peri seasoning.',
    descriptionLocal: { hi: 'तीखे पेरी पेरी मसाले से भरपूर कुरकुरे फ्रेंच फ्राइज़।', mr: 'तिखट पेरी पेरी मसाल्याने भरलेले कुरकुरीत बटाटा फ्राईज.' },
    price: 99, outletId: 'burger_king', outletName: 'Burger King', category: 'sides', isVeg: true,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 410, preparationTimeMins: 8, calories: 320, servingSize: 'Serves 1', spiceTag: 'Tangy Spicy', isBestseller: true
  },
  {
    id: 'bk-4', name: 'Crispy Chicken King Burger', nameLocal: { hi: 'चिकन किंग बर्गर', mr: 'चिकन किंग बर्गर' },
    description: 'Crispy fried chicken breast fillet with creamy mayo and crunchy shredded lettuce.',
    descriptionLocal: { hi: 'कुरकुरा चिकन बर्गर, क्रीमी मेयो और ताज़ी लेट्यूस के साथ।', mr: 'कुरकुरीत चिकन बर्गर आणि क्रीमी मेयो.' },
    price: 179, outletId: 'burger_king', outletName: 'Burger King', category: 'burgers', isVeg: false,
    image: 'https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 390, preparationTimeMins: 11, calories: 480, servingSize: 'Serves 1', spiceTag: 'Crispy Mild', isBestseller: false
  },

  // 5. Subway (subway)
  {
    id: 'sub-1', name: 'Tandoori Paneer Tikka Sub (15cm)', nameLocal: { hi: 'पनीर टिक्का सब', mr: 'पनीर टिक्का सब' },
    description: 'Char-grilled paneer cubes with crisp bell peppers, olives, jalapeños, and chipotle southwest dressing.',
    descriptionLocal: { hi: 'तंदूरी पनीर, ताज़ी सब्जियां और चिपोतले सॉस से तैयार सब।', mr: 'तंदूरी पनीर तुकडे, ताज्या भाज्या आणि चिपोतले सॉसचा सब.' },
    price: 249, outletId: 'subway', outletName: 'Subway', category: 'subs', isVeg: true,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 560, preparationTimeMins: 12, calories: 480, servingSize: 'Serves 1', spiceTag: 'Tandoori Zest', isBestseller: true
  },
  {
    id: 'sub-2', name: 'Crunch Veggie Delite Sub (15cm)', nameLocal: { hi: 'वेजी डिलाइट सब', mr: 'व्हेजी डिलाईट सब' },
    description: 'Freshly baked multigrain loaf packed with lettuce, cucumbers, tomatoes, and sweet onion glaze.',
    descriptionLocal: { hi: 'सलाद पत्ता, टमाटर, खीरा और स्वीट अनियन सॉस के साथ हेल्दी सब।', mr: 'ताजी लेट्यूस, टोमॅटो, काकडी आणि स्वीट अनियन सॉसचा पौष्टिक सब.' },
    price: 199, outletId: 'subway', outletName: 'Subway', category: 'subs', isVeg: true,
    image: 'https://images.unsplash.com/photo-1744970531074-4a130cd21cfc?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 390, preparationTimeMins: 10, calories: 340, servingSize: 'Serves 1', spiceTag: 'Healthy Fresh', isBestseller: false
  },
  {
    id: 'sub-3', name: 'Double Dark Chocolate Chunk Cookie', nameLocal: { hi: 'डबल डार्क कुकी', mr: 'डबल डार्क कुकी' },
    description: 'Chewy oven-warm Dutch cocoa cookie studded with semi-sweet chocolate chunks.',
    descriptionLocal: { hi: 'डार्क चॉकलेट चिप्स से भरी नरम और स्वादिष्ट कुकी।', mr: 'डार्क चॉकलेट चिप्सने भरलेली मऊ आणि चवदार कुकी.' },
    price: 69, outletId: 'subway', outletName: 'Subway', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 480, preparationTimeMins: 3, calories: 220, servingSize: 'Serves 1', spiceTag: 'Rich Cocoa', isBestseller: true
  },
  {
    id: 'sub-4', name: 'Roasted Chicken Breast Sub (15cm)', nameLocal: { hi: 'रोस्टेड चिकन सब', mr: 'रोस्टेड चिकन सब' },
    description: 'Tender roasted chicken slices topped with crisp garden vegetables and barbecue garlic mayo.',
    descriptionLocal: { hi: 'मखमली रोस्टेड चिकन और ताज़ी सब्जियों का सब।', mr: 'चविष्ट रोस्टेड चिकन आणि ताज्या भाज्यांचा सब.' },
    price: 279, outletId: 'subway', outletName: 'Subway', category: 'subs', isVeg: false,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 420, preparationTimeMins: 11, calories: 510, servingSize: 'Serves 1', spiceTag: 'Herbed Garlic', isBestseller: true
  },

  // 6. Starbucks (starbucks)
  {
    id: 'sb-1', name: 'Caramel Java Chip Frappuccino', nameLocal: { hi: 'जावा चिप फ्रैपुचिनो', mr: 'जावा चिप फ्रॅप्युचिनो' },
    description: 'Arabica roast coffee blended with mocha sauce, chocolate chips, ice, and whipped caramel.',
    descriptionLocal: { hi: 'चॉकलेट चिप्स और कारमेल सिरप से बना चिल्ड कॉफी ड्रिंक।', mr: 'चॉकलेट चिप्स आणि कॅरमेलसह प्रसिद्ध थंडगार कॉफी.' },
    price: 345, outletId: 'starbucks', outletName: 'Starbucks', category: 'coffee_tea', isVeg: true,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 780, preparationTimeMins: 6, calories: 410, servingSize: 'Serves 1', spiceTag: 'Sweet Roast', isBestseller: true
  },
  {
    id: 'sb-2', name: 'Iced Vanilla Caramel Macchiato', nameLocal: { hi: 'आइस्ड कारमेल मैकिएटो', mr: 'आईस्ड कॅरमेल मॅकियाटो' },
    description: 'Cold milk and Madagascar vanilla syrup poured over ice and marked with rich espresso.',
    descriptionLocal: { hi: 'एस्प्रेसो, वनीला और कारमेल की लेयर वाली आइस्ड कॉफी।', mr: 'एस्प्रेसो, व्हॅनिला आणि कॅरमेलचे लेयर्ड आईस्ड कॉफी पेय.' },
    price: 315, outletId: 'starbucks', outletName: 'Starbucks', category: 'coffee_tea', isVeg: true,
    image: 'https://images.unsplash.com/photo-1773814529187-cb848af6bfc1?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 520, preparationTimeMins: 5, calories: 240, servingSize: 'Serves 1', spiceTag: 'Vanilla Bold', isBestseller: true
  },
  {
    id: 'sb-3', name: 'Signature Hot Caffe Latte', nameLocal: { hi: 'हॉट कैफे लाते', mr: 'हॉट कॅफे लाते' },
    description: 'Dark, rich espresso balanced with steamed milk and a light layer of micro-foam.',
    descriptionLocal: { hi: 'गरम एस्प्रेसो और स्टीम्ड मिल्क से बनी परफेक्ट लाते।', mr: 'गरम एस्प्रेसो आणि स्टीम्ड दुधाची कॅफे लाते.' },
    price: 260, outletId: 'starbucks', outletName: 'Starbucks', category: 'coffee_tea', isVeg: true,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 390, preparationTimeMins: 4, calories: 180, servingSize: 'Serves 1', spiceTag: 'Smooth Bold', isBestseller: false
  },
  {
    id: 'sb-4', name: 'Butter Croissant & Espresso Combo', nameLocal: { hi: 'बटर क्रोइसैंट कॉम्बो', mr: 'बटर क्रोइसंट कॉम्बो' },
    description: 'Flaky 100% French butter croissant paired with a single shot of dark espresso.',
    descriptionLocal: { hi: 'मक्खन से लबालब क्रोइसैंट और एस्प्रेसो शॉट कॉम्बो।', mr: 'बटर क्रोइसंट आणि कडक एस्प्रेसो कॉम्बो.' },
    price: 240, outletId: 'starbucks', outletName: 'Starbucks', category: 'coffee_tea', isVeg: true,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 310, preparationTimeMins: 5, calories: 310, servingSize: 'Serves 1', spiceTag: 'French Butter', isBestseller: false
  },

  // 7. Taco Bell (taco_bell)
  {
    id: 'tb-1', name: 'Crispy Mexican Paneer Chalupa', nameLocal: { hi: 'क्रिस्पी मैक्सिकन चलूपा', mr: 'क्रिस्पी मॅक्सिकन चलूपा' },
    description: 'Flaky golden fried chalupa shell loaded with fajita paneer, fiesta salsa, and jalapeno mayo.',
    descriptionLocal: { hi: 'क्रिस्पी फ्लैटब्रेड में भरी मैक्सिकन फिलिंग और चीज़ी सॉस।', mr: 'कुरकुरीत शेलमध्ये भरलेले चीज आणि स्वादीष्ट मॅक्सिकन टॉपिंग्स.' },
    price: 179, outletId: 'taco_bell', outletName: 'Taco Bell', category: 'mexican', isVeg: true,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 460, preparationTimeMins: 11, calories: 430, servingSize: 'Serves 1', spiceTag: 'Zesty Jalapeno', isBestseller: true
  },
  {
    id: 'tb-2', name: 'Supreme Loaded Nachos Grande', nameLocal: { hi: 'लोडेड चीज़ी नाचोज़', mr: 'लोडेड चीझी नाचोज' },
    description: 'Warm corn tortilla crisps layered with nacho queso, pinto beans, pico de gallo, and sour cream.',
    descriptionLocal: { hi: 'गर्म चीज़, साल्सा और खट्टी क्रीम से लबालब मैक्सिकन नाचोज़।', mr: 'वितळलेले चीज, साल्सा आणि नाचोज चिप्सचे चवदार कॉम्बिनेशन.' },
    price: 169, outletId: 'taco_bell', outletName: 'Taco Bell', category: 'mexican', isVeg: true,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 630, preparationTimeMins: 8, calories: 520, servingSize: 'Serves 1-2', spiceTag: 'Cheesy Salsa', isBestseller: true
  },
  {
    id: 'tb-3', name: 'Crunchwrap Supreme Box', nameLocal: { hi: 'क्रंचरैप सुप्रीम बॉक्स', mr: 'क्रंचरॅप सुप्रीम बॉक्स' },
    description: 'Toasted flour tortilla layered with seasoned beans, crispy tostada shell, lettuce, and nacho cheese.',
    descriptionLocal: { hi: 'ग्रिल्ड टॉर्टिला में चीज़, क्रिस्पी टोस्टाडा और वेज फिलिंग।', mr: 'ग्रिल्ड टॉर्टियात चीज, टोस्टाडा आणि भाज्यांचे स्वादिष्ट रॅप.' },
    price: 219, outletId: 'taco_bell', outletName: 'Taco Bell', category: 'mexican', isVeg: true,
    image: 'https://images.unsplash.com/photo-1574343635105-4cf2ea136b8b?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 510, preparationTimeMins: 12, calories: 560, servingSize: 'Serves 1', spiceTag: 'Chef Special', isBestseller: true
  },
  {
    id: 'tb-4', name: 'Churros with Dulce de Leche', nameLocal: { hi: 'मैक्सिकन चुरोज़', mr: 'मॅक्सिकन चुरोज' },
    description: 'Crisp cinnamon sugar dusted fried dough pastry served with warm caramel fudge dip.',
    descriptionLocal: { hi: 'दालचीनी और चीनी से लिपटे क्रिस्पी चुरोज़ और कारमेल डिप।', mr: 'दालचिनी आणि साखरेने लेपलेले कुरकुरीत चुरोज.' },
    price: 109, outletId: 'taco_bell', outletName: 'Taco Bell', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1694495275309-269e3ea6f21e?auto=format&fit=crop&w=600&q=80',
    rating: 4.6, reviewsCount: 290, preparationTimeMins: 6, calories: 310, servingSize: 'Serves 1', spiceTag: 'Cinnamon Sweet', isBestseller: false
  },

  // 8. Haldiram's (haldirams)
  {
    id: 'hld-1', name: 'Punjabi Chole Bhature Platter', nameLocal: { hi: 'पंजाबी छोले भटूरे', mr: 'पंजाबी छोले भटुरे' },
    description: 'Two puffy golden bhaturas served with pindi chole, spiced green chili, and tangy mango pickle.',
    descriptionLocal: { hi: 'गरमा-गरम फूले हुए भटूरे और मसालेदार पंजाबी छोले।', mr: 'गरमागरम टम्म फुगलेले भटुरे आणि चवदार पंजाबी छोले.' },
    price: 180, outletId: 'haldirams', outletName: "Haldiram's", category: 'indian_chaat', isVeg: true,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 1420, preparationTimeMins: 8, calories: 720, servingSize: 'Serves 1-2', spiceTag: 'Desi Masaledar', isBestseller: true
  },
  {
    id: 'hld-2', name: 'Royal Shahi Raj Kachori', nameLocal: { hi: 'शाही राज कचौरी', mr: 'शाही राज कचोरी' },
    description: 'Crisp kachori bowl filled with dahi bhalla, sprouts, imli chutney, sev, and ruby pomegranate.',
    descriptionLocal: { hi: 'दही, मीठी चटनी और अनार के दानों से सजी शाही राज कचौरी।', mr: 'दही, चटणी आणि डाळिंबाच्या दाण्यांनी सजलेली शाही राज कचोरी.' },
    price: 140, outletId: 'haldirams', outletName: "Haldiram's", category: 'indian_chaat', isVeg: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 890, preparationTimeMins: 6, calories: 450, servingSize: 'Serves 1', spiceTag: 'Sweet & Tangy', isBestseller: true
  },
  {
    id: 'hld-3', name: 'Amul Butter Pav Bhaji', nameLocal: { hi: 'अमूल बटर पाव भाजी', mr: 'अमूल बटर पाव भाजी' },
    description: 'Tawa-mashed spiced vegetables topped with melting butter cubes and two toasted ladi pavs.',
    descriptionLocal: { hi: 'मक्खन से भरपूर चटपटी पाव भाजी और टोस्टेड पाव।', mr: 'बटरने भरलेली चवदार पाव भाजी आणि भाजलेला पाव.' },
    price: 160, outletId: 'haldirams', outletName: "Haldiram's", category: 'indian_chaat', isVeg: true,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 960, preparationTimeMins: 7, calories: 580, servingSize: 'Serves 1', spiceTag: 'Medium Spicy', isBestseller: true
  },
  {
    id: 'hld-4', name: 'Kaju Katli Sweets Box (250g)', nameLocal: { hi: 'काजू कतली डिब्बा', mr: 'काजू कतली पेटी' },
    description: 'Pure cashew paste fudge diamonds covered with delicate edible silver foil.',
    descriptionLocal: { hi: 'असली काजू से बनी पारंपरिक और स्वादिष्ट काजू कतली।', mr: 'अस्सल काजूपासून बनवलेली स्वादिष्ट काजू कतली.' },
    price: 240, outletId: 'haldirams', outletName: "Haldiram's", category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1630409349197-b733a524b24e?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 650, preparationTimeMins: 2, calories: 480, servingSize: 'Serves 2-3', spiceTag: 'Pure Mithai', isBestseller: false
  },

  // 9. Wow! Momo (wow_momo)
  {
    id: 'wm-1', name: 'Darjeeling Steamed Veg Momos (6 Pcs)', nameLocal: { hi: 'दार्जिलिंग स्टीम्ड मोमोज़', mr: 'दार्जिलिंग व्हेज मोमोज' },
    description: 'Delicate steamed dumplings filled with ginger-scented cabbage, carrots, and fiery red chutney.',
    descriptionLocal: { hi: 'ताज़ी सब्जियों से भरे भाप में पके हुए दार्जिलिंग मोमोज़।', mr: 'ताज्या भाज्यांनी भरलेले वाफवलेले तिबेटी मोमोज आणि तिखट चटणी.' },
    price: 139, outletId: 'wow_momo', outletName: 'Wow! Momo', category: 'asian_momos', isVeg: true,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 650, preparationTimeMins: 9, calories: 280, servingSize: 'Serves 1', spiceTag: 'Steamed Mild', isBestseller: true
  },
  {
    id: 'wm-2', name: 'Schezwan Pan-Fried Chicken Momos', nameLocal: { hi: 'पैन फ्राइड चिकन मोमोज़', mr: 'पॅन फ्राईड चिकन मोमोज' },
    description: 'Crisp pan-seared chicken dumplings wok-tossed in garlicky Szechuan chili oil.',
    descriptionLocal: { hi: 'तीखी शेज़वान सॉस में टॉस किए गए कुरकुरे चिकन मोमोज़।', mr: 'झणझणीत शेजवान सॉसमध्ये टॉस केलेले पॅन फ्राईड चिकन मोमोज.' },
    price: 189, outletId: 'wow_momo', outletName: 'Wow! Momo', category: 'asian_momos', isVeg: false,
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 780, preparationTimeMins: 11, calories: 390, servingSize: 'Serves 1', spiceTag: 'Fiery Schezwan', isBestseller: true
  },
  {
    id: 'wm-3', name: 'Crispy Fried Cheese Momos (6 Pcs)', nameLocal: { hi: 'चीज़ फ्राइड मोमोज़', mr: 'चीझ फ्राईड मोमोज' },
    description: 'Golden deep-fried dumplings with a gooey molten cheese and sweet corn stuffing.',
    descriptionLocal: { hi: 'चीज़ और कॉर्न से भरे कुरकुरे फ्राइड मोमोज़।', mr: 'वितळलेले चीज आणि कॉर्नने भरलेले कुरकुरीत मोमोज.' },
    price: 169, outletId: 'wow_momo', outletName: 'Wow! Momo', category: 'asian_momos', isVeg: true,
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 410, preparationTimeMins: 10, calories: 420, servingSize: 'Serves 1', spiceTag: 'Cheesy Crunch', isBestseller: false
  },
  {
    id: 'wm-4', name: 'Moburg (Veg Momo Burger)', nameLocal: { hi: 'मोबर्गर (मोमो बर्गर)', mr: 'मोबर्गर (मोमो बर्गर)' },
    description: 'Crispy fried veg momos stuffed inside a toasted burger bun with spicy mayo and onions.',
    descriptionLocal: { hi: 'बर्गर बन में कुरकुरा मोमो और तंदूरी सॉस का अनूठा मेल।', mr: 'बर्गर बनमध्ये कुरकुरीत मोमो आणि स्वादीष्ट सॉस.' },
    price: 99, outletId: 'wow_momo', outletName: 'Wow! Momo', category: 'burgers', isVeg: true,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 520, preparationTimeMins: 8, calories: 340, servingSize: 'Serves 1', spiceTag: 'Fusion Snack', isBestseller: true
  },

  // 10. Chaayos (chaayos)
  {
    id: 'chy-1', name: 'Kulhad Adrak Elaichi Chai', nameLocal: { hi: 'कुल्हड़ अदरक इलायची चाय', mr: 'कुल्हड आले वेलची चहा' },
    description: 'Slow-brewed Assam milk tea infused with crushed fresh ginger and green cardamom pods.',
    descriptionLocal: { hi: 'मिट्टी के कुल्हड़ में परोसी गई अदरक और इलायची की कड़क चाय।', mr: 'मातीच्या कुल्हडमध्ये दिलेला अस्सल आले-वेलचीचा कडक चहा.' },
    price: 49, outletId: 'chaayos', outletName: 'Chaayos', category: 'coffee_tea', isVeg: true,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 1650, preparationTimeMins: 5, calories: 90, servingSize: 'Serves 1', spiceTag: 'Aromatic Desi', isBestseller: true
  },
  {
    id: 'chy-2', name: 'Irani Cafe Bun Maska', nameLocal: { hi: 'ईरानी बन मस्का', mr: 'इराणी बन मस्का' },
    description: 'Soft tutty-fruity sweet bun toasted warm and slathered with whipped white butter.',
    descriptionLocal: { hi: 'मक्खन से लबालब गर्म और नरम बन, चाय के साथ उत्तम।', mr: 'भरपूर बटर लावलेला मऊ गरम बन, चहासोबत एकदम परफेक्ट.' },
    price: 65, outletId: 'chaayos', outletName: 'Chaayos', category: 'coffee_tea', isVeg: true,
    image: 'https://images.unsplash.com/photo-1750767396956-da1796f33ad1?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 910, preparationTimeMins: 4, calories: 270, servingSize: 'Serves 1', spiceTag: 'Sweet Butter', isBestseller: true
  },
  {
    id: 'chy-3', name: 'Gur Wali Desi Chai', nameLocal: { hi: 'गुड़ वाली देसी चाय', mr: 'गूळ घातलेला चहा' },
    description: 'Healthy organic jaggery-sweetened strong milk tea with crushed black pepper and tulsi.',
    descriptionLocal: { hi: 'प्राकृतिक गुड़, तुलसी और काली मिर्च वाली पौष्टिक चाय।', mr: 'गुळ, तुळस आणि काळी मिरी घातलेला आरोग्यदायी चहा.' },
    price: 59, outletId: 'chaayos', outletName: 'Chaayos', category: 'coffee_tea', isVeg: true,
    image: 'https://images.unsplash.com/photo-1619581073186-5b4ae1b0caad?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 740, preparationTimeMins: 5, calories: 85, servingSize: 'Serves 1', spiceTag: 'Herbal Sweet', isBestseller: false
  },
  {
    id: 'chy-4', name: 'Masala Bun Omelette', nameLocal: { hi: 'मसाला बन ऑमलेट', mr: 'मसाला बन ऑम्लेट' },
    description: 'Two-egg fluffy masala omelette with onions, green chilies, sandwiched in toasted butter bun.',
    descriptionLocal: { hi: 'दो अंडों का चटपटा ऑमलेट और मक्खन में सिका ताज़ा बन।', mr: 'दोन अंड्यांचे ऑम्लेट आणि बटरमध्ये भाजलेला बन.' },
    price: 99, outletId: 'chaayos', outletName: 'Chaayos', category: 'burgers', isVeg: false,
    image: 'https://images.unsplash.com/photo-1677844592730-ce9c936d8f1a?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 520, preparationTimeMins: 7, calories: 380, servingSize: 'Serves 1', spiceTag: 'Masala Egg', isBestseller: true
  },

  // 11. Baskin Robbins (baskin_robbins)
  {
    id: 'br-1', name: 'Mississippi Mud Fudge Sundae', nameLocal: { hi: 'मिसिसिपी मड संडे', mr: 'मिसिसिपी मड संडे' },
    description: 'Fudge brownie chunks crowned with dark chocolate ice cream, hot fudge, and roasted almonds.',
    descriptionLocal: { hi: 'डार्क चॉकलेट, हॉट फज सिरप और बादाम से बना संडे।', mr: 'डार्क चॉकलेट आणि हॉट फज सॉससह प्रसिद्ध संडे आईस्क्रीम.' },
    price: 175, outletId: 'baskin_robbins', outletName: 'Baskin Robbins', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 820, preparationTimeMins: 4, calories: 340, servingSize: 'Serves 1', spiceTag: 'Hot Fudge', isBestseller: true
  },
  {
    id: 'br-2', name: 'Belgian Bliss Dark Chocolate Scoop', nameLocal: { hi: 'बेल्जियन डार्क चॉकलेट', mr: 'बेल्जियन डार्क चॉकलेट' },
    description: 'Velvety artisan ice cream churned from 70% dark Belgian cocoa and chocolate shavings.',
    descriptionLocal: { hi: 'असली बेल्जियन कोको से बना गाढ़ा डार्क चॉकलेट आइसक्रीम।', mr: 'अस्सल बेल्जियन कोकोपासून बनवलेले डार्क चॉकलेट आईस्क्रीम.' },
    price: 145, outletId: 'baskin_robbins', outletName: 'Baskin Robbins', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1625234969503-49c7f28bc6ec?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 910, preparationTimeMins: 3, calories: 260, servingSize: 'Serves 1', spiceTag: 'Dark Cocoa', isBestseller: true
  },
  {
    id: 'br-3', name: 'Cotton Candy Carnival Scoop', nameLocal: { hi: 'कॉटन कैंडी आइसक्रीम', mr: 'कॉटन कँडी आईस्क्रीम' },
    description: 'Whimsical swirl of pink and purple cotton candy ice cream bursting with nostalgic sugar joy.',
    descriptionLocal: { hi: 'गुलाबी और बैंगनी कॉटन कैंडी स्वाद वाली मीठी आइसक्रीम।', mr: 'गुलाबी आणि जांभळ्या रंगाचे कॉटन कँडी आईस्क्रीम.' },
    price: 135, outletId: 'baskin_robbins', outletName: 'Baskin Robbins', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1754397992428-50234f357598?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 460, preparationTimeMins: 3, calories: 240, servingSize: 'Serves 1', spiceTag: 'Sweet Swirl', isBestseller: false
  },
  {
    id: 'br-4', name: 'Roasted Almond Praline Waffle Cone', nameLocal: { hi: 'रोस्टेड आलमंड प्रालिन', mr: 'रोस्टेड बदाम प्रालिन' },
    description: 'Rich caramel ribbon and caramelized roasted almond slivers in a freshly pressed waffle cone.',
    descriptionLocal: { hi: 'भुने हुए बादाम और कारमेल के साथ क्रिस्पी वैफल कोन आइसक्रीम।', mr: 'भाजलेले बदाम आणि कॅरमेलसह वॅफल कोन आईस्क्रीम.' },
    price: 165, outletId: 'baskin_robbins', outletName: 'Baskin Robbins', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 570, preparationTimeMins: 4, calories: 290, servingSize: 'Serves 1', spiceTag: 'Praline Nutty', isBestseller: true
  },

  // 12. Behrouz Biryani (behrouz_biryani)
  {
    id: 'beh-1', name: 'Subz-e-Biryani (Royal Paneer Dum)', nameLocal: { hi: 'सब्ज़-ए-बिरयानी (पनीर)', mr: 'सब्ज-ए-बिर्याणी (पनीर)' },
    description: 'Aged basmati rice slow-cooked in a sealed handi with saffron, char-grilled paneer, and mint raita.',
    descriptionLocal: { hi: 'धीमी आंच पर पकी केसरिया बासमती चावल और शाही पनीर बिरयानी।', mr: 'मंद आचेवर शिजवलेला केशर बासुमती भात आणि शाही पनीर बिर्याणी.' },
    price: 329, outletId: 'behrouz_biryani', outletName: 'Behrouz Biryani', category: 'biryani_rice', isVeg: true,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 780, preparationTimeMins: 20, calories: 620, servingSize: 'Serves 1-2', spiceTag: 'Royal Dum', isBestseller: true
  },
  {
    id: 'beh-2', name: 'Murgh Makhani Dum Biryani', nameLocal: { hi: 'मुर्ग़ मखनी दम बिरयानी', mr: 'मुर्ग मखनी दम बिर्याणी' },
    description: 'Succulent tandoori chicken tikka layered with royal spiced rice and caramelized onions.',
    descriptionLocal: { hi: 'मखमली ग्रेवी में पके चिकन और दम बासमती चावल की बिरयानी।', mr: 'मखमली ग्रेव्हीत शिजवलेला चिकन आणि बासुमती तांदळाची बिर्याणी.' },
    price: 389, outletId: 'behrouz_biryani', outletName: 'Behrouz Biryani', category: 'biryani_rice', isVeg: false,
    image: 'https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 940, preparationTimeMins: 20, calories: 740, servingSize: 'Serves 1-2', spiceTag: 'Awadhi Spiced', isBestseller: true
  },
  {
    id: 'beh-3', name: 'Lucknowi Gosht Seekh Kebab', nameLocal: { hi: 'लखनवी गोश्त सीक कबाब', mr: 'लखनवी गोश्त सीख कबाब' },
    description: 'Minced lamb skewers infused with royal spices, slow-grilled over charcoal embers.',
    descriptionLocal: { hi: 'चारकोल पर बने रसीले मटन सीक कबाब, पुदीना चटनी के साथ।', mr: 'चारकोलवर भाजलेले मटण सीख कबाब आणि पुदीना चटणी.' },
    price: 299, outletId: 'behrouz_biryani', outletName: 'Behrouz Biryani', category: 'chicken_crisps', isVeg: false,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 420, preparationTimeMins: 15, calories: 460, servingSize: 'Serves 1', spiceTag: 'Mughlai Charcoal', isBestseller: false
  },
  {
    id: 'beh-4', name: 'Awadhi Shahi Tukda with Kesar Rabdi', nameLocal: { hi: 'शाही टुकड़ा रबड़ी', mr: 'शाही तुकडा रबडी' },
    description: 'Saffron-soaked golden bread pudding topped with thick reduced malai rabdi and pistachios.',
    descriptionLocal: { hi: 'देसी घी में तला ब्रेड, केसर चाशनी और गाढ़ी रबड़ी।', mr: 'तुपात तळलेला कुरकुरीत ब्रेड आणि घट्ट मलईदार रबडी.' },
    price: 139, outletId: 'behrouz_biryani', outletName: 'Behrouz Biryani', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1609155318482-c90b34e55dd1?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 410, preparationTimeMins: 5, calories: 340, servingSize: 'Serves 1', spiceTag: 'Kesar Sweet', isBestseller: true
  },

  // 13. Madras Tiffin (madras_cafe)
  {
    id: 'mtr-1', name: 'Ghee Podi Roast Masala Dosa', nameLocal: { hi: 'घी पोडी मसाला डोसा', mr: 'तूप पोडी मसाला डोसा' },
    description: 'Lace-crisp fermented rice crepe roasted in cow ghee with spicy lentil gunpowder and potato palya.',
    descriptionLocal: { hi: 'देसी घी और तीखे पोडी से बना कुरकुरा मसाला डोसा।', mr: 'शुद्ध तुपात भाजलेला कुरकुरीत पोडी मसाला डोसा.' },
    price: 159, outletId: 'madras_cafe', outletName: 'Madras Tiffin', category: 'south_indian', isVeg: true,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 1120, preparationTimeMins: 10, calories: 380, servingSize: 'Serves 1', spiceTag: 'Ghee Gunpowder', isBestseller: true
  },
  {
    id: 'mtr-2', name: 'Steamed Thatte Idli & Sambar', nameLocal: { hi: 'तट्टे इडली सांभर', mr: 'तट्टे इडली सांबार' },
    description: 'Pillow-soft Bidadi plate idlis served with drumstick sambar, coconut chutney, and melted ghee.',
    descriptionLocal: { hi: 'मुलायम तट्टे इडली, स्वादिष्ट सांभर और नारियल चटनी।', mr: 'मऊ तट्टे इडली, शेवगा सांबार आणि खोबऱ्याची चटणी.' },
    price: 99, outletId: 'madras_cafe', outletName: 'Madras Tiffin', category: 'south_indian', isVeg: true,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 650, preparationTimeMins: 6, calories: 220, servingSize: 'Serves 1', spiceTag: 'Mild Ghee', isBestseller: false
  },
  {
    id: 'mtr-3', name: 'Brass Tumbler Mysore Filter Kaapi', nameLocal: { hi: 'मैसूर फ़िल्टर कॉफ़ी', mr: 'म्हैसूर फिल्टर कॉफी' },
    description: 'Fresh Chikmagalur peaberry decoction frothed with farm milk in a traditional dabarah.',
    descriptionLocal: { hi: 'पीतल के गिलास में झागदार दक्षिण भारतीय फ़िल्टर कॉफ़ी।', mr: 'पारंपारिक पितळी भांड्यात फेसळलेली फिल्टर कॉफी.' },
    price: 55, outletId: 'madras_cafe', outletName: 'Madras Tiffin', category: 'coffee_tea', isVeg: true,
    image: 'https://images.unsplash.com/photo-1669824614885-abb2a862553a?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 1480, preparationTimeMins: 4, calories: 95, servingSize: 'Serves 1', spiceTag: 'Strong Brew', isBestseller: true
  },
  {
    id: 'mtr-4', name: 'Medu Vada with Coconut Chutney (2 Pcs)', nameLocal: { hi: 'मेदु वड़ा नारियल चटनी', mr: 'मेदू वडा खोबरे चटणी' },
    description: 'Golden crispy lentil donuts fried crisp outside and fluffy soft inside, served with hot sambar.',
    descriptionLocal: { hi: 'कुरकुरे मेदु वड़े, गरमा-गरम सांभर और ताज़ी नारियल चटनी।', mr: 'कुरकुरीत मेदू वडा आणि गरमागरम शेवगा सांबार.' },
    price: 89, outletId: 'madras_cafe', outletName: 'Madras Tiffin', category: 'south_indian', isVeg: true,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 710, preparationTimeMins: 6, calories: 310, servingSize: 'Serves 1', spiceTag: 'Crispy Desi', isBestseller: true
  },

  // 14. Belgian Waffle (belgian_waffle)
  {
    id: 'bw-1', name: 'Triple Chocolate Overload Waff-wich', nameLocal: { hi: 'ट्रिपल चॉकलेट वैफल', mr: 'ट्रिपल चॉकलेट वॅफल' },
    description: 'Dark chocolate batter waffle layered with white, milk, and dark Belgian chocolate ganache.',
    descriptionLocal: { hi: 'डार्क, मिल्क और व्हाइट चॉकलेट से भरा कुरकुरा वैफल।', mr: 'डार्क, मिल्क आणि पांढऱ्या चॉकलेटने भरलेले कुरकुरीत वॅफल.' },
    price: 175, outletId: 'belgian_waffle', outletName: 'Belgian Waffle', category: 'waffles_crepes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 1350, preparationTimeMins: 12, calories: 460, servingSize: 'Serves 1', spiceTag: 'Triple Cocoa', isBestseller: true
  },
  {
    id: 'bw-2', name: 'Red Velvet Cream Cheese Waffle', nameLocal: { hi: 'रेड वेलवेट क्रीम चीज़ वैफल', mr: 'रेड वेल्वेट वॅफल' },
    description: 'Crimson cocoa waffle folded around tangy Philadelphia cream cheese and melted white chocolate.',
    descriptionLocal: { hi: 'रेड वेलवेट वैफल और मखमली क्रीम चीज़ फिलिंग।', mr: 'रेड वेल्वेट वॅफल आणि मऊ मलईदार चीजचे सँडविच.' },
    price: 185, outletId: 'belgian_waffle', outletName: 'Belgian Waffle', category: 'waffles_crepes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1568051243851-f9b136146e97?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 820, preparationTimeMins: 12, calories: 430, servingSize: 'Serves 1', spiceTag: 'Cream Cheese', isBestseller: false
  },
  {
    id: 'bw-3', name: 'Warm Nutella Roasted Almond Waff-wich', nameLocal: { hi: 'नूटेला बादाम वैफल', mr: 'न्युटेला बदाम वॅफल' },
    description: 'Fresh waffle smeared with creamy Italian hazelnut Nutella spread and crunchy toasted almonds.',
    descriptionLocal: { hi: 'हेज़लनट नूटेला और भुने बादाम से भरा गर्म क्रिस्पी वैफल।', mr: 'न्युटेला आणि भाजलेल्या बदामाने भरलेला वॅफल.' },
    price: 195, outletId: 'belgian_waffle', outletName: 'Belgian Waffle', category: 'waffles_crepes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1695304781788-2ae3f1b02ccc?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 950, preparationTimeMins: 10, calories: 490, servingSize: 'Serves 1', spiceTag: 'Hazelnut Bliss', isBestseller: true
  },
  {
    id: 'bw-4', name: 'Strawberry & Cream Belgian Waffle', nameLocal: { hi: 'स्ट्रॉबेरी क्रीम वैफल', mr: 'स्ट्रॉबेरी क्रीम वॅफल' },
    description: 'Golden waffle topped with fresh strawberry compote, whipped cream, and dusted sugar.',
    descriptionLocal: { hi: 'ताज़ी स्ट्रॉबेरी, व्हिप्ड क्रीम और पाउडर शुगर से सजा वैफल।', mr: 'ताज्या स्ट्रॉबेरी आणि क्रीमने सजवलेला वॅफल.' },
    price: 179, outletId: 'belgian_waffle', outletName: 'Belgian Waffle', category: 'waffles_crepes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1568051243851-f9b136146e97?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 510, preparationTimeMins: 10, calories: 370, servingSize: 'Serves 1', spiceTag: 'Fruit Compote', isBestseller: false
  },

  // 15. Pizza Hut (pizza_hut)
  {
    id: 'ph-1', name: 'Veggie Supreme Deep Pan Pizza', nameLocal: { hi: 'वेजी सुप्रीम पैन पिज़्ज़ा', mr: 'व्हेज सुप्रीम पॅन पिझ्झा' },
    description: 'Thick golden pan crust loaded with mushrooms, black olives, sweet corn, and bell peppers.',
    descriptionLocal: { hi: 'ब्लैक ऑलिव्स, मशरूम और मोत्ज़ारेला चीज़ से भरपूर पैन पिज़्ज़ा।', mr: 'ऑलिव्ह, मशरूम आणि मोझरेला चीजने सजलेला पॅन पिझ्झा.' },
    price: 249, outletId: 'pizza_hut', outletName: 'Pizza Hut', category: 'pizzas', isVeg: true,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 520, preparationTimeMins: 16, calories: 720, servingSize: 'Serves 1-2', spiceTag: 'Pan Crust Special', isBestseller: true
  },
  {
    id: 'ph-2', name: 'BBQ Chicken Meltdown Pizza', nameLocal: { hi: 'बीबीक्यू चिकन पिज्जा', mr: 'बीबीक्यू चिकन पिझ्झा' },
    description: 'Pan-baked crust layered with smoky BBQ sauce, tender chicken, caramelized onions, and 4-cheese blend.',
    descriptionLocal: { hi: 'स्मोकी बीबीक्यू सॉस, चिकन और चार चीज़ों वाला पैन पिज़्ज़ा।', mr: 'स्मोकी बीबीक्यू सॉस आणि चिकनसह चार चीझ पिझ्झा.' },
    price: 299, outletId: 'pizza_hut', outletName: 'Pizza Hut', category: 'pizzas', isVeg: false,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 670, preparationTimeMins: 18, calories: 840, servingSize: 'Serves 2-3', spiceTag: 'Smoky Barbecue', isBestseller: true
  },
  {
    id: 'ph-3', name: 'Cheese Garlic Bread Exotica', nameLocal: { hi: 'चीज़ गार्लिक ब्रेड', mr: 'चीझ गार्लिक ब्रेड' },
    description: 'Toasted baguette slices smothered in garlic butter, melted mozzarella, and green jalapeños.',
    descriptionLocal: { hi: 'पिघले चीज़ और गार्लिक मक्खन से लदी कुरकुरी ब्रेड।', mr: 'वितळलेले चीज आणि लसूण बटरने भरलेली ब्रेड.' },
    price: 149, outletId: 'pizza_hut', outletName: 'Pizza Hut', category: 'sides', isVeg: true,
    image: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 580, preparationTimeMins: 10, calories: 390, servingSize: 'Serves 1-2', spiceTag: 'Gooey Garlic', isBestseller: false
  },
  {
    id: 'ph-4', name: 'Spicy Paneer Tikka Pan Pizza', nameLocal: { hi: 'पनीर टिक्का पैन पिज़्ज़ा', mr: 'पनीर टिक्का पॅन पिझ्झा' },
    description: 'Oven-fresh pan crust layered with tandoori marinara, spiced paneer cubes, and bell peppers.',
    descriptionLocal: { hi: 'तंदूरी सॉस और मसालों से भरपूर पनीर टिक्का पैन पिज़्ज़ा।', mr: 'तंदूरी सॉस आणि पनीर टिक्का पॅन पिझ्झा.' },
    price: 279, outletId: 'pizza_hut', outletName: 'Pizza Hut', category: 'pizzas', isVeg: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 460, preparationTimeMins: 16, calories: 760, servingSize: 'Serves 1-2', spiceTag: 'Medium Spicy', isBestseller: true
  },

  // 16. Natural's Ice Cream (naturals)
  {
    id: 'nat-1', name: 'Tender Coconut Real Fruit Scoop', nameLocal: { hi: 'टेंडर कोकोनट आइसक्रीम', mr: 'टेंडर कोकोनट आईस्क्रीम' },
    description: 'Hand-churned coastal malai coconut flesh folded into pure farm milk cream.',
    descriptionLocal: { hi: 'ताज़े नारियल की मलाई और शुद्ध दूध से बनी आइसक्रीम।', mr: 'शहाळ्याच्या मलईपासून बनवलेले नॅचरल्स आईस्क्रीम.' },
    price: 95, outletId: 'naturals', outletName: "Natural's Ice Cream", category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1761315631288-9d1f5e2e4430?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 1890, preparationTimeMins: 3, calories: 190, servingSize: 'Serves 1', spiceTag: 'Pure Fruit', isBestseller: true
  },
  {
    id: 'nat-2', name: 'Ratnagiri Alphonso Mango Scoop', nameLocal: { hi: 'रत्नागिरी हापूस आम आइसक्रीम', mr: 'रत्नागिरी हापूस आंबा आईस्क्रीम' },
    description: 'Sun-ripened Konkan Alphonso mango pulp churned into velvety artisanal scoop.',
    descriptionLocal: { hi: 'रत्नागिरी के असली हापूस आम से बनी स्वादिष्ट आइसक्रीम।', mr: 'अस्सल रत्नागिरी हापूस आंब्याचे आईस्क्रीम.' },
    price: 95, outletId: 'naturals', outletName: "Natural's Ice Cream", category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1748831876085-03664b683cfd?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 1640, preparationTimeMins: 3, calories: 205, servingSize: 'Serves 1', spiceTag: 'Konkan Mango', isBestseller: true
  },
  {
    id: 'nat-3', name: 'Sitaphal (Custard Apple) Real Scoop', nameLocal: { hi: 'सीताफल आइसक्रीम', mr: 'सीताफळ आईस्क्रीम' },
    description: 'Natural custard apple pulp seeded and folded into fresh buffalo cream.',
    descriptionLocal: { hi: 'ताज़े सीताफल के गूदे से तैयार प्राकृतिक आइसक्रीम।', mr: 'ताजी सीताफळाची मलईदार आईस्क्रीम.' },
    price: 95, outletId: 'naturals', outletName: "Natural's Ice Cream", category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 920, preparationTimeMins: 3, calories: 195, servingSize: 'Serves 1', spiceTag: 'Seasonal Fresh', isBestseller: false
  },
  {
    id: 'nat-4', name: 'Roasted Almond Kulfi Shake', nameLocal: { hi: 'रोस्टेड आलमंड शेक', mr: 'रोस्टेड बदाम शेक' },
    description: 'Thick creamy milkshake made by blending natural malai ice cream with toasted almonds.',
    descriptionLocal: { hi: 'मलाई आइसक्रीम और भुने बादाम से बना स्वादिष्ट गाढ़ा शेक।', mr: 'मलई आईस्क्रीम आणि भाजलेल्या बदामाचा दाट शेक.' },
    price: 135, outletId: 'naturals', outletName: "Natural's Ice Cream", category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1568901839119-631418a3910d?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 780, preparationTimeMins: 4, calories: 310, servingSize: 'Serves 1', spiceTag: 'Nutty Milk', isBestseller: true
  },

  // 17. Faasos Wraps (faasos)
  {
    id: 'fss-1', name: 'Bhuna Masala Paneer Tikka Wrap', nameLocal: { hi: 'भुना पनीर टिक्का रोल', mr: 'भुना पनीर टिक्का रोल' },
    description: 'Flaky whole-wheat Malabar paratha rolled around smoky paneer tikka, mint mayo, and pickled onions.',
    descriptionLocal: { hi: 'लच्छा पराठे में लिपटा मसालेदार पनीर टिक्का और पुदीना मेयो।', mr: 'लच्छा पराठ्यात गुंडाळलेला मसालेदार पनीर टिक्का रोल.' },
    price: 169, outletId: 'faasos', outletName: 'Faasos Wraps', category: 'burgers', isVeg: true,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 740, preparationTimeMins: 9, calories: 460, servingSize: 'Serves 1', spiceTag: 'Smoky Tikka', isBestseller: true
  },
  {
    id: 'fss-2', name: 'Double Egg Chatpata Chicken Roll', nameLocal: { hi: 'डबल एग चिकन काठी रोल', mr: 'डबल अंडा चिकन रोल' },
    description: 'Egg-crusted paratha loaded with roasted masala chicken strips, chaat masala, and green chili.',
    descriptionLocal: { hi: 'डबल एग पराठे में भुना चिकन और चटपटा मसाला रोल।', mr: 'डबल अंडा पराठ्यात मसालेदार चिकन काठी रोल.' },
    price: 199, outletId: 'faasos', outletName: 'Faasos Wraps', category: 'burgers', isVeg: false,
    image: 'https://images.unsplash.com/photo-1666819615040-eff5e52c778a?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 830, preparationTimeMins: 10, calories: 540, servingSize: 'Serves 1', spiceTag: 'Chatpata Desi', isBestseller: true
  },
  {
    id: 'fss-3', name: 'Jumbo Falafel & Hummus Wrap', nameLocal: { hi: 'फलाफेल हम्मस रोल', mr: 'फलाफेल हम्मस रोल' },
    description: 'Crispy chickpea falafel discs with creamy garlic hummus, crunchy pickled cucumbers, and tahini.',
    descriptionLocal: { hi: 'कुरकुरे फलाफेल, हम्मस और ताहिनी सॉस से भरा पौष्टिक रोल।', mr: 'कुरकुरीत फलाफेल आणि हम्मसचा पौष्टिक रोल.' },
    price: 159, outletId: 'faasos', outletName: 'Faasos Wraps', category: 'burgers', isVeg: true,
    image: 'https://images.unsplash.com/photo-1666493243525-cd8ad9d26a86?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 390, preparationTimeMins: 9, calories: 420, servingSize: 'Serves 1', spiceTag: 'Mediterranean', isBestseller: false
  },
  {
    id: 'fss-4', name: 'Cheesy Corn Salsa Signature Wrap', nameLocal: { hi: 'चीज़ी कॉर्न साल्सा रोल', mr: 'चीझी कॉर्न साल्सा रोल' },
    description: 'Warm tortilla wrapped around molten liquid cheese, golden American corn, and spicy Mexican salsa.',
    descriptionLocal: { hi: 'पिघले चीज़, स्वीट कॉर्न और मैक्सिकन साल्सा का चीज़ी रोल।', mr: 'चीज आणि स्वीट कॉर्नचा चवदार रोल.' },
    price: 149, outletId: 'faasos', outletName: 'Faasos Wraps', category: 'burgers', isVeg: true,
    image: 'https://images.unsplash.com/photo-1636044988130-d97aad86426c?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 620, preparationTimeMins: 8, calories: 430, servingSize: 'Serves 1', spiceTag: 'Cheesy Mild', isBestseller: true
  },

  // 18. Keventers (keventers)
  {
    id: 'kv-1', name: 'Original Chocolate Hazelnut Milkshake', nameLocal: { hi: 'चॉकलेट हेज़लनट मिल्कशेक', mr: 'चॉकलेट हेझलनट मिल्कशेक' },
    description: 'Iconic thick shake blended with pure dairy milk, cocoa fudge, and toasted hazelnut in a glass bottle.',
    descriptionLocal: { hi: 'केवेंटर्स का मशहूर गाढ़ा चॉकलेट हेज़लनट मिल्कशेक।', mr: 'केव्हेंटर्सचे प्रसिद्ध काचेच्या बाटलीतील चॉकलेट हेझलनट मिल्कशेक.' },
    price: 189, outletId: 'keventers', outletName: 'Keventers', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 1150, preparationTimeMins: 5, calories: 380, servingSize: 'Serves 1 (300ml)', spiceTag: 'Iconic Shake', isBestseller: true
  },
  {
    id: 'kv-2', name: 'Cold Coffee with Whipped Cream', nameLocal: { hi: 'केवेंटर्स कोल्ड कॉफ़ी', mr: 'केव्हेंटर्स कोल्ड कॉफी' },
    description: 'Slow-brewed Arabica espresso blended creamy cold with dairy milk and topped with rich foam.',
    descriptionLocal: { hi: 'गाढ़ी और ठंडी क्रीमी कॉफी, ताजगी से भरपूर।', mr: 'क्रीमी थंडगार कोल्ड कॉफी काचेच्या बाटलीत.' },
    price: 169, outletId: 'keventers', outletName: 'Keventers', category: 'coffee_tea', isVeg: true,
    image: 'https://images.unsplash.com/photo-1570019254013-368989cf027d?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 980, preparationTimeMins: 4, calories: 240, servingSize: 'Serves 1 (300ml)', spiceTag: 'Classic Roast', isBestseller: true
  },
  {
    id: 'kv-3', name: 'Strawberry Cream Special Shake', nameLocal: { hi: 'स्ट्रॉबेरी क्रीम मिल्कशेक', mr: 'स्ट्रॉबेरी क्रीम शेक' },
    description: 'Fresh Mahabaleshwar strawberry pulp churned with rich milk and velvety ice cream.',
    descriptionLocal: { hi: 'महाबलेश्वर की स्ट्रॉबेरी से बना गाढ़ा और स्वादिष्ट शेक।', mr: 'महाबळेश्वरच्या ताज्या स्ट्रॉबेरीचा चवदार शेक.' },
    price: 179, outletId: 'keventers', outletName: 'Keventers', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1686638745403-d21193f16b2f?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 620, preparationTimeMins: 4, calories: 310, servingSize: 'Serves 1 (300ml)', spiceTag: 'Berry Fresh', isBestseller: false
  },
  {
    id: 'kv-4', name: 'Dark Chocolate Brownie Crush Shake', nameLocal: { hi: 'ब्राउनी क्रश शेक', mr: 'ब्राउनी क्रश शेक' },
    description: 'Fudge walnut brownie baked warm, crushed and blitzed with dark chocolate cream milk.',
    descriptionLocal: { hi: 'चॉकलेट ब्राउनी के टुकड़ों से भरा सुपर थिक मिल्कशेक।', mr: 'चॉकलेट ब्राउनीने युक्त सुपर थिक मिल्कशेक.' },
    price: 219, outletId: 'keventers', outletName: 'Keventers', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1761637592257-3c5911ae5a3a?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 840, preparationTimeMins: 6, calories: 440, servingSize: 'Serves 1 (300ml)', spiceTag: 'Fudge Crunch', isBestseller: true
  },

  // 19. California Burrito (california_burrito)
  {
    id: 'cb-1', name: 'Fiesta Paneer Mexican Rice Bowl', nameLocal: { hi: 'पनीर मैक्सिकन राइस बाउल', mr: 'पनीर मॅक्सिकन राईस बाउल' },
    description: 'Cilantro lime rice layered with seasoned pinto beans, grilled fajita paneer, salsa fresca, and sour cream.',
    descriptionLocal: { hi: 'धनिया-नींबू वाले चावल, ग्रिल्ड पनीर और मैक्सिकन साल्सा बाउल।', mr: 'कोथिंबीर-लिंबू भात, ग्रिल्ड पनीर आणि साल्सा बाउल.' },
    price: 249, outletId: 'california_burrito', outletName: 'California Burrito', category: 'mexican', isVeg: true,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 780, preparationTimeMins: 10, calories: 540, servingSize: 'Serves 1-2', spiceTag: 'Cilantro Lime', isBestseller: true
  },
  {
    id: 'cb-2', name: 'Smoky Barbecue Chicken Burrito', nameLocal: { hi: 'चिकन बरीटो रोल', mr: 'चिकन बुरिटो रोल' },
    description: 'Toasted flour tortilla stuffed with grilled spiced chicken, black beans, Monterey Jack cheese, and guacamole.',
    descriptionLocal: { hi: 'ग्रिल्ड चिकन, ब्लैक बीन्स और ग्वाकामोल से भरा मैक्सिकन बरीटो।', mr: 'ग्रिल्ड चिकन, चीज आणि ग्वाकामोलचा मॅक्सिकन बुरिटो.' },
    price: 289, outletId: 'california_burrito', outletName: 'California Burrito', category: 'mexican', isVeg: false,
    image: 'https://images.unsplash.com/photo-1731090389603-d63060ee08a6?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 650, preparationTimeMins: 11, calories: 620, servingSize: 'Serves 1', spiceTag: 'Smoky Guac', isBestseller: true
  },
  {
    id: 'cb-3', name: 'Fresh Guacamole & Corn Tortilla Chips', nameLocal: { hi: 'ग्वाकामोल और चिप्स', mr: 'ग्वाकामोल आणि चिप्स' },
    description: 'Hand-mashed Hass avocado with red onions, jalapeños, lime juice, served with warm corn crisps.',
    descriptionLocal: { hi: 'ताज़े एवोकाडो ग्वाकामोल और कुरकुरी कॉर्न चिप्स।', mr: 'अस्सल एव्होकॅडो ग्वाकामोल आणि कुरकुरीत कॉर्न चिप्स.' },
    price: 179, outletId: 'california_burrito', outletName: 'California Burrito', category: 'mexican', isVeg: true,
    image: 'https://images.unsplash.com/photo-1680992071073-cb1696ba8d3e?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 420, preparationTimeMins: 6, calories: 340, servingSize: 'Serves 1-2', spiceTag: 'Fresh Hass', isBestseller: false
  },
  {
    id: 'cb-4', name: 'Crispy Churros with Chocolate Dip', nameLocal: { hi: 'चुरोज़ चॉकलेट डिप', mr: 'चुरोज चॉकलेट डिप' },
    description: 'Golden fried Mexican pastry tossed in cinnamon cane sugar, paired with rich molten chocolate.',
    descriptionLocal: { hi: 'दालचीनी और चीनी वाले क्रिस्पी चुरोज़ और डार्क चॉकलेट डिप।', mr: 'दालचिनी साखर चुरोज आणि चॉकलेट डिप.' },
    price: 129, outletId: 'california_burrito', outletName: 'California Burrito', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1624371414348-b246eff23427?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 510, preparationTimeMins: 7, calories: 290, servingSize: 'Serves 1', spiceTag: 'Sweet Cinnamon', isBestseller: true
  },

  // 20. Rolls Mania (rolls_mania)
  {
    id: 'rm-1', name: 'Double Cheese Paneer Mughlai Roll', nameLocal: { hi: 'डबल चीज़ पनीर रोल', mr: 'डबल चीझ पनीर रोल' },
    description: 'Layered paratha stuffed with marinated paneer, shredded mozzarella, onions, and spicy green sauce.',
    descriptionLocal: { hi: 'पनीर और पिघले चीज़ से भरपूर लच्छा पराठा रोल।', mr: 'पनीर आणि चीजने भरलेला गरमागरम काठी रोल.' },
    price: 159, outletId: 'rolls_mania', outletName: 'Rolls Mania', category: 'burgers', isVeg: true,
    image: 'https://images.unsplash.com/photo-1593759608136-45eb2ad9507d?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 890, preparationTimeMins: 8, calories: 480, servingSize: 'Serves 1', spiceTag: 'Mughlai Cheese', isBestseller: true
  },
  {
    id: 'rm-2', name: 'Classic Kolkata Double Egg Chicken Roll', nameLocal: { hi: 'डबल एग चिकन रोल', mr: 'डबल एग चिकन रोल' },
    description: 'Flaky paratha coated with two farm eggs, filled with tender spiced chicken chunks and kasundi glaze.',
    descriptionLocal: { hi: 'दो अंडों का पराठा और तंदूरी चिकन से बना स्वादिष्ट रोल।', mr: 'दोन अंड्यांचा पराठा आणि मसालेदार चिकन रोल.' },
    price: 179, outletId: 'rolls_mania', outletName: 'Rolls Mania', category: 'burgers', isVeg: false,
    image: 'https://images.unsplash.com/photo-1665469222949-3de88d37ee5a?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 1120, preparationTimeMins: 9, calories: 560, servingSize: 'Serves 1', spiceTag: 'Kasundi Mustard', isBestseller: true
  },
  {
    id: 'rm-3', name: 'Fiery Aloo Masala Frankie', nameLocal: { hi: 'आलू मसाला फ्रैंकी', mr: 'बटाटा मसाला फ्रँकी' },
    description: 'Spiced mashed potato croquette wrapped with tangy vinegar onions, chaat masala, and mint chutney.',
    descriptionLocal: { hi: 'चटपटा आलू मसाला और पुदीना चटनी वाली क्रिस्पी फ्रैंकी।', mr: 'चटपटीत बटाटा मसाला आणि पुदीना चटणी फ्रँकी.' },
    price: 89, outletId: 'rolls_mania', outletName: 'Rolls Mania', category: 'burgers', isVeg: true,
    image: 'https://images.unsplash.com/photo-1604236240482-7aeaa59f1329?auto=format&fit=crop&w=600&q=80',
    rating: 4.6, reviewsCount: 470, preparationTimeMins: 6, calories: 340, servingSize: 'Serves 1', spiceTag: 'Desi Street', isBestseller: false
  },
  {
    id: 'rm-4', name: 'Butter Chicken Seekh Kebab Roll', nameLocal: { hi: 'बटर चिकन सीक रोल', mr: 'बटर चिकन सीख रोल' },
    description: 'Charcoal-grilled minced chicken seekh wrapped in buttery flatbread with makhani gravy drizzle.',
    descriptionLocal: { hi: 'तंदूरी चिकन सीक कबाब और बटर चिकन ग्रेवी रोल।', mr: 'चारकोल ग्रिल्ड चिकन सीख कबाब रोल.' },
    price: 199, outletId: 'rolls_mania', outletName: 'Rolls Mania', category: 'burgers', isVeg: false,
    image: 'https://images.unsplash.com/photo-1584959370147-fcdd784b2e45?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 680, preparationTimeMins: 10, calories: 530, servingSize: 'Serves 1', spiceTag: 'Makhani Glaze', isBestseller: true
  },

  // 21. Mainland China Bowl (mainland_china)
  {
    id: 'mc-1', name: 'Wok-Tossed Hakka Veg Noodles & Manchurian', nameLocal: { hi: 'हक्का नूडल्स मंचूरियन कॉम्बो', mr: 'हक्का नूडल्स मंचूरियन कॉम्बो' },
    description: 'Wok-charred thin wheat noodles with crispy vegetable manchurian balls in garlic coriander soy gravy.',
    descriptionLocal: { hi: 'हक्का नूडल्स और वेज मंचूरियन ग्रेवी का लोकप्रिय कॉम्बो बाउल।', mr: 'हक्का नूडल्स आणि मंचूरियन ग्रेव्हीचा प्रसिद्ध कॉम्बो बाउल.' },
    price: 229, outletId: 'mainland_china', outletName: 'Mainland China Bowl', category: 'asian_momos', isVeg: true,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 820, preparationTimeMins: 12, calories: 510, servingSize: 'Serves 1-2', spiceTag: 'Wok Breath', isBestseller: true
  },
  {
    id: 'mc-2', name: 'Szechuan Chicken Fried Rice Bowl', nameLocal: { hi: 'शेज़वान चिकन फ्राइड राइस', mr: 'शेजवान चिकन फ्राईड राईस' },
    description: 'Long-grain jasmine rice wok-fried with diced chicken, fiery red chilies, scallions, and roasted Sichuan pepper.',
    descriptionLocal: { hi: 'तीखा शेज़वान फ्राइड राइस और चिकन का भरपूर चाइनीज़ बाउल।', mr: 'झणझणीत शेजवान फ्राईड राईस आणि चिकनचे बाउल.' },
    price: 269, outletId: 'mainland_china', outletName: 'Mainland China Bowl', category: 'asian_momos', isVeg: false,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 710, preparationTimeMins: 14, calories: 640, servingSize: 'Serves 1-2', spiceTag: 'Fiery Szechuan', isBestseller: true
  },
  {
    id: 'mc-3', name: 'Crystal Veg Dim Sum (6 Pcs)', nameLocal: { hi: 'क्रिस्टल वेज डिम सम', mr: 'क्रिस्टल व्हेज डिम सम' },
    description: 'Translucent steamed potato-starch dumplings filled with water chestnuts, shiitake, and tender bamboo shoots.',
    descriptionLocal: { hi: 'भाप में पके हुए पारदर्शी डिम सम, चिली गार्लिक डिप के साथ।', mr: 'वाफवलेले पारदर्शक डिम सम आणि चिली डिप.' },
    price: 189, outletId: 'mainland_china', outletName: 'Mainland China Bowl', category: 'asian_momos', isVeg: true,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 430, preparationTimeMins: 10, calories: 260, servingSize: 'Serves 1', spiceTag: 'Cantonese Mild', isBestseller: false
  },
  {
    id: 'mc-4', name: 'Crispy Honey Chili Lotus Stem', nameLocal: { hi: 'हनी चिली लोटस स्टेम', mr: 'हनी चिली लोटस स्टेम' },
    description: 'Thin crisp lotus stem chips glazed in wild forest honey, crushed red chilies, and toasted white sesame.',
    descriptionLocal: { hi: 'शहद और तीखी मिर्च में टॉस किए गए कुरकुरे कमल ककड़ी के चिप्स।', mr: 'मध आणि तिखट मिरचीने कोट केलेले कमळ काकडीचे कुरकुरीत काप.' },
    price: 199, outletId: 'mainland_china', outletName: 'Mainland China Bowl', category: 'asian_momos', isVeg: true,
    image: 'https://images.unsplash.com/photo-1741243413081-999c4b1a80ab?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 560, preparationTimeMins: 9, calories: 340, servingSize: 'Serves 1', spiceTag: 'Sweet & Spicy', isBestseller: true
  },

  // 22. Dunkin' (dunkin)
  {
    id: 'dd-1', name: 'Classic Glazed Ring Donut (Box of 2)', nameLocal: { hi: 'क्लासिक ग्लेज्ड डोनट', mr: 'क्लासिक ग्लेज्ड डोनट' },
    description: 'Melt-in-mouth yeast-raised fluffy ring donuts coated in signature warm vanilla honey glaze.',
    descriptionLocal: { hi: 'नरम और मीठे वनीला ग्लेज्ड रिंग डोनट्स।', mr: 'मऊ आणि गोड व्हॅनिला ग्लेज्ड डोनट्सची जोडी.' },
    price: 139, outletId: 'dunkin', outletName: "Dunkin'", category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1685779923180-b78b6b8231b9?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 920, preparationTimeMins: 3, calories: 320, servingSize: 'Serves 1-2', spiceTag: 'Honey Glazed', isBestseller: true
  },
  {
    id: 'dd-2', name: 'Death by Chocolate Boston Cream Donut', nameLocal: { hi: 'बोस्टन क्रीम चॉकलेट डोनट', mr: 'बोस्टन क्रीम चॉकलेट डोनट' },
    description: 'Puffy donut filled with silky vanilla custard and topped with a thick layer of dark chocolate fudge.',
    descriptionLocal: { hi: 'वनीला कस्टर्ड और गाढ़ी डार्क चॉकलेट से भरा लजीज डोनट।', mr: 'व्हॅनिला कस्टर्ड आणि डार्क चॉकलेटने भरलेला डोनट.' },
    price: 99, outletId: 'dunkin', outletName: "Dunkin'", category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1661951931841-6e0811dceacc?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 1100, preparationTimeMins: 3, calories: 380, servingSize: 'Serves 1', spiceTag: 'Rich Custard', isBestseller: true
  },
  {
    id: 'dd-3', name: 'Dunkin Iced Caramel Macchiato', nameLocal: { hi: 'डंकिन आइस्ड कारमेल कॉफी', mr: 'डंकिन आईस्ड कॅरमेल कॉफी' },
    description: 'Rich dark espresso poured over cold milk, ice, and ribbons of golden buttery caramel syrup.',
    descriptionLocal: { hi: 'एस्प्रेसो, ठंडा दूध और कारमेल सिरप वाली चिल्ड कॉफी।', mr: 'एस्प्रेसो, दूध आणि कॅरमेलची थंडगार कॉफी.' },
    price: 179, outletId: 'dunkin', outletName: "Dunkin'", category: 'coffee_tea', isVeg: true,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 680, preparationTimeMins: 4, calories: 220, servingSize: 'Serves 1', spiceTag: 'Caramel Brew', isBestseller: false
  },
  {
    id: 'dd-4', name: 'Toasted Jalapeño Cheese Bagel', nameLocal: { hi: 'चीज़ जलापेनो बेगल', mr: 'चीझ जालापेनो बेगल' },
    description: 'Oven-warm artisan circular bagel topped with toasted cheddar, cream cheese, and pickled jalapeños.',
    descriptionLocal: { hi: 'चीज़ और तीखे जलापेनो से बेक किया हुआ स्वादिष्ट बेगल।', mr: 'चीज आणि जालापेनोसह भाजलेला बेगल.' },
    price: 149, outletId: 'dunkin', outletName: "Dunkin'", category: 'burgers', isVeg: true,
    image: 'https://images.unsplash.com/photo-1727245243403-b177f3670c2e?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 390, preparationTimeMins: 6, calories: 360, servingSize: 'Serves 1', spiceTag: 'Toasted Savory', isBestseller: true
  },

  // 23. Barbeque Nation Express (bbq_nation)
  {
    id: 'bn-1', name: 'Smoky Cajun Spiced Potatoes Platter', nameLocal: { hi: 'काजुन स्पाइस्ड पोटैटो', mr: 'काजुन स्पाइस बटाटा' },
    description: 'Crispy baby potatoes smashed and smothered in creamy cajun paprika mayo and chopped spring onions.',
    descriptionLocal: { hi: 'काजुन मसाले और क्रीमी सॉस से भरपूर क्रिस्पी बेबी पोटैटो प्लेटर।', mr: 'काजुन मसाला आणि क्रीमी सॉसने भरलेले कुरकुरीत बटाटे.' },
    price: 189, outletId: 'bbq_nation', outletName: 'Barbeque Nation Express', category: 'sides', isVeg: true,
    image: 'https://images.unsplash.com/photo-1736819739003-8b4347ff799f?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 980, preparationTimeMins: 11, calories: 420, servingSize: 'Serves 1-2', spiceTag: 'Creamy Cajun', isBestseller: true
  },
  {
    id: 'bn-2', name: 'Charcoal Grilled Murgh Malai Tikka', nameLocal: { hi: 'मुर्ग़ मलाई टिक्का', mr: 'मुर्ग मलाई टिक्का' },
    description: 'Boneless chicken cubes marinated in cashew paste, fresh cream, green cardamom, and grilled on skewers.',
    descriptionLocal: { hi: 'काजू पेस्ट और ताज़ी मलाई में मेरिनेट किया हुआ मखमली चिकन टिक्का।', mr: 'काजू पेस्ट आणि ताज्या मलईत मेरिनेट केलेला चिकन टिक्का.' },
    price: 299, outletId: 'bbq_nation', outletName: 'Barbeque Nation Express', category: 'chicken_crisps', isVeg: false,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 1250, preparationTimeMins: 16, calories: 580, servingSize: 'Serves 1-2', spiceTag: 'Mughlai Cream', isBestseller: true
  },
  {
    id: 'bn-3', name: 'Peshawari Paneer Tikka Skewer', nameLocal: { hi: 'पेशावरी पनीर टिक्का', mr: 'पेशावरी पनीर टिक्का' },
    description: 'Succulent malai paneer blocks infused with crushed coriander, ajwain, and char-grilled with capsicum.',
    descriptionLocal: { hi: 'अजवाइन और ताज़े मसालों में मेरिनेट चारकोल ग्रिल्ड पनीर टिक्का।', mr: 'चारकोलवर भाजलेला मसालेदार पेशावरी पनीर टिक्का.' },
    price: 269, outletId: 'bbq_nation', outletName: 'Barbeque Nation Express', category: 'chicken_crisps', isVeg: true,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 670, preparationTimeMins: 14, calories: 490, servingSize: 'Serves 1-2', spiceTag: 'Medium Charred', isBestseller: false
  },
  {
    id: 'bn-4', name: 'Express Dum Biryani & Kebab Combo Box', nameLocal: { hi: 'दम बिरयानी कबाब कॉम्बो', mr: 'दम बिर्याणी कबाब कॉम्बो' },
    description: 'Slow-cooked aromatic chicken biryani served with two grilled chicken kebabs, salan, and cucumber raita.',
    descriptionLocal: { hi: 'चिकन बिरयानी, ग्रिल्ड कबाब और रायते का संपूर्ण पार्टी बॉक्स।', mr: 'बिर्याणी, दोन कबाब आणि रायत्याचा कम्प्लीट कॉम्बो बॉक्स.' },
    price: 369, outletId: 'bbq_nation', outletName: 'Barbeque Nation Express', category: 'biryani_rice', isVeg: false,
    image: 'https://images.unsplash.com/photo-1777716003985-68fed08d0c7e?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 890, preparationTimeMins: 18, calories: 780, servingSize: 'Serves 1-2', spiceTag: 'Grand Feast', isBestseller: true
  },

  // 24. Amul Ice Cream (amul_ice)
  {
    id: 'ami-1', name: 'Amul Kesar Pista Royal Kulfi', nameLocal: { hi: 'केसर पिस्ता कुल्फी', mr: 'केशर पिस्ता कुल्फी' },
    description: 'Traditional saffron and pistachio kulfi made from thickened whole milk, set on a bamboo stick.',
    descriptionLocal: { hi: 'असली केसर और पिस्ते के स्वाद वाली अमूल कुल्फी।', mr: 'अस्सल केशर आणि पिस्त्याच्या चवीची अमूल कुल्फी.' },
    price: 35, outletId: 'amul_ice', outletName: 'Amul Ice Cream', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1769576918185-f4f57316d78a?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 2100, preparationTimeMins: 2, calories: 120, servingSize: 'Serves 1', spiceTag: 'Desi Kulfi', isBestseller: true
  },
  {
    id: 'ami-2', name: 'Amul Gold Choco Fudge Bar', nameLocal: { hi: 'अमूल चॉको बार', mr: 'अमूल चॉको बार' },
    description: 'Rich vanilla ice cream core dipped in a thick Belgian milk chocolate shell with roasted cashew crunch.',
    descriptionLocal: { hi: 'वनीला आइसक्रीम के ऊपर बेल्जियन चॉकलेट और काजू की परत।', mr: 'व्हॅनिला आईस्क्रीमवर बेल्जियन चॉकलेट आणि काजू कोटिंग.' },
    price: 55, outletId: 'amul_ice', outletName: 'Amul Ice Cream', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1572829214292-1f9b1aa3b1ce?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 1420, preparationTimeMins: 2, calories: 180, servingSize: 'Serves 1', spiceTag: 'Crisp Shell', isBestseller: true
  },
  {
    id: 'ami-3', name: 'Real Alphonso Mango Delight Cup', nameLocal: { hi: 'मैंगो आइसक्रीम कप', mr: 'आंबा आईस्क्रीम कप' },
    description: 'Creamy golden mango scoop prepared with fresh Alphonso pulp and pure pasteurized Amul milk.',
    descriptionLocal: { hi: 'असली आम और अमूल दूध से तैयार स्वादिष्ट आइसक्रीम।', mr: 'अस्सल आंबा आणि अमूल दुधापासून बनवलेले आईस्क्रीम.' },
    price: 45, outletId: 'amul_ice', outletName: 'Amul Ice Cream', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1625667893125-ca3b9492946c?auto=format&fit=crop&w=600&q=80',
    rating: 4.7, reviewsCount: 1100, preparationTimeMins: 2, calories: 150, servingSize: 'Serves 1', spiceTag: 'Real Mango', isBestseller: false
  },
  {
    id: 'ami-4', name: 'Amul Rajbhog Traditional Tub (500ml)', nameLocal: { hi: 'अमूल राजभोग टब', mr: 'अमूल राजभोग टब' },
    description: 'Royal dessert ice cream blended with honey, saffron, crushed dry fruits, and spongy rasgulla bits.',
    descriptionLocal: { hi: 'केसर, बादाम और रसगुल्ले के टुकड़ों वाली शाही राजभोग आइसक्रीम।', mr: 'केशर, बदाम आणि रसगुल्ला तुकड्यांनी युक्त राजभोग आईस्क्रीम.' },
    price: 160, outletId: 'amul_ice', outletName: 'Amul Ice Cream', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1752962640042-e489e7d7a757?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 880, preparationTimeMins: 2, calories: 420, servingSize: 'Serves 3-4', spiceTag: 'Royal Sweets', isBestseller: true
  },

  // 25. Juice Junction (juice_junction)
  {
    id: 'jj-1', name: 'Tropical Mango Pineapple Smoothie', nameLocal: { hi: 'मैंगो पाइनेपल स्मूदी', mr: 'मँगो पाइनापल स्मूदी' },
    description: 'Fresh Alphonso mango, sweet pineapple chunks, coconut milk, and banana blended smooth.',
    descriptionLocal: { hi: 'आम, अनानास, नारियल दूध और केले से बना हेल्दी स्मूदी।', mr: 'आंबा, अननस, नारळ दूध आणि केळ्याची हेल्दी स्मूदी.' },
    price: 129, outletId: 'juice_junction', outletName: 'Juice Junction', category: 'coffee_tea', isVeg: true,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80',
    rating: 4.9, reviewsCount: 650, preparationTimeMins: 4, calories: 210, servingSize: 'Serves 1', spiceTag: 'Cold-Pressed', isBestseller: true
  },
  {
    id: 'jj-2', name: 'Fresh Watermelon Mint Crush', nameLocal: { hi: 'तरबूज मिंट फ्रेश क्रश', mr: 'टरबूज पुदीना फ्रेश क्रश' },
    description: 'Ice-cold seeded watermelon juice crushed with fresh mint leaves, rock salt, and a squeeze of lime.',
    descriptionLocal: { hi: 'ताज़े तरबूज, पुदीना और नींबू से बना ठंडा और रिफ्रेशिंग क्रश।', mr: 'ताज्या टरबूज, पुदीना आणि लिंबाचा थंडगार रिफ्रेशिंग क्रश.' },
    price: 79, outletId: 'juice_junction', outletName: 'Juice Junction', category: 'coffee_tea', isVeg: true,
    image: 'https://images.unsplash.com/photo-1683166263544-e754e85c3e7c?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 870, preparationTimeMins: 3, calories: 95, servingSize: 'Serves 1', spiceTag: 'Zero Added Sugar', isBestseller: true
  },
  {
    id: 'jj-3', name: 'High-Protein Peanut Butter Banana Shake', nameLocal: { hi: 'पीनट बटर प्रोटीन शेक', mr: 'पीनट बटर प्रोटीन शेक' },
    description: 'Rich whole milk, roasted peanut butter, ripe bananas, raw honey, and dark cocoa nibs.',
    descriptionLocal: { hi: 'मूंगफली मक्खन, केला और शहद से बना 24g प्रोटीन शेक।', mr: 'पीनट बटर, केळे आणि मधाचा पौष्टिक प्रोटीन शेक.' },
    price: 149, outletId: 'juice_junction', outletName: 'Juice Junction', category: 'desserts_shakes', isVeg: true,
    image: 'https://images.unsplash.com/photo-1685967836529-b0e8d6938227?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 490, preparationTimeMins: 5, calories: 380, servingSize: 'Serves 1', spiceTag: '24g Protein', isBestseller: true
  },
  {
    id: 'jj-4', name: 'Cold-Pressed Valencia Orange Juice', nameLocal: { hi: 'ऑरेंज फ्रेश जूस', mr: 'संत्र्याचा ताजा ज्यूस' },
    description: '100% pure citrus juice squeezed fresh without any added sugar, ice, or preservatives.',
    descriptionLocal: { hi: 'बिना शक्कर और बर्फ के ताज़ा निकाला गया संतरे का शुद्ध जूस।', mr: '१००% अस्सल संत्र्याचा पौष्टिक ताजा ज्यूस.' },
    price: 99, outletId: 'juice_junction', outletName: 'Juice Junction', category: 'coffee_tea', isVeg: true,
    image: 'https://images.unsplash.com/photo-1740555612192-3e3cf77b5d1f?auto=format&fit=crop&w=600&q=80',
    rating: 4.8, reviewsCount: 620, preparationTimeMins: 4, calories: 110, servingSize: 'Serves 1', spiceTag: 'Pure Vitamin C', isBestseller: false
  }
];

export const MENU_ITEMS = INITIAL_MENU_ITEMS;
