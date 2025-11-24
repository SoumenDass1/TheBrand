import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Products.css';

function Products() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Sample products data
    const allProducts = [
        {
            id: 1,
            name: 'Premium Headphones',
            description: 'High-quality wireless headphones with noise cancellation',
            price: 299,
            originalPrice: 399,
            category: 'electronics',
            image: 'https://via.placeholder.com/300/667eea/ffffff?text=Headphones'
        },
        {
            id: 2,
            name: 'Smart Watch',
            description: 'Track your fitness and stay connected on the go',
            price: 249,
            originalPrice: 349,
            category: 'electronics',
            image: 'https://via.placeholder.com/300/764ba2/ffffff?text=Smart+Watch'
        },
        {
            id: 3,
            name: 'Laptop Backpack',
            description: 'Durable and stylish backpack for professionals',
            price: 89,
            originalPrice: 129,
            category: 'accessories',
            image: 'https://via.placeholder.com/300/f093fb/ffffff?text=Backpack'
        },
        {
            id: 4,
            name: 'Wireless Mouse',
            description: 'Ergonomic design for all-day comfort',
            price: 49,
            originalPrice: 79,
            category: 'electronics',
            image: 'https://via.placeholder.com/300/3b82f6/ffffff?text=Mouse'
        },
        {
            id: 5,
            name: 'Leather Wallet',
            description: 'Premium leather wallet with RFID protection',
            price: 59,
            category: 'accessories',
            image: 'https://via.placeholder.com/300/ec4899/ffffff?text=Wallet'
        },
        {
            id: 6,
            name: 'Bluetooth Speaker',
            description: 'Portable speaker with amazing sound quality',
            price: 129,
            originalPrice: 179,
            category: 'electronics',
            image: 'https://via.placeholder.com/300/8b5cf6/ffffff?text=Speaker'
        }
    ];

    const categories = [
        { id: 'all', name: 'All Products' },
        { id: 'electronics', name: 'Electronics' },
        { id: 'accessories', name: 'Accessories' }
    ];

    const filteredProducts = allProducts.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="products-page">
            <div className="container">
                <div className="page-header">
                    <h1>Our Products</h1>
                    <p>Explore our curated collection of premium items</p>
                </div>

                <div className="products-controls">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="category-filters">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="products-grid grid grid-3">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="no-products">
                        <p>No products found. Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Products;
