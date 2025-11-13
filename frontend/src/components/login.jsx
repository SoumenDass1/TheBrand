import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

function Login() {
    return (
        <div>
            <div className="login-page">
                <div className="login-box">
                    <h2>Login</h2>
                    <form>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="Enter your email" required />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" placeholder="Enter your password" required />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>

                    <p className="redirect">
                        Don’t have an account? <a href="/signup">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
