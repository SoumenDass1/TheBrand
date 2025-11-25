import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import './ProductCard.css';

function ProductCard({ product }) {
    const { addToCart, toggleFavorite, favorites, cart } = useApp();
    const [isHovered, setIsHovered] = useState(false);
    const isFavorite = favorites.some(item => item.id === product.id);
    const isInCart = cart.some(item => item.id === product.id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    const handleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(product);
    };

    return (
        <div 
            className="product-card glass-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/products/${product.id}`} className="product-image-link">
                <div className="product-image">
                    <img
                        src={product.image || 'https://via.placeholder.com/300'}
                        alt={product.name}
                    />
                    <div className="product-badge badge badge-gold">New</div>
                    {product.originalPrice && (
                        <div className="discount-badge">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </div>
                    )}
                    <button
                        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                        onClick={handleFavorite}
                        aria-label="Toggle favorite"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <div className={`product-overlay ${isHovered ? 'visible' : ''}`}>
                        <Link to={`/products/${product.id}`} className="btn-quick-view">
                            Quick View
                        </Link>
                    </div>
                </div>
            </Link>

            <div className="product-info">
                <Link to={`/products/${product.id}`}>
                    <h3 className="product-name">{product.name}</h3>
                </Link>
                <p className="product-category">{product.category}</p>

                <div className="product-footer">
                    <div className="product-price">
                        <span className="price">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                        )}
                    </div>

                    <div className="product-actions">
                        <button 
                            className={`btn-add-cart ${isInCart ? 'in-cart' : ''}`}
                            onClick={handleAddToCart}
                        >
                            {isInCart ? '✓ In Cart' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
