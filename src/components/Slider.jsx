import React, { useState, useEffect } from 'react';
import '../styles/Slider.css';

const Slider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 1000); // Change every 1 second

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="slider-container">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`slide ${index === currentIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                >
                    <div className="slide-overlay"></div>
                </div>
            ))}

            <div className="slider-content">
                <h2>THE FUTURE OF FASHION</h2>
                <p>Discover the new collection.</p>
            </div>

            <div className="slider-indicators">
                {images.map((_, index) => (
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
