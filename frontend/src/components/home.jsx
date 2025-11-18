import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <div className="brand-logo">
            <div className="logo-icon">
            </div>
            <h1 className="brand-title">TheBrand</h1>
          </div>
          <div className="header-buttons">
            <button className="btn btn-login" onClick={() => navigate("/login")}>Login</button>
            <button className="btn btn-signup" onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="bg-decoration bg-decoration-1"></div>
        <div className="bg-decoration bg-decoration-2"></div>
        
        <div className="text-section">
          <div className="badge">
            <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            <span className="badge-text">Direct from Manufacturers</span>
          </div>

          <h2 className="headline">
            Welcome to
            <span className="headline-brand">TheBrand</span>
          </h2>

          <p className="tagline">
            Shop directly from verified companies — no middleman, no hassle, just authentic products at the best prices.
          </p>

          <button className="btn btn-primary" onClick={() => navigate("/login")}>
            Shop Now
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </main>
    </div>
  );
}
