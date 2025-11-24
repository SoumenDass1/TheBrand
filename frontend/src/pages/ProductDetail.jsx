import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    // Sample product data (in real app, fetch from API)
    const product = {
        id,
        name: 'Premium Headphones',
        description: 'Experience audio like never before with these premium wireless headphones. Featuring advanced noise cancellation technology, superior sound quality, and all-day comfort.',
        price: 299,
        originalPrice: 399,
        category: 'Electronics',
        image: 'https://via.placeholder.com/600/667eea/ffffff?text=Premium+Headphones',
        features: [
            'Active Noise Cancellation',
            '30-hour battery life',
            'Bluetooth 5.0 connectivity',
            'Premium leather cushions',
            'Foldable design',
            '1-year warranty'
        ],
        inStock: true
    };

    const handleAddToCart = () => {
        console.log(`Adding ${quantity} of ${product.name} to cart`);
        // TODO: Implement cart logic
    };

    return (
        <div className="product-detail-page">
            <div className="container">
                <div className="product-detail-grid">
                    <div className="product-image-section">
                        <div className="main-image glass-card">
                            <img src={product.image} alt={product.name} />
                        </div>
                    </div>

                    <div className="product-info-section">
                        <div className="product-header">
                            <span className="product-category">{product.category}</span>
                            <h1>{product.name}</h1>

                            <div className="product-pricing">
                                <span className="current-price">${product.price}</span>
                                {product.originalPrice && (
                                    <span className="original-price">${product.originalPrice}</span>
                                )}
                                <span className="discount">
                                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                </span>
                            </div>
                        </div>

                        <div className="product-description">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className="product-features">
                            <h3>Key Features</h3>
                            <ul>
                                {product.features.map((feature, index) => (
                                    <li key={index}>✓ {feature}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="product-actions">
                            <div className="quantity-selector">
                                <label>Quantity:</label>
                                <div className="quantity-controls">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary btn-full"
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                            >
                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>

                        <div className="product-meta">
                            <div className="meta-item">
                                <span className="meta-label">Availability:</span>
                                <span className={`meta-value ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">SKU:</span>
                                <span className="meta-value">TB-{id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
