import React from 'react';

export const CategoryFilter = ({ categories = [], selectedCategory, onSelectCategory }) => {
    return (
        <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center">
            {categories.map((cat) => (
                <button
                    key={cat} 
                    onClick={() => onSelectCategory(cat)} 
                    className={`btn btn-sm rounded-pill px-3 fw-bold transition-all ${ 
                        selectedCategory === cat ? 'btn-warning text-dark shadow-sm' : 'btn-outline-dark' 
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;