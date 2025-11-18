import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Login failed");
                return;
            }

            // Save token + user data
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login successful!");
            navigate("/"); // redirect to home

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">

                <form onSubmit={handleLogin}>
                    <div className="login-header">
                        <h2>Welcome Back to TheBrand</h2>
                        <p>Please login to your account</p>
                    </div>

                    <div className="login-form">
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button className="login-button" type="submit">
                            Login
                        </button>
                    </div>

                    <div className="signup-link">
                        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    </div>

                </form>

            </div>
        </div>
    );
}
