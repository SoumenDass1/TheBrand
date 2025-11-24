import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-content">
                    <Link to="/" className="logo">
                        <span className="logo-text">The</span>
                        <span className="logo-highlight">Brand</span>
                    </Link>

                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
                        <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                            <span className="cart-icon">🛒</span>
                            Cart
                        </Link>

                        {isLoggedIn ? (
                            <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                        ) : (
                            <Link to="/auth" className="btn btn-sm" onClick={() => setIsMenuOpen(false)}>
                                Login / Sign Up
                            </Link>
                        )}
                    </div>

                    <button
                        className="menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
