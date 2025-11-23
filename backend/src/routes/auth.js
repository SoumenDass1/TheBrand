import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import config from '../config/env.js';
import { STATUS_CODES, MESSAGES } from '../config/constants.js';
import { validateSignup, validateLogin } from '../middleware/validation.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Apply rate limiter to all auth routes
router.use(authLimiter);

// Signup Route
router.post('/signup', validateSignup, async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(STATUS_CODES.CONFLICT).json({
                success: false,
                message: MESSAGES.EMAIL_EXISTS,
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, config.bcryptRounds);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.SIGNUP_SUCCESS,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        next(err);
    }
});

// Login Route
router.post('/login', validateLogin, async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                success: false,
                message: MESSAGES.INVALID_CREDENTIALS,
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                success: false,
                message: MESSAGES.INVALID_CREDENTIALS,
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            config.jwtSecret,
            { expiresIn: config.jwtExpiration }
        );

        res.json({
            success: true,
            message: MESSAGES.LOGIN_SUCCESS,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        next(err);
    }
});

export default router;

