import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

export const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Recuperamos la orden enviada desde el Checkout
    const order = location.state?.order;

    const formatCLP = (amount) =>
        new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);

    // Si se intenta ingresar directamente a /exito sin haber comprado, redirigir o mostrar aviso
    if (!order) {
        return (
            <div className="container py-5 text-center">
                <div className="card shadow-sm p-5 border-0 max-w-600 mx-auto bg-white">
                <div className="fs-1 mb-2">⚠️</div>
                <h3 className="fw-bold text-dark">No hay ningún comprobante activo</h3>
                <p className="text-muted mb-4">
                    No encontramos información de una orden reciente. Explora nuestra tienda para realizar una compra.
                </p>
                <Link to="/productos" className="btn btn-warning rounded-pill fw-bold px-4">
                    Ir al Catálogo de Mangas
                </Link>
                </div>
            </div>
        );
    }

    return (
    <div className="container py-4">
      <div className="max-w-800 mx-auto">
        
        {/* 1. Encabezado de Confirmación */}
        <div className="card shadow-sm border-0 p-4 mb-4 text-center bg-white border-top border-success border-4">
            <div className="fs-1 text-success mb-2">🎉 ✅</div>
            <h1 className="fw-extrabold text-dark mb-1">¡Gracias por tu compra!</h1>
            <p className="text-muted fs-5 mb-3">
                Hemos recibido tu pedido correctamente y ya estamos preparando tus mangas.
            </p>
            <div>
                <span className="badge bg-dark text-warning fs-6 px-3 py-2 rounded-pill fw-bold">
                    N° de Orden: {order.numeroOrden}
                </span>
            </div>
        </div>

        {/* 2. Resumen Detallado de la Orden (Boleta) */}
        <div className="card shadow-sm border-0 p-4 mb-4 bg-white" id="receipt-card">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                <h4 className="fw-bold text-dark mb-0">Resumen del Pedido</h4>
                <span className="text-muted fw-semibold">Fecha: {order.fecha}</span>
            </div>

            {/* Datos del Cliente y Envío */}
            <div className="row g-3 mb-4 bg-light p-3 rounded-3 mx-0">
                <div className="col-12 col-md-6">
                    <strong className="d-block text-dark small text-uppercase">Comprador:</strong>
                    <span className="text-dark fw-semibold">{order.cliente}</span>
                    <small className="d-block text-muted">RUT: {order.rut}</small>
                    <small className="d-block text-muted">Email: {order.email}</small>
                </div>
                <div className="col-12 col-md-6">
                    <strong className="d-block text-dark small text-uppercase">Dirección de Despacho:</strong>
                    <span className="text-dark fw-semibold">{order.despacho}</span>
                    <small className="d-block text-muted">Método de Pago: {order.metodoPago}</small>
                </div>
            </div>

            {/* Tabla de Productos Comprados */}
            <h5 className="fw-bold text-dark mb-3">Productos Incluidos</h5>
            <div className="table-responsive mb-3">
                <table className="table align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Portada</th>
                            <th scope="col">Manga</th>
                            <th scope="col" className="text-center">Precio Unit.</th>
                            <th scope="col" className="text-center">Cantidad</th>
                            <th scope="col" className="text-end">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item) => (
                            <tr key={item.id}>
                                <td style={{ width: '60px' }}>
                                    <img
                                    src={item.imagen || 'https://via.placeholder.com/50'}
                                    alt={item.nombre}
                                    style={{ width: '45px', height: '65px', objectFit: 'contain' }}
                                    className="rounded bg-light border"
                                    />
                                </td>
                                <td className="fw-bold text-dark">{item.nombre}</td>
                                <td className="text-center">{formatCLP(item.precio)}</td>
                                <td className="text-center fw-bold">{item.cantidad} un.</td>
                                <td className="text-end fw-bold">{formatCLP(item.precio * item.cantidad)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Total Pagado */}
            <div className="d-flex justify-content-between align-items-center bg-dark text-white p-3 rounded-3">
                <span className="fs-5 fw-bold">Total Pagado:</span>
                <span className="fs-3 fw-extrabold text-warning">{formatCLP(order.total)}</span>
            </div>
        </div>

        {/* 3. Acciones Finales (Imprimir o Volver) */}
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button
                onClick={() => window.print()}
                className="btn btn-outline-dark fw-bold rounded-pill px-4"
            >
                🖨️ Imprimir / Guardar Comprobante
            </button>
            
            <Link to="/productos" className="btn btn-warning fw-bold text-dark rounded-pill px-4">
                🛒 Volver a la Tienda
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;