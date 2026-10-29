import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export const ProductCard = ({ product, showToast }) => {
    const { addToCart } = useCart();

    // Handler para agregar el producto al carrito y lanzar la notificación Toast opcional
    const handleAddToCart = () => {
        addToCart(product, 1);
        if (showToast) {
            showToast(`¡"${product.nombre}" fue añadido al carrito!`, 'success');
        }
    };

    // Formato de precio en CLP
    const precioFormateado = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(product.precio);

    return (
        <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-1 text-center product-card bg-white position-relative overflow-hidden">
                {/* Imagen de la Portada (Altura compacta de 160px) */}
                <Link to={`/producto/${product.id}`} className="pt-3 px-3 d-block text-decoration-none">
                    <img 
                        src={product.imagen || '[suspicious link removed]'} 
                        alt={product.nombre} 
                        className="card-img-top mx-auto img-fluid"
                        style={{ height: '160px', objectFit: 'contain' }} 
                    />
                </Link>

                {/* Cuerpo de la Tarjeta */}
                <div className="card-body d-flex flex-column justify-content-between p-3">
                <div>
                    {/* Insignia de Categoría (Shonen, Seinen, Shojo, etc.) */}
                    <span className="badge bg-success bg-opacity-10 text-success fw-bold text-uppercase mb-2 px-2 py-1 rounded-pill">
                    {product.categoria}
                    </span>

                    {/* Título / Nombre del Manga */}
                    <h3 className="card-title fs-6 fw-bold mb-2">
                    <Link to={`/producto/${product.id}`} className="text-dark text-decoration-none">
                        {product.nombre}
                    </Link>
                    </h3>
                </div>

                <div>
                    {/* Precio en Pesos Chilenos */}
                    <p className="card-text fs-5 fw-extrabold text-dark mb-3">
                    {precioFormateado}
                    </p>

                    {/* Botón de Añadir al Carrito estilo Banana Manga Store */}
                    <button
                    onClick={handleAddToCart}
                    className="btn btn-warning w-100 fw-bold rounded-pill text-dark btn-sm shadow-sm hover-amber"
                    >
                    🛒 Añadir al carrito
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;