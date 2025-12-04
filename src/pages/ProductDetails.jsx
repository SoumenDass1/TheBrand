import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, Shield, Minus, Plus, Heart, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import '../css/ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');

    // Reset state when product ID changes
    useEffect(() => {
      setQuantity(1);
      setActiveImage(0);
      setActiveTab('description');
      setSelectedSize('M');
      window.scrollTo(0, 0); // Scroll to top on product change
    }, [id]);

    // All Products
    const allProducts = [
        {
            id: 1,
            name: 'Premium Leather Watch',
            price: 299,
            originalPrice: 399,
            rating: 4.8,
            reviews: 124,
            description: 'Crafted from the finest materials, this timepiece combines timeless style with modern durability.',
            images: [
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80',
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            stock: 15,
            sku: 'WATCH-001',
            badge: 'sale'
        },
        {
            id: 2,
            name: 'Designer Sunglasses',
            price: 189,
            originalPrice: 240,
            rating: 4.9,
            reviews: 98,
            description: 'Premium UV protection sunglasses with polarized lenses and lightweight titanium frame.',
            images: [
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80',
            ],
            sizes: ['One Size'],
            stock: 25,
            sku: 'SUNG-002',
            badge: 'new'
        },
        {
            id: 3,
            name: 'Wireless Headphones',
            price: 249,
            originalPrice: 329,
            rating: 4.7,
            reviews: 156,
            description: 'Immersive sound quality with active noise cancellation and 30-hour battery life.',
            images: [
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=800&q=80',
            ],
            sizes: ['One Size'],
            stock: 18,
            sku: 'HEAD-003',
        },
        {
            id: 4,
            name: 'Minimalist Backpack',
            price: 129,
            originalPrice: 179,
            rating: 4.6,
            reviews: 203,
            description: 'Sleek and functional backpack with laptop compartment and water-resistant material.',
            images: [
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=800&q=80',
            ],
            sizes: ['One Size'],
            stock: 30,
            sku: 'BACK-004',
        },
        {
            id: 5,
            name: 'Smart Fitness Band',
            price: 99,
            originalPrice: 139,
            rating: 4.5,
            reviews: 287,
            description: 'Track your fitness goals with heart rate monitoring, sleep tracking, and 7-day battery life.',
            images: [
                'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?auto=format&fit=crop&w=800&q=80',
            ],
            sizes: ['S', 'M', 'L'],
            stock: 45,
            sku: 'FIT-005',
        }
    ];

    // Get current product
    const product = allProducts.find(p => p.id === Number(id)) || allProducts[0];

    // Related products (exclude current one)
    const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);

    const handleAddToCart = () => {
        addToCart({ ...product, size: selectedSize }, quantity);
    };

    return (
        <div className="product-details-page">
            <div className="container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <Link to="/shop">Shop</Link>
                    <span>/</span>
                    <span>{product.name}</span>
                </div>

                {/* Main Product Section */}
                <div className="product-main">
                    {/* Image Gallery */}
                    <div className="product-gallery">
                        <div className="main-image">
                            {product.badge && (
                                <span className={`product - badge badge - ${ product.badge } `}>
                                    {product.badge === 'sale' ? 'Sale' : 'New'}
                                </span>
                            )}
                            <img src={product.images[activeImage]} alt={product.name} />
                        </div>
                        <div className="thumbnail-list">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    className={`thumbnail ${ activeImage === idx ? 'active' : '' } `}
                                    onClick={() => setActiveImage(idx)}
                                >
                                    <img src={img} alt={`View ${ idx + 1 } `} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="product-info-section">
                        <h1>{product.name}</h1>

                        <div className="product-meta">
                            <div className="rating">
                                <div className="stars">
                                    {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
                                </div>
                                <span className="rating-text">
                                    {product.rating} ({product.reviews} reviews)
                                </span>
                            </div>
                            <span className="divider">|</span>
                            <span className="stock-status in-stock">In Stock</span>
                            <span className="divider">|</span>
                            <span className="sku">SKU: {product.sku}</span>
                        </div>

                        <div className="price-section">
                            <div className="prices">
                                <span className="current-price">${product.price}</span>
                                {product.originalPrice && (
                                    <>
                                        <span className="original-price">${product.originalPrice}</span>
                                        <span className="savings">Save ${product.originalPrice - product.price}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <p className="product-description">{product.description}</p>

                        {/* Size Selector */}
                        <div className="option-group">
                            <label>Size</label>
                            <div className="size-options">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`size - btn ${ selectedSize === size ? 'active' : '' } `}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="option-group">
                            <label>Quantity</label>
                            <div className="quantity-selector">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="quantity-btn"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="quantity">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="quantity-btn"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <span className="stock-info">{product.stock} items available</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons">
                            <button onClick={handleAddToCart} className="btn btn-primary btn-lg add-to-cart">
                                Add to Cart
                            </button>
                            <button className="btn btn-outline icon-btn">
                                <Heart size={20} />
                            </button>
                            <button className="btn btn-outline icon-btn">
                                <Share2 size={20} />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="product-features">
                            <div className="feature">
                                <Truck size={20} />
                                <div>
                                    <strong>Free Delivery</strong>
                                    <p>On orders over $50</p>
                                </div>
                            </div>
                            <div className="feature">
                                <Shield size={20} />
                                <div>
                                    <strong>2 Year Warranty</strong>
                                    <p>Full coverage</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="product-tabs">
                    <div className="tabs-header">
                        {['description', 'specifications', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                className={`tab - btn ${ activeTab === tab ? 'active' : '' } `}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="tab-content">
                        {activeTab === 'description' && (
                            <div className="tab-panel">
                                <h3>Product Description</h3>
                                <p>{product.description}</p>
                                <p>This premium product is designed with attention to every detail, ensuring both style and functionality.</p>
                            </div>
                        )}
                        {activeTab === 'specifications' && (
                            <div className="tab-panel">
                                <h3>Specifications</h3>
                                <table className="specs-table">
                                    <tbody>
                                        <tr><td>SKU</td><td>{product.sku}</td></tr>
                                        <tr><td>Stock</td><td>{product.stock} units</td></tr>
                                        <tr><td>Rating</td><td>{product.rating}/5.0</td></tr>
                                        <tr><td>Warranty</td><td>2 Years</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="tab-panel">
                                <h3>Customer Reviews</h3>
                                <p className="text-muted">No reviews yet. Be the first to review this product!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <section className="related-products">
                    <h2>You May Also Like</h2>
                    <div className="products-grid">
                        {relatedProducts.map((prod) => (
                            <ProductCard key={prod.id} product={prod} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductDetails;
