import rateLimit from 'express-rate-limit';
import config from '../config/env.js';

// General API rate limiter
export const apiLimiter = rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: config.rateLimitMaxRequests,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter rate limiter for auth endpoints
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 requests per window
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
