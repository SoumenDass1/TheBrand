import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // Load state from local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedCart = localStorage.getItem('cart');
        const storedFavorites = localStorage.getItem('favorites');

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedCart) setCart(JSON.parse(storedCart));
        if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    }, []);

    // Save state to local storage on change
    useEffect(() => {
        if (user) localStorage.setItem('user', JSON.stringify(user));
        else localStorage.removeItem('user');
    }, [user]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        setCart([]);
        setFavorites([]);
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const toggleFavorite = (product) => {
        setFavorites((prevFavorites) => {
            const isFavorite = prevFavorites.some((item) => item.id === product.id);
            if (isFavorite) {
                return prevFavorites.filter((item) => item.id !== product.id);
            }
            return [...prevFavorites, product];
        });
    };

    const value = {
        user,
        cart,
        favorites,
        login,
        logout,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleFavorite,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    return useContext(AppContext);
}
