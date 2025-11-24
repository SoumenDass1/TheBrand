import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import './Home.css';

function Home() {
    // Sample featured products
    const featuredProducts = [
        {
            id: 1,
            name: 'Premium Headphones',
            description: 'High-quality wireless headphones with noise cancellation',
            price: 299,
            originalPrice: 399,
            image: 'https://via.placeholder.com/300/667eea/ffffff?text=Headphones'
        },
        {
            id: 2,
            name: 'Smart Watch',
            description: 'Track your fitness and stay connected on the go',
            price: 249,
            originalPrice: 349,
            image: 'https://via.placeholder.com/300/764ba2/ffffff?text=Smart+Watch'
        },
        {
            id: 3,
            name: 'Laptop Backpack',
            description: 'Durable and stylish backpack for professionals',
            price: 89,
            originalPrice: 129,
            image: 'https://via.placeholder.com/300/f093fb/ffffff?text=Backpack'
        },
        {
            id: 4,
            name: 'Wireless Mouse',
            description: 'Ergonomic design for all-day comfort',
            price: 49,
            originalPrice: 79,
            image: 'https://via.placeholder.com/300/3b82f6/ffffff?text=Mouse'
        }
    ];

    return (
        <div className="home-page">
            <Hero />

            <section className="featured-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Products</h2>
                        <p className="section-subtitle">
                            Discover our handpicked selection of premium products
                        </p>
                    </div>

                    <div className="products-grid grid grid-4">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <div className="cta-content glass-card">
                        <h2>Ready to Upgrade Your Lifestyle?</h2>
                        <p>Join thousands of satisfied customers who trust TheBrand for quality and style.</p>
                        <button className="btn btn-primary">Shop All Products</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
