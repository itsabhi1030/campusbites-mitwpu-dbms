const mongoose = require('mongoose');
const seedData = require('./seedData.json');
require('dotenv').config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB Atlas for seeding MIT-WPU CampusBites...');
        const db = mongoose.connection.db;

        // 1. Seed / Upsert Campus Customers
        console.log('Seeding Customers...');
        const customers = [
            {
                name: "Rahul Sharma",
                email: "rahul@campusbites.edu",
                phone: ["+91-9876543210"],
                password_hash: "Campus@123",
                is_mitwpu_verified: true,
                addresses: [
                    { label: "Hostel", street: "MIT-WPU Hostel Block A", city: "Pune", pincode: "411038" }
                ],
                created_at: new Date(),
                is_active: true
            },
            {
                name: "Abhishek Sahoo",
                email: "abhishek.sahoo@mitwpu.edu.in",
                phone: ["+91-9876543211"],
                password_hash: "Campus@123",
                is_mitwpu_verified: true,
                addresses: [
                    { label: "Campus", street: "Saraswati Building", city: "Pune", pincode: "411038" }
                ],
                created_at: new Date(),
                is_active: true
            }
        ];
        for (const c of customers) {
            await db.collection('customers').updateOne(
                { email: c.email },
                { $set: c },
                { upsert: true }
            );
        }

        // 2. Seed Restaurants (25 Partner Outlets)
        console.log('Seeding 25 Partner Outlets...');
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

        // 3. Seed Menu Items (100 Verified Dishes)
        console.log('Seeding 100 Verified Food Dishes...');
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

        // Clean legacy non-outlet items if any
        await db.collection('menu_items').deleteMany({ outlet_id: { $exists: false } });
        await db.collection('restaurants').deleteMany({ outlet_id: { $exists: false } });

        // 4. Seed Delivery Partners (6 MIT-WPU Couriers)
        console.log('Seeding 6 Campus Couriers...');
        for (const r of seedData.riders) {
            const existing = await db.collection('delivery_partners').findOne({
                $or: [{ email: r.email }, { vehicle_number: r.vehicle }]
            });
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
            if (existing) {
                await db.collection('delivery_partners').updateOne({ _id: existing._id }, { $set: riderDoc });
            } else {
                await db.collection('delivery_partners').insertOne({
                    ...riderDoc,
                    completed_deliveries: 0,
                    current_order_id: null,
                    created_at: new Date()
                });
            }
        }

        // 5. Seed Coupons (5 Promo Vouchers)
        console.log('Seeding 5 Promo Vouchers...');
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

        console.log('Database seeded successfully with all official MIT-WPU collections & documents!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();