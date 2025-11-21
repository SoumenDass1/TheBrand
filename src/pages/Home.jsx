import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import '../styles/Home.css';
import product1 from '../assets/product1.jpg';

const Home = () => {
    const [offset, setOffset] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.pageYOffset);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const addToCart = () => {
        setCartCount(prev => prev + 1);
    };

    const toggleFavorite = (productId) => {
        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const products = [
        {
            id: 1,
            name: "Oversized Green T-Shirt",
            price: 799,
            rating: 4.5,
            category: "Oversize",
            gender: "Men",
            image: product1
        }
    ];

    const sliderColors = [
        '#E8DFD0',  // Beige
        '#C8B8A8',  // Taupe
        '#B8A896',  // Warm grey
        '#D4C4B4',  // Sand
        '#E0D0C0',  // Cream
        '#C0B0A0'   // Mushroom
    ];

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="star filled">★</span>);
        }
        if (hasHalfStar) {
            stars.push(<span key="half" className="star half">★</span>);
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
        }
        return stars;
    };

    return (
        <div className="page-wrapper">
            <Navbar cartCount={cartCount} />

            <Slider colors={sliderColors} />

            <section className="featured-section">
                <div className="container">
                    <h2 className="section-title">Trending Products</h2>
                    <div className="product-grid">
                        {products.map((product) => {
                            const isFavorite = favorites.includes(product.id);
                            return (
                                <div key={product.id} className="product-card">
                                    <div className="product-image-wrapper">
                                        <img src={product.image} alt={product.name} className="product-image" />
                                        <button
                                            className="favorite-icon"
                                            onClick={() => toggleFavorite(product.id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                            </svg>
                                        </button>
                                        <button className="add-to-cart-hover-btn" onClick={addToCart}>
                                            Add to Cart
                                        </button>
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-title">{product.name}</h3>
                                        <div className="product-meta">
                                            <span className="product-category">{product.category}</span>
                                            <span className="product-gender">{product.gender}</span>
                                        </div>
                                        <div className="product-rating">
                                            {renderStars(product.rating)}
                                            <span className="rating-value">{product.rating}</span>
                                        </div>
                                        <div className="product-price">₹{product.price}/-</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
