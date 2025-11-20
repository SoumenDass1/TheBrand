import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-glow"></div>
            <div className="container footer-content">
                <p>&copy; {new Date().getFullYear()} TheBrand. Premium Experience.</p>
            </div>
        </footer>
    );
};

export default Footer;
