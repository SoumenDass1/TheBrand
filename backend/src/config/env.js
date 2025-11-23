import dotenv from 'dotenv';
dotenv.config();

const requiredEnvVars = ['DATABASE_URL'];

// Validate required environment variables
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
});

const config = {
    // Server
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',

    // Database
    databaseUrl: process.env.DATABASE_URL,

    // JWT
    jwtSecret: process.env.JWT_SECRET || 'fallback_secret_key_change_in_production',
    jwtExpiration: process.env.JWT_EXPIRATION || '7d',

    // Security
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10', 10),

    // CORS
    corsOrigin: process.env.CORS_ORIGIN || '*',

    // Rate Limiting
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
};

// Warn if using fallback JWT secret in production
if (config.nodeEnv === 'production' && !process.env.JWT_SECRET) {
    console.warn('WARNING: Using fallback JWT_SECRET in production! Please set a secure JWT_SECRET environment variable.');
}

export default config;
