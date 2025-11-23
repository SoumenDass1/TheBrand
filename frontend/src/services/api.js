import { API_BASE_URL, API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Helper method for making requests
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        // Add auth token if available
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                // Extract error message from response
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            // Network error or parsing error
            if (error instanceof TypeError) {
                throw new Error('Network error. Please check your connection.');
            }
            throw error;
        }
    }

    // Auth Methods
    async signup(name, email, password) {
        return this.request(API_ENDPOINTS.AUTH.SIGNUP, {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });
    }

    async login(email, password) {
        return this.request(API_ENDPOINTS.AUTH.LOGIN, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    // Health Check
    async healthCheck() {
        return this.request(API_ENDPOINTS.HEALTH);
    }
}

export const api = new ApiService();
export default api;
