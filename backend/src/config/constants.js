// API Response Messages
export const MESSAGES = {
    // Success
    SIGNUP_SUCCESS: 'User registered successfully',
    LOGIN_SUCCESS: 'Login successful',

    // Errors - Validation
    ALL_FIELDS_REQUIRED: 'All fields are required',
    INVALID_EMAIL: 'Invalid email format',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
    PASSWORD_TOO_WEAK: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',

    // Errors - Auth
    EMAIL_EXISTS: 'Email already exists',
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'Unauthorized access',

    // Errors - Server
    SERVER_ERROR: 'Internal server error',
    DATABASE_ERROR: 'Database operation failed',
};

// HTTP Status Codes
export const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};

// Password Requirements
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

// Email Regex (basic validation)
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
