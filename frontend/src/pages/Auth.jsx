import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Auth.css';

function Auth() {
    const navigate = useNavigate();
    const { login } = useApp();
    const [isSignup, setIsSignup] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showSignupPassword, setShowSignupPassword] = useState(false);
    const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);

    const toggleLoginPassword = () => setShowLoginPassword(!showLoginPassword);
    const toggleSignupPassword = () => setShowSignupPassword(!showSignupPassword);
    const toggleSignupConfirmPassword = () => setShowSignupConfirmPassword(!showSignupConfirmPassword);

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

    const [loginErrors, setLoginErrors] = useState({});
    const [signupErrors, setSignupErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!loginData.email) {
            errors.email = 'Email is required';
        } else if (!validateEmail(loginData.email)) {
            errors.email = 'Please enter a valid email';
        }

        if (!loginData.password) {
            errors.password = 'Password is required';
        } else if (!validatePassword(loginData.password)) {
            errors.password = 'Password must be at least 6 characters';
        }

        setLoginErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                login({ name: 'User', email: loginData.email });
                setIsLoading(false);
                navigate('/');
            }, 1000);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!signupData.name || signupData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        if (!signupData.email) {
            errors.email = 'Email is required';
        } else if (!validateEmail(signupData.email)) {
            errors.email = 'Please enter a valid email';
        }

        if (!signupData.password) {
            errors.password = 'Password is required';
        } else if (!validatePassword(signupData.password)) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (!signupData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (signupData.password !== signupData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setSignupErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                login({ name: signupData.name, email: signupData.email });
                setIsLoading(false);
                navigate('/');
            }, 1000);
        }
    };

    return (
        <div className="auth-container">
            <div className={`auth-split-screen ${isSignup ? 'signup-active' : ''}`}>

                {/* Left Panel - Login Form (always visible on left) */}
                <div className="auth-left-panel">
                    <div className="auth-form-content">
                        <h1>Welcome Back</h1>
                        <p className="auth-subtitle">Sign in to continue your style journey</p>

                        <form onSubmit={handleLoginSubmit} className="auth-form">
                            <div className="input-field">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={loginData.email}
                                    onChange={(e) => {
                                        setLoginData({ ...loginData, email: e.target.value });
                                        if (loginErrors.email) setLoginErrors({ ...loginErrors, email: '' });
                                    }}
                                    className={loginErrors.email ? 'error' : ''}
                                />
                                {loginErrors.email && <span className="error-message">{loginErrors.email}</span>}
                            </div>

                            <div className="input-field password-field">
                                <input
                                    type={showLoginPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={loginData.password}
                                    onChange={(e) => {
                                        setLoginData({ ...loginData, password: e.target.value });
                                        if (loginErrors.password) setLoginErrors({ ...loginErrors, password: '' });
                                    }}
                                    className={loginErrors.password ? 'error' : ''}
                                />
                                <button type="button" className="password-toggle-btn" onClick={toggleLoginPassword}>
                                    {showLoginPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                                {loginErrors.password && <span className="error-message">{loginErrors.password}</span>}
                            </div>

                            <div className="form-extras">
                                <label className="checkbox-label">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="spinner-small"></span>
                                        Signing In...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        <p className="auth-switch">
                            Don't have an account?
                            <button onClick={() => setIsSignup(true)} className="auth-switch-btn">
                                Sign up for free
                            </button>
                        </p>
                    </div>
                </div>

                {/* Right Panel - Signup Form (revealed when image slides left) */}
                <div className="auth-right-panel-form">
                    <div className="auth-form-content">
                        <h1>Create Account</h1>
                        <p className="auth-subtitle">Join TheBrand and discover premium fashion</p>

                        <form onSubmit={handleSignupSubmit} className="auth-form">
                            <div className="input-field">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={signupData.name}
                                    onChange={(e) => {
                                        setSignupData({ ...signupData, name: e.target.value });
                                        if (signupErrors.name) setSignupErrors({ ...signupErrors, name: '' });
                                    }}
                                    className={signupErrors.name ? 'error' : ''}
                                />
                                {signupErrors.name && <span className="error-message">{signupErrors.name}</span>}
                            </div>

                            <div className="input-field">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={signupData.email}
                                    onChange={(e) => {
                                        setSignupData({ ...signupData, email: e.target.value });
                                        if (signupErrors.email) setSignupErrors({ ...signupErrors, email: '' });
                                    }}
                                    className={signupErrors.email ? 'error' : ''}
                                />
                                {signupErrors.email && <span className="error-message">{signupErrors.email}</span>}
                            </div>

                            <div className="input-field password-field">
                                <input
                                    type={showSignupPassword ? "text" : "password"}
                                    placeholder="Password (min. 6 characters)"
                                    value={signupData.password}
                                    onChange={(e) => {
                                        setSignupData({ ...signupData, password: e.target.value });
                                        if (signupErrors.password) setSignupErrors({ ...signupErrors, password: '' });
                                    }}
                                    className={signupErrors.password ? 'error' : ''}
                                />
                                <button type="button" className="password-toggle-btn" onClick={toggleSignupPassword}>
                                    {showSignupPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                                {signupErrors.password && <span className="error-message">{signupErrors.password}</span>}
                            </div>

                            <div className="input-field password-field">
                                <input
                                    type={showSignupConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    value={signupData.confirmPassword}
                                    onChange={(e) => {
                                        setSignupData({ ...signupData, confirmPassword: e.target.value });
                                        if (signupErrors.confirmPassword) setSignupErrors({ ...signupErrors, confirmPassword: '' });
                                    }}
                                    className={signupErrors.confirmPassword ? 'error' : ''}
                                />
                                <button type="button" className="password-toggle-btn" onClick={toggleSignupConfirmPassword}>
                                    {showSignupConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                                {signupErrors.confirmPassword && <span className="error-message">{signupErrors.confirmPassword}</span>}
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="spinner-small"></span>
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>

                        <p className="auth-switch">
                            Already have an account?
                            <button onClick={() => setIsSignup(false)} className="auth-switch-btn">
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>

                {/* Image Panel - Slides on top */}
                <div className="auth-right-panel">
                    <div className="auth-image-overlay"></div>
                </div>

            </div>
        </div>
    );
}

export default Auth;
