import validator from 'validator';
import { STATUS_CODES, MESSAGES, EMAIL_REGEX, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '../config/constants.js';

export const validateSignup = (req, res, next) => {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: MESSAGES.ALL_FIELDS_REQUIRED,
        });
    }

    // Validate name (trim whitespace)
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: 'Name must be at least 2 characters long',
        });
    }

    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: MESSAGES.INVALID_EMAIL,
        });
    }

    // Validate password length
    if (password.length < PASSWORD_MIN_LENGTH) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: MESSAGES.PASSWORD_TOO_SHORT,
        });
    }

    // Validate password strength
    if (!PASSWORD_REGEX.test(password)) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: MESSAGES.PASSWORD_TOO_WEAK,
        });
    }

    // Sanitize and attach to req.body
    req.body.name = trimmedName;
    req.body.email = validator.normalizeEmail(email);

    next();
};

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: MESSAGES.ALL_FIELDS_REQUIRED,
        });
    }

    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: MESSAGES.INVALID_EMAIL,
        });
    }

    // Sanitize email
    req.body.email = validator.normalizeEmail(email);

    next();
};
