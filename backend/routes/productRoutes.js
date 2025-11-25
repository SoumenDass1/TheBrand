import express from 'express';
import prisma from '../lib/prisma.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with optional filters
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category, search, minPrice, maxPrice, sort, page = 1, limit = 20 } = req.query;

        // Build where clause
        const where = {};

        if (category) {
            where.category = category.toLowerCase();
        }

        if (search) {
            where.name = {
                contains: search,
                mode: 'insensitive'
            };
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = parseFloat(minPrice);
            if (maxPrice) where.price.lte = parseFloat(maxPrice);
        }

        // Build sort
        let orderBy = {};
        if (sort === 'price-low') orderBy = { price: 'asc' };
        else if (sort === 'price-high') orderBy = { price: 'desc' };
        else if (sort === 'newest') orderBy = { createdAt: 'desc' };
        else if (sort === 'rating') orderBy = { rating: 'desc' };
        else orderBy = { createdAt: 'desc' };

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                orderBy,
                skip,
                take: parseInt(limit),
                include: {
                    reviews: {
                        take: 3,
                        orderBy: { date: 'desc' }
                    }
                }
            }),
            prisma.product.count({ where })
        ]);

        res.json({
            success: true,
            count: products.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            products
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/products/search
// @desc    Search products
// @access  Public
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ 
                success: false,
                message: 'Search query is required'
            });
        }

        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: q, mode: 'insensitive' } },
                    { description: { contains: q, mode: 'insensitive' } }
                ]
            },
            take: 50
        });

        res.json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error('Search products error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const { limit = 20 } = req.query;

        const products = await prisma.product.findMany({
            where: { category: category.toLowerCase() },
            take: parseInt(limit)
        });

        res.json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error('Get products by category error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id },
            include: {
                reviews: {
                    orderBy: { date: 'desc' }
                }
            }
        });

        if (!product) {
            return res.status(404).json({ 
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Get product error:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                message: 'Product not found'
            });
        }
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

// @route   POST /api/products
// @desc    Create a product
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const product = await prisma.product.create({
            data: {
                ...req.body,
                sku: req.body.sku || `TB-${Date.now()}`
            }
        });

        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const product = await prisma.product.update({
            where: { id: req.params.id },
            data: req.body
        });

        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Update product error:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                message: 'Product not found'
            });
        }
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        await prisma.product.delete({
            where: { id: req.params.id }
        });

        res.json({
            success: true,
            message: 'Product removed'
        });
    } catch (error) {
        console.error('Delete product error:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                message: 'Product not found'
            });
        }
        res.status(500).json({ 
            success: false,
            message: 'Server error'
        });
    }
});

export default router;

