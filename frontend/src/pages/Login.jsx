import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSignup, setIsSignup] = useState(false);

    // Password Visibility States
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showSignupPassword, setShowSignupPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    // Icons
    const EyeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    );

    const EyeOffIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
    );

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
                            <div className="password-input-wrapper">
                                <input
                                    type={showLoginPassword ? "text" : "password"}
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    required
                                    placeholder="••••••••"
                                />
                                <span
                                    className="password-toggle-icon"
                                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                                >
                                    {showLoginPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </span>
                            </div>
                        </div>

                        {error && !isSignup && <div className="error-msg">{error}</div>}

                        <div className="form-actions">
                            <label className="remember-me">
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="#" className="forgot-pass">Forgot password?</a>
                        </div>

                        <button type="submit" className="btn-primary">Login</button>

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
                            <div className="password-input-wrapper">
                                <input
                                    type={showSignupPassword ? "text" : "password"}
                                    name="password"
                                    value={signupData.password}
                                    onChange={handleSignupChange}
                                    required
                                    placeholder="Create a password"
                                />
                                <span
                                    className="password-toggle-icon"
                                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                                >
                                    {showSignupPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Confirm Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={signupData.confirmPassword}
                                    onChange={handleSignupChange}
                                    required
                                    placeholder="Confirm your password"
                                />
                                <span
                                    className="password-toggle-icon"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </span>
                            </div>
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
