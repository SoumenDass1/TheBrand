import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Grid, List, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import '../css/Shop.css';

const Shop = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState('grid');
    const [filters, setFilters] = useState({
        categories: [],
        priceRange: [0, 1000],
        inStock: false,
    });

    // Fixed Products (same as in ProductDetails)
    const allProducts = [
        {
            id: 1,
            name: 'Premium Leather Watch',
            price: 299,
            originalPrice: 399,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
            inStock: true,
            rating: 4.8,
            badge: 'sale'
        },
        {
            id: 2,
            name: 'Designer Sunglasses',
            price: 189,
            originalPrice: 240,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
            inStock: true,
            rating: 4.9,
            badge: 'new'
        },
        {
            id: 3,
            name: 'Wireless Headphones',
            price: 249,
            originalPrice: 329,
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
            inStock: true,
            rating: 4.7,
            badge: null
        },
        {
            id: 4,
            name: 'Minimalist Backpack',
            price: 129,
            originalPrice: 179,
            category: 'Fashion',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
            inStock: true,
            rating: 4.6,
            badge: null
        },
        {
            id: 5,
            name: 'Smart Fitness Band',
            price: 99,
            originalPrice: 139,
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80',
            inStock: true,
            rating: 4.5,
            badge: 'sale'
        },
        {
            id: 6,
            name: 'Leather Wallet',
            price: 79,
            originalPrice: 99,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
            inStock: true,
            rating: 4.4,
            badge: null
        },
        {
            id: 7,
            name: 'Wireless Mouse',
            price: 49,
            originalPrice: 69,
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
            inStock: false,
            rating: 4.3,
            badge: null
        },
        {
            id: 8,
            name: 'Cotton T-Shirt',
            price: 29,
            originalPrice: 39,
            category: 'Fashion',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
            inStock: true,
            rating: 4.2,
            badge: 'new'
        },
        {
            id: 9,
            name: 'Running Shoes',
            price: 159,
            originalPrice: 199,
            category: 'Fashion',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
            inStock: true,
            rating: 4.7,
            badge: null
        },
        {
            id: 10,
            name: 'Smartphone Case',
            price: 19,
            originalPrice: 29,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1601972600418-5ffbf67078f2?auto=format&fit=crop&w=800&q=80',
            inStock: true,
            rating: 4.1,
            badge: null
        },
        {
            id: 11,
            name: 'Bluetooth Speaker',
            price: 89,
            originalPrice: 119,
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
            inStock: true,
            rating: 4.6,
            badge: 'sale'
        },
        {
            id: 12,
            name: 'Denim Jacket',
            price: 149,
            originalPrice: 199,
            category: 'Fashion',
            image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
            inStock: true,
            rating: 4.5,
            badge: null
        }
    ];

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return allProducts
            .filter((p) => {
                const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = filters.categories.length === 0 || filters.categories.includes(p.category);
                const matchesPrice = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
                const matchesStock = !filters.inStock || p.inStock;
                return matchesSearch && matchesCategory && matchesPrice && matchesStock;
            })
            .sort((a, b) => {
                if (sortBy === 'price-low') return a.price - b.price;
                if (sortBy === 'price-high') return b.price - a.price;
                if (sortBy === 'rating') return b.rating - a.rating;
                return 0;
            });
    }, [searchQuery, filters, sortBy]);

    const handleCategoryToggle = (cat) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat]
        }));
    };

    const clearFilters = () => {
        setFilters({ categories: [], priceRange: [0, 1000], inStock: false });
    };

    return (
        <div className="shop-page">
            <div className="container">
                {/* Header */}
                <div className="shop-header">
                    <div>
                        <h1>Shop All Products</h1>
                        <p className="text-muted">Discover our entire collection</p>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="shop-toolbar">
                    <div className="search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="toolbar-actions">
                        <button
                            className="btn btn-outline filter-toggle"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <SlidersHorizontal size={18} />
                            Filters
                            {(filters.categories.length > 0 || filters.inStock) && (
                                <span className="filter-count">{filters.categories.length + (filters.inStock ? 1 : 0)}</span>
                            )}
                        </button>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="newest">Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>

                        <div className="view-toggle">
                            <button
                                className={viewMode === 'grid' ? 'active' : ''}
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                className={viewMode === 'list' ? 'active' : ''}
                                onClick={() => setViewMode('list')}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="shop-content">
                    {/* Filters Sidebar */}
                    <aside className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
                        <div className="filters-header">
                            <h3>Filters</h3>
                            <button onClick={() => setShowFilters(false)} className="close-btn">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Applied Filters */}
                        {(filters.categories.length > 0 || filters.inStock) && (
                            <div className="applied-filters">
                                <div className="applied-filters-header">
                                    <span>Applied Filters</span>
                                    <button onClick={clearFilters} className="clear-all">Clear All</button>
                                </div>
                                <div className="filter-chips">
                                    {filters.categories.map(cat => (
                                        <span key={cat} className="filter-chip">
                                            {cat}
                                            <button onClick={() => handleCategoryToggle(cat)}>
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                    {filters.inStock && (
                                        <span className="filter-chip">
                                            In Stock Only
                                            <button onClick={() => setFilters(prev => ({ ...prev, inStock: false }))}>
                                                <X size={14} />
                                            </button>
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Categories */}
                        <div className="filter-group">
                            <h4>Categories</h4>
                            {['Electronics', 'Fashion', 'Accessories'].map(cat => (
                                <label key={cat} className="filter-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={filters.categories.includes(cat)}
                                        onChange={() => handleCategoryToggle(cat)}
                                    />
                                    <span>{cat}</span>
                                    <span className="count">({allProducts.filter(p => p.category === cat).length})</span>
                                </label>
                            ))}
                        </div>

                        {/* Price Range */}
                        <div className="filter-group">
                            <h4>Price Range</h4>
                            <div className="price-range-slider">
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    step="10"
                                    value={filters.priceRange[1]}
                                    onChange={(e) => setFilters(prev => ({
                                        ...prev,
                                        priceRange: [0, Number(e.target.value)]
                                    }))}
                                    className="price-slider"
                                />
                                <div className="price-range-display">
                                    <span>${filters.priceRange[0]}</span>
                                    <span>${filters.priceRange[1]}</span>
                                </div>
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="filter-group">
                            <label className="filter-checkbox">
                                <input
                                    type="checkbox"
                                    checked={filters.inStock}
                                    onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                                />
                                <span>In Stock Only</span>
                            </label>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="products-section">
                        <div className="results-info">
                            <p>{filteredProducts.length} products found</p>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className={`products-grid ${viewMode}`}>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon">🔍</div>
                                <h3>No products found</h3>
                                <p>Try adjusting your filters or search terms</p>
                                <button onClick={clearFilters} className="btn btn-primary">
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
