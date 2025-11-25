import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import ProductSlider from '../components/ProductSlider';
import { allProducts } from '../data/products';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, toggleFavorite, favorites, cart } = useApp();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        const foundProduct = allProducts.find(p => p.id === parseInt(id));

        if (foundProduct) {
            const fullProduct = {
                ...foundProduct,
                description: foundProduct.description || `Experience premium quality with the ${foundProduct.name}. Designed for excellence and durability, this product is a perfect addition to your collection.`,
                originalPrice: foundProduct.originalPrice || Math.round(foundProduct.price * 1.2),
                features: foundProduct.features || [
                    'Premium build quality',
                    '1-year manufacturer warranty',
                    'Eco-friendly materials',
                    'Modern and stylish design',
                    'Satisfaction guaranteed'
                ],
                inStock: true,
                images: foundProduct.images || [
                    foundProduct.image,
                    foundProduct.image,
                    foundProduct.image
                ],
                reviews: foundProduct.reviews || [
                    { id: 1, user: 'John Doe', rating: 5, comment: 'Excellent product! Highly recommend.', date: '2024-01-15' },
                    { id: 2, user: 'Jane Smith', rating: 4, comment: 'Great quality and fast shipping.', date: '2024-01-20' },
                    { id: 3, user: 'Mike Johnson', rating: 5, comment: 'Perfect! Exceeded my expectations.', date: '2024-02-01' }
                ],
                rating: foundProduct.rating || 4.5,
                reviewCount: foundProduct.reviewCount || 127
            };
            setProduct(fullProduct);
            setSelectedImage(0);
        }
    }, [id]);

    if (!product) {
        return (
            <div className="product-detail-page">
                <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
                    <h2>Product not found</h2>
                    <Link to="/" className="btn btn-primary">Back to Home</Link>
                </div>
            </div>
        );
    }

    const isFavorite = favorites.some(item => item.id === product.id);
    const isInCart = cart.some(item => item.id === product.id);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        setTimeout(() => navigate('/cart'), 500);
    };

    const similarProducts = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 8);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        return (
            <div className="star-rating">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < fullStars ? 'star filled' : i === fullStars && hasHalfStar ? 'star half' : 'star'}>
                        ★
                    </span>
                ))}
                <span className="rating-value">{rating}</span>
            </div>
        );
    };

    return (
        <div className="product-detail-page">
            {showNotification && (
                <div className="notification-toast">
                    <span>✓ Added to cart!</span>
                </div>
            )}
            <div className="container">
                <div className="breadcrumb">
                    <Link to="/">Home</Link>
                    <span> / </span>
                    <Link to={`/?search=${product.category}`}>{product.category}</Link>
                    <span> / </span>
                    <span>{product.name}</span>
                </div>

                <div className="product-detail-grid">
                    <div className="product-image-section">
                        <div className="main-image glass-card">
                            <img src={product.images[selectedImage]} alt={product.name} />
                            <button
                                className={`favorite-btn-large ${isFavorite ? 'active' : ''}`}
                                onClick={() => toggleFavorite(product)}
                                aria-label="Toggle favorite"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </button>
                        </div>
                        {product.images.length > 1 && (
                            <div className="image-thumbnails">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img src={img} alt={`${product.name} view ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="product-info-section">
                        <div className="product-header">
                            <span className="product-category">{product.category}</span>
                            <h1>{product.name}</h1>
                            
                            <div className="product-rating">
                                {renderStars(product.rating)}
                                <span className="review-count">({product.reviewCount} reviews)</span>
                            </div>

                            <div className="product-pricing">
                                <span className="current-price">${product.price}</span>
                                {product.originalPrice && (
                                    <>
                                        <span className="original-price">${product.originalPrice}</span>
                                        <span className="discount">
                                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="product-tabs">
                            <button
                                className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                                onClick={() => setActiveTab('description')}
                            >
                                Description
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                                onClick={() => setActiveTab('features')}
                            >
                                Features
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Reviews ({product.reviews.length})
                            </button>
                        </div>

                        <div className="tab-content">
                            {activeTab === 'description' && (
                                <div className="product-description">
                                    <p>{product.description}</p>
                                </div>
                            )}
                            {activeTab === 'features' && (
                                <div className="product-features">
                                    <ul>
                                        {product.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {activeTab === 'reviews' && (
                                <div className="product-reviews">
                                    {product.reviews.map(review => (
                                        <div key={review.id} className="review-item">
                                            <div className="review-header">
                                                <div>
                                                    <strong>{review.user}</strong>
                                                    <div className="review-rating">
                                                        {renderStars(review.rating)}
                                                    </div>
                                                </div>
                                                <span className="review-date">{review.date}</span>
                                            </div>
                                            <p className="review-comment">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
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

                            <div className="action-buttons">
                                <button
                                    className={`btn btn-primary btn-full ${isInCart ? 'in-cart' : ''}`}
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                >
                                    {isInCart ? '✓ In Cart' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                                <button
                                    className="btn btn-gold btn-full"
                                    onClick={handleBuyNow}
                                    disabled={!product.inStock}
                                >
                                    Buy Now
                                </button>
                            </div>
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
                            <div className="meta-item">
                                <span className="meta-label">Category:</span>
                                <Link to={`/?search=${product.category}`} className="meta-value">
                                    {product.category}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {similarProducts.length > 0 && (
                    <div className="similar-products-section">
                        <h2 className="section-title">Similar Products</h2>
                        <ProductSlider products={similarProducts} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
