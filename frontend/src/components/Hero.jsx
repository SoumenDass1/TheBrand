import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="accent-line accent-line-center"></div>
                    <h1 className="hero-title fade-in">
                        Discover Premium Products
                    </h1>
                    <p className="hero-subtitle slide-in-left">
                        Experience the finest collection of curated products designed for modern living.
                        Quality meets style in every piece.
                    </p>
                    <div className="hero-buttons slide-in-right">
                        <Link to="/products" className="btn btn-primary">
                            Shop Now
                        </Link>
                        <Link to="/products" className="btn btn-outline">
                            View Collection
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
