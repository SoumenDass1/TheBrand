import { useState } from 'react';
import './Profile.css';

function Profile() {
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://via.placeholder.com/150/667eea/ffffff?text=JD',
        memberSince: 'January 2024'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email
    });

    const orders = [
        {
            id: 'ORD-001',
            date: '2024-01-15',
            total: 548,
            status: 'Delivered',
            items: 2
        },
        {
            id: 'ORD-002',
            date: '2024-01-20',
            total: 299,
            status: 'In Transit',
            items: 1
        }
    ];

    const handleSave = (e) => {
        e.preventDefault();
        setUser({ ...user, ...formData });
        setIsEditing(false);
    };

    return (
        <div className="profile-page">
            <div className="container">
                <div className="page-header">
                    <h1>My Profile</h1>
                    <p>Manage your account and view your orders</p>
                </div>

                <div className="profile-layout">
                    <div className="profile-sidebar">
                        <div className="profile-card glass-card">
                            <div className="avatar-section">
                                <img src={user.avatar} alt={user.name} className="avatar" />
                                <h2>{user.name}</h2>
                                <p className="member-since">Member since {user.memberSince}</p>
                            </div>

                            <nav className="profile-nav">
                                <a href="#account" className="nav-item active">Account Details</a>
                                <a href="#orders" className="nav-item">Order History</a>
                                <a href="#settings" className="nav-item">Settings</a>
                                <a href="#logout" className="nav-item logout">Logout</a>
                            </nav>
                        </div>
                    </div>

                    <div className="profile-content">
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
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-actions">
                                        <button type="submit" className="btn btn-primary">Save Changes</button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setIsEditing(false)}
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
                                </div>
                            )}
                        </div>

                        <div className="orders-section glass-card">
                            <h2>Recent Orders</h2>

                            <div className="orders-list">
                                {orders.map(order => (
                                    <div key={order.id} className="order-item">
                                        <div className="order-header">
                                            <div>
                                                <h3>{order.id}</h3>
                                                <p className="order-date">{order.date}</p>
                                            </div>
                                            <span className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="order-footer">
                                            <span>{order.items} item(s)</span>
                                            <span className="order-total">${order.total}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
