import React from 'react'; 
import ProductGrid from '../../components/store/ProductGrid';

export const Products = ({ products = [], showToast }) => {
    return (
        <div className="container py-4">
            {/* Encabezado del Catálogo */}
            <div className="bg-dark text-white p-4 rounded-3 mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2 border-start border-warning border-5">
                <div>
                    <h1 className="fw-extrabold text-warning mb-1">📚 Catálogo de Mangas</h1>
                    <p className="text-light mb-0 small">
                        Filtra por categoría o busca tu serie preferida por título o código.
                    </p>
                </div>
                <span className="badge bg-warning text-dark fs-6 px-3 py-2 rounded-pill fw-bold">
                    {products.length} Tomos Disponibles
                </span>
            </div>

            {/* Grilla con Filtros y Buscador */}
            <ProductGrid products={products} showToast={showToast} />
        </div>
    );
};

export default Products;