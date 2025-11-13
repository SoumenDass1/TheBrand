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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
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
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Shop Now
            <span className="btn-arrow">→</span>
          </button>

          <div className="features">
            <div className="feature-card">
              <div className="feature-icon feature-icon-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="feature-title">Verified Sellers</h3>
              <p className="feature-desc">All companies are verified and trusted</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-icon-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="feature-title">Best Prices</h3>
              <p className="feature-desc">No middleman means better deals</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-icon-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3 className="feature-title">Fast Delivery</h3>
              <p className="feature-desc">Quick shipping directly to you</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
