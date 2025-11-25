import './CategorySlider.css';

function CategorySlider({ categories, onSelectCategory }) {
    // Duplicate categories to create seamless loop
    const sliderItems = [...categories, ...categories];

    return (
        <div className="category-slider-container">
            <div className="slider-track">
                {sliderItems.map((category, index) => (
                    <div key={`${category.id}-${index}`} className="category-card">
                        <div className="category-image">
                            <img src={category.image} alt={category.name} />
                            <div className="category-overlay">
                                <button
                                    className="btn-view-more"
                                    onClick={() => onSelectCategory(category.id)}
                                >
                                    View More
                                </button>
                            </div>
                        </div>
                        <h3 className="category-name">{category.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategorySlider;
