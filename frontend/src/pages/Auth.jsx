import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Auth() {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log('Login:', loginData);
        // TODO: API call
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        if (signupData.password !== signupData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Signup:', signupData);
        // TODO: API call
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
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="input-field">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-extras">
                                <label className="checkbox-label">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>

                            <button type="submit" className="auth-submit-btn">Sign In</button>
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
                                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="input-field">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={signupData.email}
                                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="input-field">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={signupData.password}
                                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="input-field">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={signupData.confirmPassword}
                                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>

                            <button type="submit" className="auth-submit-btn">Create Account</button>
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
