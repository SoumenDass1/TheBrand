import express from 'express';
import morgan from 'morgan';
import config from './config/env.js';
import helmetMiddleware from './middleware/helmet.js';
import corsMiddleware from './middleware/cors.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import prisma from './config/database.js';

const app = express();

// Security & Logging Middleware
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
app.use('/api/', apiLimiter);

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv,
    });
});

// Root Endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'TheBrand API',
        version: '2.0',
        status: 'running',
    });
});

// Routes
app.use('/api/auth', authRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Error Handler (must be last)
app.use(errorHandler);

// Start Server
const server = app.listen(config.port, () => {
    console.log(`🚀 Server running on port ${config.port}`);
    console.log(`📦 Environment: ${config.nodeEnv}`);
    console.log(`🔗 Health check: http://localhost:${config.port}/health`);
});

// Graceful Shutdown
const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} received. Closing server gracefully...`);

    server.close(async () => {
        console.log('HTTP server closed');

        // Close database connection
        await prisma.$disconnect();
        console.log('Database connection closed');

        process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
        console.error('Forcing shutdown after timeout');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
