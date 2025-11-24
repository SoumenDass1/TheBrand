import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement actual login logic with backend
        console.log('Login submitted:', formData);
        // navigate('/profile');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="auth-split-screen">
            {/* Form Section - LEFT */}
            <div className="auth-form-section">
                <div className="auth-form-container">
                    <div className="auth-header">
                        <h1>Welcome Back</h1>
                        <div className="accent-line"></div>
                        <p>Sign in to your account to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-footer">
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="forgot-link">
                                Forgot Password?
                            </a>
                        </div>

                        <button type="submit" className="btn btn-primary btn-full">
                            Sign In
                        </button>
                    </form>

                    <div className="auth-switch">
                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                    </div>
                </div>
            </div>

            {/* Image Section - RIGHT */}
            <div className="auth-image-section auth-image-right" style={{ backgroundImage: 'url(/login-model.png)' }}>
                <div className="auth-image-overlay">
                    <h2>Premium E-Commerce</h2>
                    <p>Discover quality products designed for modern living</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
