// API base URL - update this to your backend URL
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Auth API
export const authAPI = {
    login: (credentials) =>
        apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        }),

    signup: (userData) =>
        apiRequest('/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
        }),

    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
};

// Products API
export const productsAPI = {
    getAll: () => apiRequest('/products'),

    getById: (id) => apiRequest(`/products/${id}`),

    search: (query) => apiRequest(`/products/search?q=${query}`),

    getByCategory: (category) => apiRequest(`/products/category/${category}`),
};

// Cart API
export const cartAPI = {
    get: () => apiRequest('/cart'),

    add: (productId, quantity) =>
        apiRequest('/cart', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity }),
        }),

    update: (itemId, quantity) =>
        apiRequest(`/cart/${itemId}`, {
            method: 'PUT',
            body: JSON.stringify({ quantity }),
        }),

    remove: (itemId) =>
        apiRequest(`/cart/${itemId}`, {
            method: 'DELETE',
        }),
};

// User API
export const userAPI = {
    getProfile: () => apiRequest('/user/profile'),

    updateProfile: (userData) =>
        apiRequest('/user/profile', {
            method: 'PUT',
            body: JSON.stringify(userData),
        }),

    getOrders: () => apiRequest('/user/orders'),
};

export default {
    auth: authAPI,
    products: productsAPI,
    cart: cartAPI,
    user: userAPI,
};
