import React, { useState } from 'react';
import ProductCard from './ProductCard';

export const ProductGrid = ({ products =[], showToast }) => {
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [searchQuery, setSearchQuery] = useState('');

    // Categorías disponibles en la tienda
    const categories = ['Todas', 'Shonen', 'Seinen', 'Shojo', 'Josei'];

    // Filtrado dinámico por categoría y por texto de búsqueda
    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === 'Todas' || product.categoria === selectedCategory;
        const matchesSearch = 
            product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.codigo && product.codigo.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    return (
        <section className="catalog-section">
            {/* 1. Barra de Búsqueda y Filtros de Categoría */}
            <div className="row mb-4 align-items-center g-3">
                {/* Campo de Búsqueda */}
                <div className="col-12 col-md-5">
                <div className="input-group">
                    <span className="input-group-text bg-dark text-warning border-dark">🔍</span>
                    <input
                    type="text"
                    className="form-control border-dark"
                    placeholder="Buscar manga por nombre o código..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                </div>

                {/* Filtros de Categoría (Píldoras) */}
                <div className="col-12 col-md-7 d-flex flex-wrap gap-2 justify-content-md-end">
                {categories.map((cat) => (
                    <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`btn btn-sm rounded-pill px-3 fw-bold transition-all ${
                        selectedCategory === cat
                        ? 'btn-warning text-dark shadow-sm'
                        : 'btn-outline-dark'
                    }`}
                    >
                    {cat}
                    </button>
                ))}
                </div>
            </div>

            {/* 2. Grilla de Tarjetas de Productos */}
            {filteredProducts.length > 0 ? (
                <div className="row">
                {filteredProducts.map((product) => (
                    <ProductCard
                    key={product.id}
                    product={product}
                    showToast={showToast}
                    />
                ))}
                </div>
            ) : (
                /* Estado Vacío cuando no hay coincidencias */
                <div className="text-center py-5 bg-white rounded-3 shadow-sm border my-3">
                <div className="fs-1 mb-2">📚</div>
                <h4 className="fw-bold text-dark">No se encontraron mangas</h4>
                <p className="text-muted mb-3">
                    Intenta cambiar el término de búsqueda o selecciona otra categoría.
                </p>
                <button
                    onClick={() => {
                    setSelectedCategory('Todas');
                    setSearchQuery('');
                    }}
                    className="btn btn-warning btn-sm fw-bold rounded-pill px-4"
                >
                    Restablecer Filtros
                </button>
                </div>
            )}
        </section>
    );
};

export default ProductGrid;