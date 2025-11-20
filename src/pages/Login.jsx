import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSignup, setIsSignup] = useState(false);

    // Form States
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        setIsSignup(location.pathname === '/signup');
    }, [location.pathname]);

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await api.login(loginData.email, loginData.password);
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (signupData.password !== signupData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await api.signup(signupData.name, signupData.email, signupData.password);
            setIsSignup(false);
            navigate('/login');
            setLoginData(prev => ({ ...prev, email: signupData.email }));
            setError('Account created! Please sign in.');
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleMode = () => {
        const newMode = !isSignup;
        setIsSignup(newMode);
        window.history.pushState({}, '', newMode ? '/signup' : '/login');
        setError('');
    };

    return (
        <div className={`auth-container ${isSignup ? 'sign-up-mode' : ''}`}>
            {/* Login Container (Static Left) */}
            <div className="static-panel login-panel">
                <div className="forms-wrapper">
                    <form onSubmit={handleLoginSubmit} className="auth-form">
                        <h2 className="title">Welcome Back</h2>
                        <p className="subtitle">Please enter your details.</p>

                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        {error && !isSignup && <div className="error-msg">{error}</div>}

                        <div className="form-actions">
                            <label className="remember-me">
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="#" className="forgot-pass">Forgot password?</a>
                        </div>

                        <button type="submit" className="btn-primary">Sign in</button>

                        <div className="toggle-text">
                            Don't have an account? <span onClick={toggleMode}>Sign up for free</span>
                        </div>
                    </form>
                </div>
            </div>

            {/* Signup Container (Static Right) */}
            <div className="static-panel signup-panel">
                <div className="forms-wrapper">
                    <form onSubmit={handleSignupSubmit} className="auth-form">
                        <h2 className="title">Create Account</h2>
                        <p className="subtitle">Join the future of fashion.</p>

                        <div className="input-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={signupData.name}
                                onChange={handleSignupChange}
                                required
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={signupData.email}
                                onChange={handleSignupChange}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={signupData.password}
                                onChange={handleSignupChange}
                                required
                                placeholder="Create a password"
                            />
                        </div>
                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={signupData.confirmPassword}
                                onChange={handleSignupChange}
                                required
                                placeholder="Confirm your password"
                            />
                        </div>

                        {error && isSignup && <div className="error-msg">{error}</div>}

                        <button type="submit" className="btn-primary">Sign Up</button>

                        <div className="toggle-text">
                            Already have an account? <span onClick={toggleMode}>Sign in</span>
                        </div>
                    </form>
                </div>
            </div>

            {/* Sliding Image Overlay */}
            <div className="image-overlay-panel">
                <div className="image-content">
                    <h3>Elevate Your Style.</h3>
                    <p>Experience the next generation of premium fashion.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
