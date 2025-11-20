import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="logo">TheBrand</Link>

                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
                    <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>

                    {/* Mobile-only actions */}
                    <div className="mobile-actions">
                        <Link to="/login" className="btn btn-outline" onClick={() => setIsMenuOpen(false)}>Login</Link>
                        <Link to="/signup" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                    </div>
                </div>

                <div className="nav-actions desktop-only">
                    <Link to="/login" className="btn btn-outline">Login</Link>
                    <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                </div>

                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
