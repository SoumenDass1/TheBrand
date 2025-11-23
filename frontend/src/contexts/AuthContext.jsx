import React, { createContext, useState, useContext, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load auth state from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

        if (storedToken && storedUser) {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user:', error);
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem(STORAGE_KEYS.TOKEN, authToken);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
    };

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    };

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
