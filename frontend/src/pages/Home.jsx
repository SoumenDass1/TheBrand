import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { allProducts } from '../data/products';
import './Home.css';

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const search = params.get('search');
        setSearchQuery(search || '');
    }, [location]);

    // Featured Categories
    const featuredCategories = [
        { id: 'electronics', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?q=80&w=2069&auto=format&fit=crop' },
        { id: 'summer', name: 'Summer', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop' },
        { id: 'winter', name: 'Winter', image: 'https://images.unsplash.com/photo-1542272617-08f08630329e?q=80&w=1974&auto=format&fit=crop' }
    ];

    // Filter for search
    const searchResults = searchQuery
        ? allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : null;

    // Featured Products (8 items)
    const featuredProducts = allProducts.slice(0, 8);

    return (
        <div className="home-page">
            <Hero />

            {searchResults ? (
                <div className="container" style={{ marginTop: '4rem' }}>
                    <div className="search-results-section">
                        <h2 className="section-title">Search Results for "{searchQuery}"</h2>
                        <div className="products-grid grid grid-3">
                            {searchResults.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        {searchResults.length === 0 && (
                            <div className="no-results">
                                <p>No products found for "{searchQuery}".</p>
                                <button className="btn btn-primary" onClick={() => navigate('/')}>
                                    View All Products
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    {/* Featured Categories */}
                    <section className="featured-categories">
                        <div className="container">
                            <div className="categories-grid">
                                {featuredCategories.map(cat => (
                                    <div key={cat.id} className="category-card">
                                        <div className="category-image">
                                            <img src={cat.image} alt={cat.name} />
                                        </div>
                                        <div className="category-content">
                                            <h3>{cat.name}</h3>
                                            <Link to={`/?search=${cat.id}`} className="btn-link">Shop Now</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Featured Products */}
                    <section className="featured-products">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">Featured Collection</h2>
                                <p className="section-subtitle">Curated essentials for the modern lifestyle.</p>
                            </div>
                            <div className="products-grid grid grid-4">
                                {featuredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Minimal Promo Banner */}
                    <section className="promo-banner">
                        <div className="container">
                            <div className="promo-content">
                                <h2>New Arrivals</h2>
                                <p>Discover the latest collection. Crafted with precision.</p>
                                <Link to="/products" className="btn btn-primary">Shop Collection</Link>
                            </div>
                        </div>
                    </section>

                    {/* Why Choose Us */}
                    <section className="why-choose-us">
                        <div className="container">
                            <div className="features-grid">
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <h3>Free Shipping</h3>
                                    <p>On all orders over $100</p>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </div>
                                    <h3>Premium Quality</h3>
                                    <p>Certified top-tier materials</p>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                                            <path d="M21 3v5h-5" />
                                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                                            <path d="M8 16H3v5" />
                                        </svg>
                                    </div>
                                    <h3>Easy Returns</h3>
                                    <p>30-day money back guarantee</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}

export default Home;
