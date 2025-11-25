import express from 'express';
import prisma from '../lib/prisma.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        let cart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: req.user.id,
                    items: {
                        create: []
                    }
                },
                include: {
                    items: {
                        include: {
                            product: true
                        }
                    }
                }
            });
        }

        res.json({
            success: true,
            cart: cart.items
        });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        if (!productId) {
            return res.status(400).json({ 
                success: false,
                message: 'Product ID is required'
            });
        }

        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return res.status(404).json({ 
                success: false,
                message: 'Product not found'
            });
        }

        // Get or create cart
        let cart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: { items: true }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: req.user.id
                },
                include: { items: true }
            });
        }

        // Check if item already exists in cart
        const existingItem = cart.items.find(
            item => item.productId === productId
        );

        if (existingItem) {
            // Update quantity
            const updatedItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: {
                    quantity: existingItem.quantity + parseInt(quantity)
                },
                include: {
                    product: true
                }
            });

            const updatedCart = await prisma.cart.findUnique({
                where: { userId: req.user.id },
                include: {
                    items: {
                        include: {
                            product: true
                        }
                    }
                }
            });

            return res.json({
                success: true,
                cart: updatedCart.items
            });
        } else {
            // Add new item
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: productId,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    quantity: parseInt(quantity)
                }
            });
        }

        const updatedCart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        res.json({
            success: true,
            cart: updatedCart.items
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

// @route   PUT /api/cart/:itemId
// @desc    Update cart item quantity
// @access  Private
router.put('/:itemId', protect, async (req, res) => {
    try {
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ 
                success: false,
                message: 'Quantity must be at least 1'
            });
        }

        // Verify cart item belongs to user
        const cart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: { items: true }
        });

        if (!cart) {
            return res.status(404).json({ 
                success: false,
                message: 'Cart not found'
            });
        }

        const item = cart.items.find(item => item.id === req.params.itemId);
        if (!item) {
            return res.status(404).json({ 
                success: false,
                message: 'Item not found in cart'
            });
        }

        await prisma.cartItem.update({
            where: { id: req.params.itemId },
            data: { quantity: parseInt(quantity) }
        });

        const updatedCart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        res.json({
            success: true,
            cart: updatedCart.items
        });
    } catch (error) {
        console.error('Update cart error:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                message: 'Item not found'
            });
        }
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

// @route   DELETE /api/cart/:itemId
// @desc    Remove item from cart
// @access  Private
router.delete('/:itemId', protect, async (req, res) => {
    try {
        // Verify cart item belongs to user
        const cart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: { items: true }
        });

        if (!cart) {
            return res.status(404).json({ 
                success: false,
                message: 'Cart not found'
            });
        }

        const item = cart.items.find(item => item.id === req.params.itemId);
        if (!item) {
            return res.status(404).json({ 
                success: false,
                message: 'Item not found in cart'
            });
        }

        await prisma.cartItem.delete({
            where: { id: req.params.itemId }
        });

        const updatedCart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        res.json({
            success: true,
            cart: updatedCart.items
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                message: 'Item not found'
            });
        }
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

// @route   DELETE /api/cart
// @desc    Clear entire cart
// @access  Private
router.delete('/', protect, async (req, res) => {
    try {
        const cart = await prisma.cart.findUnique({
            where: { userId: req.user.id }
        });

        if (!cart) {
            return res.status(404).json({ 
                success: false,
                message: 'Cart not found'
            });
        }

        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id }
        });

        res.json({
            success: true,
            message: 'Cart cleared',
            cart: []
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

export default router;

