const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_URL = `${BASE_URL}/api`;

export const api = {
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Login failed");
        }
        return response.json();
    },

    signup: async (name, email, password) => {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Signup failed");
        }
        return response.json();
    },

    // Mock product fetch for now, replace with actual API call later
    getProducts: async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            {
                id: 1,
                name: "Premium Wireless Headphones",
                price: 299.99,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
                category: "Electronics",
                rating: 4.8
            },
            {
                id: 2,
                name: "Minimalist Watch",
                price: 149.50,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
                category: "Accessories",
                rating: 4.5
            },
            {
                id: 3,
                name: "Ergonomic Office Chair",
                price: 399.00,
                image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80",
                category: "Furniture",
                rating: 4.7
            },
            {
                id: 4,
                name: "Smart Fitness Tracker",
                price: 89.99,
                image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
                category: "Electronics",
                rating: 4.2
            }
        ];
    }
};
