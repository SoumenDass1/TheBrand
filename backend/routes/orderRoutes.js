import express from 'express';
import prisma from '../lib/prisma.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;

        if (!shippingAddress || !paymentMethod) {
            return res.status(400).json({ 
                success: false,
                message: 'Shipping address and payment method are required'
            });
        }

        // Get user's cart
        const cart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ 
                success: false,
                message: 'Cart is empty'
            });
        }

        // Calculate prices
        const itemsPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shippingPrice = itemsPrice > 100 ? 0 : 20;
        const taxPrice = itemsPrice * 0.08;
        const totalPrice = itemsPrice + shippingPrice + taxPrice;

        // Create order with order items
        const order = await prisma.order.create({
            data: {
                userId: req.user.id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
                orderItems: {
                    create: cart.items.map(item => ({
                        productId: item.productId,
                        name: item.name,
                        image: item.image,
                        price: item.price,
                        quantity: item.quantity
                    }))
                }
            },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        // Clear cart
        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id }
        });

        res.status(201).json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', protect, async (req, res) => {
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

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: req.params.id },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        if (!order) {
            return res.status(404).json({ 
                success: false,
                message: 'Order not found'
            });
        }

        // Make sure user owns the order or is admin
        if (order.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false,
                message: 'Not authorized to view this order'
            });
        }

        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Get order error:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                message: 'Order not found'
            });
        }
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

// @route   PUT /api/orders/:id/pay
// @desc    Update order to paid
// @access  Private
router.put('/:id/pay', protect, async (req, res) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: req.params.id }
        });

        if (!order) {
            return res.status(404).json({ 
                success: false,
                message: 'Order not found'
            });
        }

        if (order.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false,
                message: 'Not authorized'
            });
        }

        const updatedOrder = await prisma.order.update({
            where: { id: req.params.id },
            data: {
                isPaid: true,
                paidAt: new Date(),
                paymentResult: req.body
            }
        });

        res.json({
            success: true,
            order: updatedOrder
        });
    } catch (error) {
        console.error('Update order payment error:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                message: 'Order not found'
            });
        }
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

// @route   PUT /api/orders/:id/deliver
// @desc    Update order to delivered
// @access  Private/Admin
router.put('/:id/deliver', protect, admin, async (req, res) => {
    try {
        const updatedOrder = await prisma.order.update({
            where: { id: req.params.id },
            data: {
                isDelivered: true,
                deliveredAt: new Date(),
                status: 'Delivered'
            }
        });

        res.json({
            success: true,
            order: updatedOrder
        });
    } catch (error) {
        console.error('Update order delivery error:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                message: 'Order not found'
            });
        }
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

export default router;

