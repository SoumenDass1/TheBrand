import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import './Navbar.css';

function Navbar() {
    const { user, cart, logout } = useApp();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const searchInputRef = useRef(null);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (isSearchOpen && searchInputRef.current && !searchInputRef.current.contains(event.target) && !event.target.closest('.search-trigger')) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchOpen]);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            console.log('Navbar - Searching for:', searchQuery);
            navigate(`/?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
                <div className="container">
                    <div className="nav-content">
                        <Link to="/" className="logo">
                            <span className="logo-text">The</span>
                            <span className="logo-highlight">Brand</span>
                        </Link>

                        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>


                            {/* Search Bar */}
                            <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
                                <button className="search-trigger" onClick={toggleSearch} aria-label="Search">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </button>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    className="search-input"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearch}
                                />
                            </div>



                            <Link to="/cart" className="cart-link" onClick={() => setIsMenuOpen(false)} title="Cart">
                                <span className="icon-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="9" cy="21" r="1"></circle>
                                        <circle cx="20" cy="21" r="1"></circle>
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                    </svg>
                                    {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
                                </span>
                            </Link>

                            {user ? (
                                <div className="user-dropdown-container" ref={dropdownRef}>
                                    <button
                                        className="user-btn"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <span className="icon-wrapper">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        </span>
                                    </button>
                                    <div className={`user-dropdown ${isDropdownOpen ? 'show' : ''}`}>
                                        <div className="dropdown-header">Hello, {user.name || 'User'}</div>
                                        <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>My Profile</Link>
                                        <Link to="/orders" onClick={() => setIsDropdownOpen(false)}>Orders</Link>
                                        <Link to="/settings" onClick={() => setIsDropdownOpen(false)}>Settings</Link>
                                        <div className="dropdown-divider"></div>
                                        <button onClick={() => { logout(); setIsDropdownOpen(false); }} className="logout-btn">Logout</button>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/auth" className="btn btn-sm btn-login" onClick={() => setIsMenuOpen(false)}>
                                    Login / Sign Up
                                </Link>
                            )}
                        </div>

                        <button
                            className="menu-toggle"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
