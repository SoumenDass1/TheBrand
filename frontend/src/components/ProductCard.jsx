import React from 'react';
import Button from './ui/Button';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
            <div className="relative pt-[100%] bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="text-xs font-medium text-blue-600 mb-1 uppercase tracking-wide">
                    {product.category}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.name}
                </h3>
                <div className="flex items-center mb-3">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    <Button variant="primary" className="text-sm py-1.5 px-3">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
