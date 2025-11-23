import React, { useState, useEffect } from 'react';
import '../styles/Slider.css';

const Slider = ({ colors }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [colors.length]);

    return (
        <div className="slider-container">
            <div className="slider-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="slide"
                        style={{ backgroundColor: color }}
                    >
                    </div>
                ))}
            </div>

            <div className="slider-content">
                <h2>THE FUTURE OF FASHION</h2>
                <p>Discover the new collection.</p>
            </div>

            <div className="slider-indicators">
                {colors.map((_, index) => (
                    <span
                        key={index}
                        className={`indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Slider;
