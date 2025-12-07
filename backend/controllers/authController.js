const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Register request:', { name, email });

    try {
        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        if (user) {
            console.log('User created:', user.id);
            res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            console.log('Invalid user data');
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                addressLine1: user.addressLine1,
                addressLine2: user.addressLine2,
                city: user.city,
                state: user.state,
                country: user.country,
                zipCode: user.zipCode,
                avatar: user.avatar,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
    });

    if (user) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            addressLine1: user.addressLine1,
            addressLine2: user.addressLine2,
            city: user.city,
            state: user.state,
            country: user.country,
            zipCode: user.zipCode,
            avatar: user.avatar,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    console.log('Update Profile Request:', req.body);
    console.log('User ID:', req.user.id);

    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
        });

        if (user) {
            const updatedUser = await prisma.user.update({
                where: { id: req.user.id },
                data: {
                    name: req.body.name || user.name,
                    email: req.body.email || user.email,
                    phone: req.body.phone || user.phone,
                    addressLine1: req.body.addressLine1 || user.addressLine1,
                    addressLine2: req.body.addressLine2 || user.addressLine2,
                    city: req.body.city || user.city,
                    state: req.body.state || user.state,
                    country: req.body.country || user.country,
                    zipCode: req.body.zipCode || user.zipCode,
                    avatar: req.body.avatar || user.avatar,
                },
            });

            console.log('User updated successfully');

            res.json({
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                phone: updatedUser.phone,
                addressLine1: updatedUser.addressLine1,
                addressLine2: updatedUser.addressLine2,
                city: updatedUser.city,
                state: updatedUser.state,
                country: updatedUser.country,
                zipCode: updatedUser.zipCode,
                avatar: updatedUser.avatar,
                token: generateToken(updatedUser.id),
            });
        } else {
            console.log('User not found');
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
