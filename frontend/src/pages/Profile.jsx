import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import './Profile.css';

function Profile() {
    const navigate = useNavigate();
    const { user: contextUser, favorites, logout } = useApp();
    const [user, setUser] = useState({
        name: contextUser?.name || 'John Doe',
        email: contextUser?.email || 'john.doe@example.com',
        avatar: 'https://via.placeholder.com/150/667eea/ffffff?text=JD',
        memberSince: 'January 2024'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [activeSection, setActiveSection] = useState('account');
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email
    });

    useEffect(() => {
        if (contextUser) {
            setUser({
                ...user,
                name: contextUser.name || user.name,
                email: contextUser.email || user.email
            });
        }
    }, [contextUser]);

    const orders = [
        {
            id: 'ORD-001',
            date: '2024-01-15',
            total: 548,
            status: 'Delivered',
            items: 2,
            products: [
                { name: 'Headphones', image: 'https://via.placeholder.com/100/667eea/ffffff?text=HP', quantity: 1 },
                { name: 'Smart Watch', image: 'https://via.placeholder.com/100/764ba2/ffffff?text=SW', quantity: 1 }
            ]
        },
        {
            id: 'ORD-002',
            date: '2024-01-20',
            total: 299,
            status: 'In Transit',
            items: 1,
            products: [
                { name: 'Keyboard', image: 'https://via.placeholder.com/100/f093fb/ffffff?text=KB', quantity: 1 }
            ]
        },
        {
            id: 'ORD-003',
            date: '2024-02-05',
            total: 129,
            status: 'Processing',
            items: 1,
            products: [
                { name: 'Mouse', image: 'https://via.placeholder.com/100/3b82f6/ffffff?text=MS', quantity: 1 }
            ]
        }
    ];

    const handleSave = (e) => {
        e.preventDefault();
        setUser({ ...user, ...formData });
        setIsEditing(false);
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
            navigate('/');
        }
    };

    const getStatusColor = (status) => {
        const statusMap = {
            'Delivered': '#22c55e',
            'In Transit': '#3b82f6',
            'Processing': '#f59e0b',
            'Cancelled': '#ef4444'
        };
        return statusMap[status] || '#6c6c6c';
    };

    return (
        <div className="profile-page">
            <div className="container">
                <div className="page-header">
                    <h1>My Profile</h1>
                    <p>Manage your account, orders, and favorites</p>
                </div>

                <div className="profile-layout">
                    <div className="profile-sidebar">
                        <div className="profile-card glass-card">
                            <div className="avatar-section">
                                <div className="avatar-wrapper">
                                    <img src={user.avatar} alt={user.name} className="avatar" />
                                </div>
                                <h2>{user.name}</h2>
                                <p className="member-since">Member since {user.memberSince}</p>
                            </div>

                            <nav className="profile-nav">
                                <button
                                    className={`nav-item ${activeSection === 'account' ? 'active' : ''}`}
                                    onClick={() => setActiveSection('account')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    Account Details
                                </button>
                                <button
                                    className={`nav-item ${activeSection === 'orders' ? 'active' : ''}`}
                                    onClick={() => setActiveSection('orders')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="9" cy="21" r="1"></circle>
                                        <circle cx="20" cy="21" r="1"></circle>
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                    </svg>
                                    Order History ({orders.length})
                                </button>
                                <button
                                    className={`nav-item ${activeSection === 'favorites' ? 'active' : ''}`}
                                    onClick={() => setActiveSection('favorites')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                    Favorites ({favorites.length})
                                </button>
                                <button
                                    className="nav-item logout"
                                    onClick={handleLogout}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                        <polyline points="16 17 21 12 16 7"></polyline>
                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                    </svg>
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </div>

                    <div className="profile-content">
                        {activeSection === 'account' && (
                            <div className="account-section glass-card">
                                <div className="section-header">
                                    <h2>Account Information</h2>
                                    {!isEditing && (
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            Edit Profile
                                        </button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <form onSubmit={handleSave} className="edit-form">
                                        <div className="form-group">
                                            <label htmlFor="name">Full Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="form-actions">
                                            <button type="submit" className="btn btn-primary">Save Changes</button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setFormData({ name: user.name, email: user.email });
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="account-details">
                                        <div className="detail-row">
                                            <span className="label">Name:</span>
                                            <span className="value">{user.name}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="label">Email:</span>
                                            <span className="value">{user.email}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="label">Member Since:</span>
                                            <span className="value">{user.memberSince}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeSection === 'orders' && (
                            <div className="orders-section glass-card">
                                <h2>Order History</h2>

                                {orders.length === 0 ? (
                                    <div className="empty-state">
                                        <p>You haven't placed any orders yet.</p>
                                        <Link to="/" className="btn btn-primary">Start Shopping</Link>
                                    </div>
                                ) : (
                                    <div className="orders-list">
                                        {orders.map(order => (
                                            <div key={order.id} className="order-item">
                                                <div className="order-header">
                                                    <div>
                                                        <h3>Order {order.id}</h3>
                                                        <p className="order-date">Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                    </div>
                                                    <span
                                                        className="order-status"
                                                        style={{ backgroundColor: getStatusColor(order.status) + '20', color: getStatusColor(order.status) }}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="order-products">
                                                    {order.products?.map((product, idx) => (
                                                        <div key={idx} className="order-product-item">
                                                            <img src={product.image} alt={product.name} />
                                                            <div>
                                                                <p>{product.name}</p>
                                                                <span>Qty: {product.quantity}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="order-footer">
                                                    <span>{order.items} {order.items === 1 ? 'item' : 'items'}</span>
                                                    <span className="order-total">${order.total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeSection === 'favorites' && (
                            <div className="favorites-section glass-card">
                                <h2>My Favorites</h2>

                                {favorites.length === 0 ? (
                                    <div className="empty-state">
                                        <p>You haven't added any favorites yet.</p>
                                        <Link to="/" className="btn btn-primary">Browse Products</Link>
                                    </div>
                                ) : (
                                    <div className="favorites-grid grid grid-3">
                                        {favorites.map(product => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
