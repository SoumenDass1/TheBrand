import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const HERO_SLIDES = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        title: "Women's\nFashion",
        subtitle: "Elegant style for the modern woman.",
        eyebrow: "Women's Collection"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
        title: "Men's\nStyle",
        subtitle: "Sharp looks for the modern gentleman.",
        eyebrow: "Men's Fashion"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
        title: "Summer\nVibes",
        subtitle: "Light and breezy fashion.",
        eyebrow: "Women's Summer"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        title: "Urban\nWear",
        subtitle: "Street style for men.",
        eyebrow: "Men's Casual"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        title: "Chic\nLook",
        subtitle: "Sophisticated women's fashion.",
        eyebrow: "Women's Essentials"
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
        title: "Smart\nCasual",
        subtitle: "Refined style for everyday.",
        eyebrow: "Men's Collection"
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3",
        title: "Bold\nColors",
        subtitle: "Vibrant fashion statements.",
        eyebrow: "Women's Trending"
    },
    {
        id: 8,
        image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        title: "Denim\nDays",
        subtitle: "Classic denim reimagined.",
        eyebrow: "Men's Denim"
    },
    {
        id: 9,
        image: "https://images.unsplash.com/photo-1529139574466-a302c27e3844?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        title: "Evening\nWear",
        subtitle: "Elegant outfits for special occasions.",
        eyebrow: "Women's Evening"
    },
    {
        id: 10,
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        title: "Active\nWear",
        subtitle: "Performance meets style.",
        eyebrow: "Men's Sports"
    },
    {
        id: 11,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3",
        title: "Artistic\nFlair",
        subtitle: "Fashion as self-expression.",
        eyebrow: "Women's Limited Edition"
    }
];

function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        console.log('Total slides:', HERO_SLIDES.length); // Debug log
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero">
            {HERO_SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                >
                    <div className="hero-image">
                        <img src={slide.image} alt={slide.title} />
                    </div>
                    <div className="hero-content">
                        <span className="hero-eyebrow">{slide.eyebrow}</span>
                        <h1 className="hero-title">
                            {slide.title.split('\n').map((line, i) => (
                                <span key={i} style={{ display: 'block' }}>{line}</span>
                            ))}
                        </h1>
                        <p className="hero-subtitle">{slide.subtitle}</p>
                        <div className="hero-buttons">
                            <Link to="/products" className="btn">
                                Explore Collection
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            <div className="slider-dots">
                {HERO_SLIDES.map((_, index) => (
                    <button
                        key={index}
                        className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            <div className="scroll-indicator">
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Scroll</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    );
}

export default Hero;
