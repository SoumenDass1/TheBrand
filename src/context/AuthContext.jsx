import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateUser = (updatedData) => {
        setUser(prev => {
            const newUser = { ...prev, ...updatedData };
            // Persist to localStorage for demo purposes
            localStorage.setItem('user_data', JSON.stringify(newUser));
            return newUser;
        });
        toast.success('Profile updated');
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Check if we have saved user data
                    const savedUser = localStorage.getItem('user_data');
                    if (savedUser) {
                        setUser(JSON.parse(savedUser));
                    } else {
                        setUser({ name: 'Test User', email: 'user@example.com', role: 'user' });
                    }
                } catch (error) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            // Mock Login
            localStorage.setItem('token', 'dummy-token');
            const userData = { name: 'Test User', email, role: 'user' };
            setUser(userData);
            localStorage.setItem('user_data', JSON.stringify(userData));
            toast.success('Logged in successfully');
            return true;
        } catch (error) {
            toast.error('Login failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_data');
        setUser(null);
        toast.success('Logged out');
    };

    const register = async (userData) => {
        try {
            toast.success('Registration successful! Please login.');
            return true;
        } catch (error) {
            toast.error('Registration failed');
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, updateUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
