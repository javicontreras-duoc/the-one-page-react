import React from 'react';
import { useCart } from '../../context/CartContext';

export const CartItem = ({ item }) => {
    const { updateQuantity } = useCart();
    const { removeFromCart } = useCart();

    // Formateador de moneda CLP
    const formatCLP = (amount) => new Intl.NumberFormat('es-CL', { 
        style: 'currency', 
        currency: 'CLP' 
    }).format(amount);

    const handleDelete = () => {
        removeFromCart(item.id);
    };

    return (
        <tr>
            {/* Imagen compacta manteniendo la proporción del catálogo */}
            <td className="align-middle text-center" style={{ width: '90px' }}>
                <img
                src={item.imagen || '[suspicious link removed]'}
                alt={item.nombre}
                className="img-thumbnail bg-light p-1"
                style={{ width: '75px', height: '110px', objectFit: 'contain' }}
                />
            </td>

            {/* Título y Categoría */}
            <td className="align-middle">
                <h6 className="fw-bold mb-1 text-dark">{item.nombre}</h6>
                <span className="badge bg-secondary bg-opacity-10 text-dark fw-normal">
                {item.categoria}
                </span>
            </td>

            {/* Precio Unitario */}
            <td className="align-middle fw-semibold text-nowrap">
                {formatCLP(item.precio)}
            </td>

            {/* Selector de Cantidad (+ / -) */}
            <td className="align-middle">
                <div className="input-group input-group-sm mx-auto" style={{ maxWidth: '120px' }}>
                <button
                    className="btn btn-outline-dark"
                    onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                >
                    -
                </button>
                <input
                    type="text"
                    className="form-control text-center fw-bold bg-white"
                    value={item.cantidad}
                    readOnly
                />
                <button
                    className="btn btn-outline-dark"
                    onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                >
                    +
                </button>
                </div>
            </td>

            {/* Subtotal del Producto */}
            <td className="align-middle fw-bold text-dark text-nowrap">
                {formatCLP(item.precio * item.cantidad)}
            </td>

            {/* Botón Eliminar */}
            <td className="align-middle text-center">
                <button
                    type="button"
                    onClick={handleDelete}
                    className="btn btn-outline-danger btn-sm rounded-circle p-2"
                    title="Eliminar producto"
                >
                🗑️
                </button>
            </td>
        </tr>
    );
};

export default CartItem;