import { Link } from 'react-router-dom';
import './ProductSlider.css';

function ProductSlider({ products, direction = 'left' }) {
    // Duplicate products to create seamless loop
    // Ensure we have enough items for a smooth loop (at least 8-10 items total)
    const sliderItems = products.length < 5 ? [...products, ...products, ...products, ...products] : [...products, ...products];

    return (
        <div className="product-slider-container">
            <div className={`product-slider-track ${direction === 'right' ? 'reverse' : ''}`}>
                {sliderItems.map((product, index) => (
                    <div key={`${product.id}-${index}`} className="slider-product-card">
                        <div className="slider-product-image">
                            <img src={product.image} alt={product.name} />
                            <div className="slider-product-overlay">
                                <Link to={`/products/${product.id}`} className="btn-view-details">
                                    View Details
                                </Link>
                            </div>
                        </div>
                        <div className="slider-product-info">
                            <h3 className="slider-product-name">{product.name}</h3>
                            <p className="slider-product-price">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductSlider;
