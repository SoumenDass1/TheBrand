import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/logo.png';

const Navbar = ({ cartCount }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="TheBrand" className="logo-img" />
                </Link>

                <div className="search-bar">
                    <input type="text" placeholder="Search products..." />
                    <button className="search-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                </div>

                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
                    <Link to="/favourites" onClick={() => setIsMenuOpen(false)}>Favourites</Link>

                    {/* Mobile-only actions */}
                    <div className="mobile-actions">
                        <Link to="/login" className="btn btn-outline" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                    </div>
                </div>

                <div className="nav-actions desktop-only">
                    <div className="cart-icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cart-icon"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </div>

                    <Link to="/login" className="profile-icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </Link>
                </div>

                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
