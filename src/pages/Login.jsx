import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await api.login(formData.email, formData.password);
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="split-screen-container">
            <div className="left-panel">
                <div className="login-content">
                    <div className="login-header">
                        <h1 className="welcome-text">Welcome Back to TheBrand</h1>
                        <p className="sub-text">Please enter your details.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="modern-form">
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        {error && <div className="error-msg">{error}</div>}

                        <div className="form-actions">
                            <label className="remember-me">
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="#" className="forgot-pass">Forgot password?</a>
                        </div>

                        <button type="submit" className="btn-login">Sign in</button>
                    </form>

                    <div className="signup-redirect">
                        Don't have an account? <Link to="/signup">Sign up for free</Link>
                    </div>
                </div>
            </div>

            <div className="right-panel">
                <div className="image-overlay">
                    <h3>Elevate Your Style.</h3>
                    <p>Join the most exclusive fashion community.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
