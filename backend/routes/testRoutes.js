import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

// @route   GET /api/test/database
// @desc    Test database connection and show data statistics
// @access  Public (for testing only - remove in production)
router.get('/database', async (req, res) => {
    try {
        // Test connection
        await prisma.$connect();

        // Count records
        const stats = {
            users: await prisma.user.count(),
            products: await prisma.product.count(),
            reviews: await prisma.review.count(),
            carts: await prisma.cart.count(),
            cartItems: await prisma.cartItem.count(),
            orders: await prisma.order.count(),
            orderItems: await prisma.orderItem.count()
        };

        // Get sample data
        const sampleUsers = await prisma.user.findMany({
            take: 3,
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });

        const sampleProducts = await prisma.product.findMany({
            take: 3,
            select: {
                id: true,
                name: true,
                price: true,
                category: true
            }
        });

        res.json({
            success: true,
            message: 'Database connection successful',
            connection: '✅ Connected',
            statistics: stats,
            sampleData: {
                users: sampleUsers,
                products: sampleProducts
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Database test error:', error);
        res.status(500).json({
            success: false,
            message: 'Database connection failed',
            error: error.message,
            connection: '❌ Failed'
        });
    }
});

export default router;

