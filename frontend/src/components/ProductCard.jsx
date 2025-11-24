import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
    return (
        <div className="product-card glass-card">
            <div className="product-image">
                <img
                    src={product.image || 'https://via.placeholder.com/300'}
                    alt={product.name}
                />
                <div className="product-badge badge badge-gold">New</div>
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-footer">
                    <div className="product-price">
                        <span className="price">${product.price}</span>
                        {product.originalPrice && (
                            <span className="original-price">${product.originalPrice}</span>
                        )}
                    </div>

                    <Link to={`/products/${product.id}`} className="btn-view">
                        View Details →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
