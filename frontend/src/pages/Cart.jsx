import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Cart.css';

function Cart() {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity } = useApp();
    const cartItems = cart;

    const removeItem = (id) => {
        if (window.confirm('Are you sure you want to remove this item from your cart?')) {
            removeFromCart(id);
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 20;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleCheckout = () => {
        if (cartItems.length === 0) return;
        // In a real app, this would navigate to checkout page
        alert('Checkout functionality would be implemented here!');
    };

    return (
        <div className="cart-page">
            <div className="container">
                <div className="page-header">
                    <h1>Shopping Cart</h1>
                    <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="empty-cart glass-card">
                        <div className="empty-cart-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </div>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <div className="empty-cart-actions">
                            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
                        </div>
                    </div>
                ) : (
                    <div className="cart-layout">
                        <div className="cart-items-section">
                            <div className="cart-items-header">
                                <h2>Cart Items</h2>
                                <button 
                                    className="btn-clear-cart"
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to clear your entire cart?')) {
                                            cartItems.forEach(item => removeFromCart(item.id));
                                        }
                                    }}
                                >
                                    Clear Cart
                                </button>
                            </div>
                            <div className="cart-items">
                                {cartItems.map(item => (
                                    <div key={item.id} className="cart-item glass-card">
                                        <Link to={`/products/${item.id}`} className="item-image">
                                            <img src={item.image} alt={item.name} />
                                        </Link>

                                        <div className="item-details">
                                            <Link to={`/products/${item.id}`}>
                                                <h3>{item.name}</h3>
                                            </Link>
                                            <p className="item-category">{item.category}</p>
                                            <p className="item-price">${item.price.toFixed(2)} each</p>
                                        </div>

                                        <div className="item-quantity">
                                            <label>Quantity</label>
                                            <div className="quantity-controls">
                                                <button 
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    −
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                        </div>

                                        <div className="item-total">
                                            <span className="total-label">Total</span>
                                            <span className="total-price">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>

                                        <button
                                            className="remove-btn"
                                            onClick={() => removeItem(item.id)}
                                            aria-label="Remove item"
                                            title="Remove item"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="cart-summary-section">
                            <div className="cart-summary glass-card sticky">
                                <h2>Order Summary</h2>

                                <div className="summary-details">
                                    <div className="summary-row">
                                        <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>

                                    <div className="summary-row">
                                        <span>Shipping</span>
                                        <span>
                                            {shipping === 0 ? (
                                                <span className="free-shipping">FREE</span>
                                            ) : (
                                                `$${shipping.toFixed(2)}`
                                            )}
                                        </span>
                                    </div>

                                    {shipping > 0 && subtotal < 100 && (
                                        <div className="shipping-note">
                                            <span>Add ${(100 - subtotal).toFixed(2)} more for free shipping!</span>
                                        </div>
                                    )}

                                    <div className="summary-row">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>

                                    <div className="summary-divider"></div>

                                    <div className="summary-row total">
                                        <span>Total</span>
                                        <span className="total-amount">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button 
                                    className="btn btn-primary btn-full btn-checkout"
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </button>

                                <Link to="/" className="continue-shopping">
                                    ← Continue Shopping
                                </Link>

                                <div className="security-badges">
                                    <div className="badge-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                        <span>Secure Checkout</span>
                                    </div>
                                    <div className="badge-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        <span>Free Returns</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
