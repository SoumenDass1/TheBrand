import { STATUS_CODES, MESSAGES } from '../config/constants.js';

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error
    let statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
    let message = err.message || MESSAGES.SERVER_ERROR;

    // Prisma errors
    if (err.code) {
        switch (err.code) {
            case 'P2002':
                // Unique constraint violation
                statusCode = STATUS_CODES.CONFLICT;
                message = 'A record with this information already exists';
                break;
            case 'P2025':
                // Record not found
                statusCode = STATUS_CODES.NOT_FOUND;
                message = 'Record not found';
                break;
            default:
                statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
                message = MESSAGES.DATABASE_ERROR;
        }
    }

    // Send error response
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export default errorHandler;
