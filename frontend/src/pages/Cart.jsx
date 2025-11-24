import { useState } from 'react';
import './Cart.css';

function Cart() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Premium Headphones',
            price: 299,
            quantity: 1,
            image: 'https://via.placeholder.com/150/667eea/ffffff?text=Headphones'
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 249,
            quantity: 2,
            image: 'https://via.placeholder.com/150/764ba2/ffffff?text=Watch'
        }
    ]);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 20;
    const total = subtotal + shipping;

    return (
        <div className="cart-page">
            <div className="container">
                <div className="page-header">
                    <h1>Shopping Cart</h1>
                    <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="empty-cart glass-card">
                        <h2>Your cart is empty</h2>
                        <p>Add some products to get started!</p>
                        <a href="/products" className="btn btn-primary">Shop Now</a>
                    </div>
                ) : (
                    <div className="cart-layout">
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item glass-card">
                                    <img src={item.image} alt={item.name} />

                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <p className="item-price">${item.price}</p>
                                    </div>

                                    <div className="item-quantity">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>

                                    <div className="item-total">
                                        <p>${item.price * item.quantity}</p>
                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() => removeItem(item.id)}
                                        aria-label="Remove item"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary glass-card">
                            <h2>Order Summary</h2>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-row total">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <button className="btn btn-primary btn-full">
                                Proceed to Checkout
                            </button>

                            <a href="/products" className="continue-shopping">
                                ← Continue Shopping
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
