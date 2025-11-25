import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const checkDatabase = async () => {
    try {
        console.log('🔍 Checking database connection and data...\n');
        console.log('MongoDB URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Not set');
        console.log('');

        // Test connection
        await prisma.$connect();
        console.log('✅ Database connection successful!\n');

        // Count records in each collection
        const userCount = await prisma.user.count();
        const productCount = await prisma.product.count();
        const cartCount = await prisma.cart.count();
        const orderCount = await prisma.order.count();
        const reviewCount = await prisma.review.count();
        const cartItemCount = await prisma.cartItem.count();
        const orderItemCount = await prisma.orderItem.count();

        console.log('📊 Database Statistics:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`Users:        ${userCount}`);
        console.log(`Products:     ${productCount}`);
        console.log(`Reviews:      ${reviewCount}`);
        console.log(`Carts:        ${cartCount}`);
        console.log(`Cart Items:   ${cartItemCount}`);
        console.log(`Orders:       ${orderCount}`);
        console.log(`Order Items:  ${orderItemCount}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Show sample users
        if (userCount > 0) {
            console.log('👤 Sample Users:');
            const users = await prisma.user.findMany({
                take: 5,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    memberSince: true
                }
            });
            users.forEach(user => {
                console.log(`  - ${user.name} (${user.email}) - Role: ${user.role}`);
            });
            console.log('');
        }

        // Show sample products
        if (productCount > 0) {
            console.log('📦 Sample Products:');
            const products = await prisma.product.findMany({
                take: 5,
                select: {
                    id: true,
                    name: true,
                    price: true,
                    category: true,
                    inStock: true,
                    rating: true
                }
            });
            products.forEach(product => {
                console.log(`  - ${product.name} - $${product.price} (${product.category}) - Rating: ${product.rating} ⭐`);
            });
            console.log('');
        }

        // Show sample reviews
        if (reviewCount > 0) {
            console.log('⭐ Sample Reviews:');
            const reviews = await prisma.review.findMany({
                take: 3,
                include: {
                    product: {
                        select: {
                            name: true
                        }
                    }
                }
            });
            reviews.forEach(review => {
                console.log(`  - ${review.product.name}: "${review.comment}" - ${review.rating}/5 by ${review.user}`);
            });
            console.log('');
        }

        // Show sample carts
        if (cartCount > 0) {
            console.log('🛒 Sample Carts:');
            const carts = await prisma.cart.findMany({
                take: 3,
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    },
                    items: {
                        take: 2
                    }
                }
            });
            carts.forEach(cart => {
                console.log(`  - Cart for ${cart.user.name} (${cart.items.length} items)`);
            });
            console.log('');
        }

        // Show sample orders
        if (orderCount > 0) {
            console.log('📋 Sample Orders:');
            const orders = await prisma.order.findMany({
                take: 3,
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    },
                    orderItems: {
                        take: 2
                    }
                }
            });
            orders.forEach(order => {
                console.log(`  - Order ${order.id.slice(-8)} for ${order.user.name} - Total: $${order.totalPrice} - Status: ${order.status}`);
            });
            console.log('');
        }

        // Summary
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        if (userCount === 0 && productCount === 0) {
            console.log('⚠️  Database is empty. Run "npm run seed" to populate it.');
        } else {
            console.log('✅ Data is being stored successfully!');
        }
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    } catch (error) {
        console.error('❌ Error checking database:', error.message);
        if (error.code === 'P1001') {
            console.error('   Cannot reach database server. Check your MONGODB_URI in .env file.');
        } else if (error.code === 'P1002') {
            console.error('   Database connection timeout. Check your network connection.');
        }
    } finally {
        await prisma.$disconnect();
    }
};

checkDatabase();

