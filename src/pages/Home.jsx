import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Home.css';

const Home = () => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.pageYOffset);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const products = [
        { id: 1, name: "Neon Headphones", price: "$299" },
        { id: 2, name: "Cyber Watch", price: "$199" },
        { id: 3, name: "Future Chair", price: "$399" },
        { id: 4, name: "Mech Keyboard", price: "$149" },
    ];

    return (
        <div className="page-wrapper">
            <Navbar />

            <section className="hero">
                <div className="hero-content" style={{ transform: `translateY(${offset * 0.5}px)` }}>
                    <h1>THE FUTURE IS HERE</h1>
                    <p>Experience the next generation of premium lifestyle products. Designed for the bold.</p>
                    <a href="/products" className="cta-button">EXPLORE NOW</a>
                </div>
            </section>

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
