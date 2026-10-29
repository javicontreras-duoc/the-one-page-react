import React from 'react'; 
import ProductGrid from '../../components/store/ProductGrid';

export const Offers = ({ products = [], showToast }) => {
    const discountedProducts = products.map((p) => ({
        ...p, 
        precio: Math.round(p.precio * 0.8) // 20% de descuento
    }));

    return (
        <div className="container py-4">
            <div className="bg-danger text-white p-4 rounded-3 mb-4 border-start border-warning border-5">
                <h1 className="fw-extrabold text-warning mb-1">🔥 Promociones y Ofertas Especiales</h1>
                <p className="text-white mb-0 small">!Aprovecha hasta un 20% de descuento en tomos seleccionados esta semana!</p>
            </div>

            <ProductGrid products={discountedProducts} showToast={showToast}></ProductGrid>
        </div>
    );
};

export default Offers;