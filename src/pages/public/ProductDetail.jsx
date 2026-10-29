import React, { useState } from 'react'; 
import { useParams, Link } from 'react-router-dom'; 
import { useCart } from '../../context/CartContext';

export const ProductDetail = ({ products = [], showToast }) => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [cantidad, setCantidad] = useState(1);

    const product = products.find((p) => String(p.id) === String(id));

        const formatCLP = (amount) =>
        new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);

    if (!product) {
        return (
            <div className="container text-center">
                <div className="card shadow-sm p-5 border-0 max-w-600 mx-auto bg-white">
                    <div className="fs-1 mb-2">🔍</div>
                    <h3 className="fw-bold text-dark">Manga no encontrado</h3>
                    <p className="text-muted mb-4">
                        El tomo que buscas no existe o fue removido del catálogo.
                    </p>
                    <Link to="/productos" className="btn btn-warning rounded-pill fw-bold px-4">
                        Volver al Catálogo
                    </Link>
                </div>
            </div>
        );
    }

    const stockDisponible = product.stock ?? 10;
    const esStockCritico = stockDisponible > 0 && stockDisponible <= 5;

    const handleIncrement = () => {
        if (cantidad < stockDisponible) {
            setCantidad(cantidad + 1);
        }
    };

    const handleDecrement = () => {
        if (cantidad >1) {
            setCantidad(cantidad - 1);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, cantidad);
        if (showToast) {
            showToast(`¡Agregado(s) ${cantidad} ejemplar(es) de "${product.nombre}" al carrito!`, 'success');
        }
    };

    return (
        <div className="container">
            {/* Botón Volver */}
            <div className="mb-4">
                <Link to="/productos" className="btn btn-outline-dark btn-sm rounded-pill fw-semibold">
                    ← Volver al Catálogo
                </Link>
            </div>

            <div className="card shadow-sm border-0 bg-white p-4">
                <div className="row g-4">
                    {/* Columna Izquierda: Portada del Manga */}
                    <div className="col-12 col-md-5 text-center d-flex align-items-center justify-content-center bg-light rounded p-4">
                        <img
                            src={product.imagen || '[suspicious link removed]'}
                            alt={product.nombre}
                            className="img-fluid rounded shadow-sm"
                            style={{ maxHeight: '420px', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Columna Derecha: Detalles del Manga */}
                    <div className="col-12 col-md-7 d-flex flex-column justify-content-between">
                        <div>
                            {/* Badges de Categoría y Estado del Stock */}
                            <div className="d-flex gap-2 align-items-center mb-2 flex-wrap">
                                <span className="badge bg-warning text-dark fw-bold text-uppercase px-3 py-2 rounded-pill">
                                    {product.categoria}
                                </span>

                                {stockDisponible > 0 ? (
                                    <span className={`badge ${esStockCritico ? 'bg-danger' : 'bg-success'} text-white fw-bold px-3 py-2 rounded-pill`}>
                                        {esStockCritico ? `¡Últimas ${stockDisponible} unidades!` : `Stock: ${stockDisponible} un.`}
                                    </span>
                                ) : (
                                    <span className="badge bg-secondary text-white fw-bold px-3 py-2 rounded-pill">
                                        Agotado
                                    </span>
                                )}
                            </div>

                            {/* Título y Código */}
                            <h1 className="fw-extrabold text-dark mb-2">
                                {product.nombre}
                            </h1>
                            <p className="text-muted small mb-3">
                                Código / ISBN: <strong>{product.codigo || `MANGA-${product.id}`}</strong>
                            </p>

                            {/* Precio */}
                            <div className="fs-2 fw-extrabold text-dark mb-4">
                                {formatCLP(product.precio)}
                            </div>

                            {/* Sinopsis */}
                            <div className="mb-4">
                                <h5 className="fw-bold text-dark border-bottom pb-2 mb-2">Sinopsis</h5>
                                <p className="text-secondary lh-base">
                                    {product.descripcion ||
                                    `Edición oficial en español. Disfruta de esta increíble entrega de la saga ${product.nombre}, con excelente calidad de impresión y encuadernación.`}
                                </p>
                            </div>

                            {/* Ficha Técnica */}
                            <div className="bg-light p-3 rounded mb-4">
                                <div className="row g-2 text-dark small">
                                    <div className="col-6">
                                        <srtrong>Autor:</srtrong> {product.autor || 'Mangaka Oficial'}
                                    </div>
                                    <div className="col-6">
                                        <srtrong>Editorial:</srtrong> {product.editorial || 'IVREA / Panini'}
                                    </div>
                                    <div className="col-6">
                                        <srtrong>Idioma:</srtrong> Español
                                    </div>
                                    <div className="col-6">
                                        <srtrong>Formato:</srtrong> Tapa Blanda (Tankōbon)
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Selector de Cantidad y Botón de Compra */}
                        <div className="pt-3 border-top">
                            <div className="row g-3 align-items-center">
                                <div className="col-12 col-sm-4">
                                    <label className="form-label fw-bold text-dark small mb-1">Cantidad:</label>
                                    <div className="input-group">
                                        <button
                                            className="btn btn-outline-dark" 
                                            type="button" 
                                            onClick={handleDecrement} 
                                            disabled={cantidad <= 1 || stockDisponible <= 0}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            className="form-control text-center fw-bold bg-white"
                                            value={cantidad}
                                            readOnly
                                        />
                                        <button
                                            className="btn btn-outline-dark" 
                                            type="button" 
                                            onClick={handleIncrement} 
                                            disabled={cantidad >= stockDisponible || stockDisponible <= 0}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-8">
                                    <label className="form-label d-none d-sm-block small mb-1">
                                        &nbsp;
                                    </label>
                                    <button
                                        onClick={handleAddToCart} 
                                        disabled={stockDisponible <= 0} 
                                        className="btn btn-warning btn-lg w-100 fw-bold rounded-pill text-dark shadow-sm hover-amber"
                                    >
                                        🛒 Añadir al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;