import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// Sample products data
const sampleProducts = [
    { name: 'Headphones', price: 299, category: 'electronics', image: 'https://via.placeholder.com/300/667eea/ffffff?text=Headphones' },
    { name: 'Smart Watch', price: 249, category: 'electronics', image: 'https://via.placeholder.com/300/764ba2/ffffff?text=Smart+Watch' },
    { name: 'Keyboard', price: 129, category: 'electronics', image: 'https://via.placeholder.com/300/f093fb/ffffff?text=Keyboard' },
    { name: 'Mouse', price: 49, category: 'electronics', image: 'https://via.placeholder.com/300/3b82f6/ffffff?text=Mouse' },
    { name: 'Speaker', price: 129, category: 'electronics', image: 'https://via.placeholder.com/300/8b5cf6/ffffff?text=Speaker' },
    { name: 'Summer Dress', price: 59, category: 'summer', image: 'https://via.placeholder.com/300/f472b6/ffffff?text=Summer+Dress' },
    { name: 'Linen Shirt', price: 45, category: 'summer', image: 'https://via.placeholder.com/300/fde047/ffffff?text=Linen+Shirt' },
    { name: 'Beach Shorts', price: 35, category: 'summer', image: 'https://via.placeholder.com/300/60a5fa/ffffff?text=Shorts' },
    { name: 'Wool Coat', price: 199, category: 'winter', image: 'https://via.placeholder.com/300/374151/ffffff?text=Wool+Coat' },
    { name: 'Cashmere Scarf', price: 89, category: 'winter', image: 'https://via.placeholder.com/300/9ca3af/ffffff?text=Scarf' },
    { name: 'Coffee Table', price: 299, category: 'wood', image: 'https://via.placeholder.com/300/78350f/ffffff?text=Coffee+Table' },
    { name: 'Wooden Wall Clock', price: 79, category: 'wood', image: 'https://via.placeholder.com/300/92400e/ffffff?text=Wall+Clock' },
    { name: 'Building Blocks', price: 49, category: 'toys', image: 'https://via.placeholder.com/300/ef4444/ffffff?text=Blocks' },
    { name: 'Plush Teddy Bear', price: 29, category: 'toys', image: 'https://via.placeholder.com/300/f87171/ffffff?text=Teddy' },
    { name: 'Sci-Fi Book', price: 24, category: 'books', image: 'https://via.placeholder.com/300/1e3a8a/ffffff?text=Sci-Fi' },
    { name: 'Cookbook Masterclass', price: 39, category: 'books', image: 'https://via.placeholder.com/300/1e40af/ffffff?text=Cookbook' },
    { name: 'Espresso Machine', price: 199, category: 'kitchen', image: 'https://via.placeholder.com/300/4b5563/ffffff?text=Espresso' },
    { name: 'Smart Blender', price: 129, category: 'kitchen', image: 'https://via.placeholder.com/300/6b7280/ffffff?text=Blender' }
];

const seedDatabase = async () => {
    try {
        console.log('Starting database seed...');

        // Clear existing data
        await prisma.review.deleteMany({});
        await prisma.cartItem.deleteMany({});
        await prisma.cart.deleteMany({});
        await prisma.orderItem.deleteMany({});
        await prisma.order.deleteMany({});
        await prisma.product.deleteMany({});
        await prisma.user.deleteMany({});
        console.log('Cleared existing data');

        // Seed products
        const productsToSeed = sampleProducts.map((product, index) => ({
            name: product.name,
            price: product.price,
            originalPrice: Math.round(product.price * 1.2),
            category: product.category,
            image: product.image,
            images: [product.image, product.image, product.image],
            description: `Experience premium quality with the ${product.name}. Designed for excellence and durability, this product is a perfect addition to your collection.`,
            features: [
                'Premium build quality',
                '1-year manufacturer warranty',
                'Eco-friendly materials',
                'Modern and stylish design',
                'Satisfaction guaranteed'
            ],
            inStock: true,
            stockQuantity: Math.floor(Math.random() * 100) + 10,
            rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
            reviewCount: Math.floor(Math.random() * 200) + 10,
            sku: `TB-${Date.now()}-${index}`
        }));

        const createdProducts = await prisma.product.createMany({
            data: productsToSeed
        });
        console.log(`Seeded ${createdProducts.count} products`);

        // Add reviews to products
        const allProducts = await prisma.product.findMany();
        for (const product of allProducts) {
            await prisma.review.createMany({
                data: [
                    {
                        productId: product.id,
                        user: 'John Doe',
                        rating: 5,
                        comment: 'Excellent product! Highly recommend.',
                        date: new Date('2024-01-15')
                    },
                    {
                        productId: product.id,
                        user: 'Jane Smith',
                        rating: 4,
                        comment: 'Great quality and fast shipping.',
                        date: new Date('2024-01-20')
                    },
                    {
                        productId: product.id,
                        user: 'Mike Johnson',
                        rating: 5,
                        comment: 'Perfect! Exceeded my expectations.',
                        date: new Date('2024-02-01')
                    }
                ]
            });
        }
        console.log('Added reviews to products');

        // Create test admin user
        const hashedAdminPassword = await bcrypt.hash('admin123', 10);
        const adminExists = await prisma.user.findUnique({
            where: { email: 'admin@thebrand.com' }
        });

        if (!adminExists) {
            await prisma.user.create({
                data: {
                    name: 'Admin User',
                    email: 'admin@thebrand.com',
                    password: hashedAdminPassword,
                    role: 'admin'
                }
            });
            console.log('Created admin user: admin@thebrand.com / admin123');
        }

        // Create test regular user
        const hashedUserPassword = await bcrypt.hash('user123', 10);
        const userExists = await prisma.user.findUnique({
            where: { email: 'user@thebrand.com' }
        });

        if (!userExists) {
            await prisma.user.create({
                data: {
                    name: 'Test User',
                    email: 'user@thebrand.com',
                    password: hashedUserPassword
                }
            });
            console.log('Created test user: user@thebrand.com / user123');
        }

        console.log('Database seeding completed!');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

seedDatabase()
    .then(() => {
        console.log('Seed script finished successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Seed script failed:', error);
        process.exit(1);
    });

