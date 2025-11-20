import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import '../styles/Home.css';

// Import banner images
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';

const Home = () => {
    const [offset, setOffset] = useState(0);
    const [cartCount, setCartCount] = useState(0);

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

    const products = [
        { id: 1, name: "Neon Headphones", price: "$299" },
        { id: 2, name: "Cyber Watch", price: "$199" },
        { id: 3, name: "Future Chair", price: "$399" },
        { id: 4, name: "Mech Keyboard", price: "$149" },
    ];

    const bannerImages = [banner1, banner2, banner3];

    return (
        <div className="page-wrapper">
            <Navbar cartCount={cartCount} />

            <Slider images={bannerImages} />

            <section className="featured-section">
                <div className="container">
                    <h2 className="section-title">Trending Gear</h2>
                    <div className="product-grid">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className="product-card"
                                style={{ animation: `slideUp 0.8s ease-out ${index * 0.2}s forwards`, opacity: 0, transform: 'translateY(20px)' }}
                            >
                                <div className="product-image"></div>
                                <div className="product-info">
                                    <h3 className="product-title">{product.name}</h3>
                                    <div className="product-price">{product.price}</div>
                                    <button className="add-to-cart-btn" onClick={addToCart}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
