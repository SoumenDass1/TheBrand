import express from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                memberSince: true,
                avatar: true
            }
        });

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/user/orders
// @desc    Get user's orders (alias for /api/orders)
// @access  Private
router.get('/orders', protect, async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { userId: req.user.id },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, [
    body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { name, email, avatar } = req.body;
        const updateData = {};

        if (name) updateData.name = name;
        if (email) {
            // Check if email is already taken by another user
            const existingUser = await prisma.user.findFirst({
                where: {
                    email,
                    id: { not: req.user.id }
                }
            });

            if (existingUser) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Email already in use'
                });
            }
            updateData.email = email;
        }
        if (avatar !== undefined) updateData.avatar = avatar;

        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                memberSince: true,
                avatar: true
            }
        });

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Update profile error:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                message: 'User not found'
            });
        }
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

export default router;

