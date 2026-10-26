import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/store/CartItem';
import ConfirmModal from '../../components/common/ConfirmModal';

export const Cart = ({ showToast }) => {
    const { cart, clearCart, removeFromCart, getCartTotal } = useCart();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const formatCLP = (amount) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);

    // Apertura del modal de confirmación
    const handleAskDelete = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // Confirmar eliminación en el modal
    const handleConfirmDelete = () => {
        if (selectedProduct) {
            removeFromCart(selectedProduct.id);
            if (showToast) {
                showToast(`"${selectedProduct.nombre}" fue eliminado del carrito`, 'warning');
            }
            setSelectedProduct(null);
            setShowModal(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container py-5 text-center">
        <div className="card shadow-sm p-5 max-w-600 mx-auto border-0">
          <div className="fs-1 mb-3">🛒</div>
          <h2 className="fw-bold text-dark mb-2">Tu carrito está vacío</h2>
          <p className="text-muted mb-4">
            Explora nuestro catálogo y descubre los mejores tomos de manga.
          </p>
          <div>
            <Link to="/productos" className="btn btn-warning btn-lg rounded-pill fw-bold px-4">
              Ver Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="fw-extrabold text-dark mb-4">🛒 Carrito de Compras</h1>

      <div className="row g-4">
        {/* Tabla de Productos (8 Columnas) */}
        <div className="col-12 col-lg-8">
          <div className="table-responsive bg-white rounded-3 shadow-sm border p-3">
            <table className="table align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Portada</th>
                  <th scope="col">Manga</th>
                  <th scope="col">Precio</th>
                  <th scope="col" className="text-center">Cantidad</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col" className="text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} onAskDelete={handleAskDelete} />
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center pt-3 border-top">
              <button onClick={clearCart} className="btn btn-outline-secondary btn-sm fw-semibold">
                Vaciar Carrito
              </button>
              <Link to="/productos" className="btn btn-link text-dark fw-semibold text-decoration-none">
                &larr; Continuar Comprando
              </Link>
            </div>
          </div>
        </div>

        {/* Resumen de Compra (4 Columnas) */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0 bg-white p-4 sticky-top" style={{ top: '90px' }}>
            <h4 className="fw-bold border-bottom pb-3 mb-3 text-dark">Resumen del Pedido</h4>

            <div className="d-flex justify-content-between mb-2 text-muted">
              <span>Subtotal Productos:</span>
              <span className="fw-semibold text-dark">{formatCLP(getCartTotal())}</span>
            </div>

            <div className="d-flex justify-content-between mb-3 text-muted">
              <span>Envío (Chile continental):</span>
              <span className="text-success fw-bold">GRATIS</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4 fs-4 fw-extrabold text-dark">
              <span>Total:</span>
              <span className="text-warning bg-dark px-2 rounded">{formatCLP(getCartTotal())}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-warning btn-lg w-100 rounded-pill fw-bold text-dark shadow-sm"
            >
              Proceder al Pago &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      {showModal && (
        <ConfirmModal
          title="¿Eliminar Manga?"
          message={`¿Estás seguro de que deseas quitar "${selectedProduct?.nombre}" del carrito?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Cart;