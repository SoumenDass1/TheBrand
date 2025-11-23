// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// API Endpoints
export const API_ENDPOINTS = {
    AUTH: {
        SIGNUP: '/api/auth/signup',
        LOGIN: '/api/auth/login',
    },
    HEALTH: '/health',
};

// Local Storage Keys
export const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
};

// App Constants
export const APP_NAME = 'TheBrand';
export const APP_VERSION = '2.0';
