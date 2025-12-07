import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                toast.success(`Updated quantity for ${product.name}`);
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            toast.success(`Added ${product.name} to cart`);
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        toast.success('Item removed from cart');
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const placeOrder = (orderDetails) => {
        const newOrder = {
            id: `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            total: cartTotal,
            status: 'Processing',
            items: [...cartItems],
            ...orderDetails
        };

        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));
        clearCart();
        return newOrder;
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                placeOrder,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
