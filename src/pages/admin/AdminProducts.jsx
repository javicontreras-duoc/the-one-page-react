import React, { useState } from 'react'; 
import Sidebar from '../../components/admin/Sidebar';

export const AdminProducts = ({ products = [], setProducts, showToast }) => {
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [formData, setFormData] = useState({ 
        codigo: '', 
        nombre: '', 
        categoria: 'Shonen', 
        precio: '', 
        stock: '', 
        descripcion: '', 
        imagen: '' 
    });

    const formatCLP = (amount) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({ ...product });
        } else {
            setEditingProduct(null);
            setFormData({ 
                codigo: `MNG-${Math.floor(100 + Math.random() * 900)}`, 
                nombre: '', 
                categoria: 'Shonen', 
                precio: '', 
                stock: '', 
                descripcion: '', 
                imagen: '' 
            });
        }
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este manga del inventario?')) {
            setProducts(products.filter((p) => p.id !== id));
            if (showToast) showToast('Manga eliminado del sistema', 'warning');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nombre.trim() || !formData.precio || !formData.stock) {
            if (showToast) showToast('Por favor completa los campos requeridos', 'error');
            return;
        }

        if (editingProduct) {
            setProducts(products.map((p) => (p.id === editingProduct.id ? {
                ...formData, id: p.id, precio: Number(formData.precio), stock: Number(formData.stock)
            } : p)));
            if (showToast) showToast('Manga actualizado exitosamente', 'success');
        } else {
            const newProduct = {
                ...formData,
                id: Date.now(),
                precio: Number(formData.precio),
                stock: Number(formData.stock)
            };
            setProducts([...products, newProduct]);
            if (showToast) showToast('Nuevo manga registrado en inventario', 'success');
        }

        setShowModal(false);
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <main className="flex-grow-1 p-4 bg-light min-vh-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fw-extrabold text-dark mb-0">
                        📚 Mantenedor de Productos
                    </h1>
                    <button onClick={() => handleOpenModal()} className="btn btn-warning fw-bold rounded-pill px-4 shadow-sm">
                        + Agregar Nuevo Manga
                    </button>
                </div>

                {/* Tabla de Productos */}
                <div className="card border-0 shadow-sm bg-white p-4">
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Código</th>
                                    <th>Manga</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th className="text-center">Stock</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.id}>
                                        <td className="fw-bold">{p.codigo || `MNG-${p.id}`}</td>
                                        <td className="fw-bold text-dark">{p.nombre}</td>
                                        <td><span className="badge bg-secondary">{p.categoria}</span></td>
                                        <td>{formatCLP(p.precio)}</td>
                                        <td className="text-center">
                                            <span className={`badge ${ (p.stock ?? 10) <= 5 ? 'bg-danger' : 'bg-success' } px-3 py-1 rounded-pill`}>
                                                {p.stock ?? 10} un.
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button onClick={() => handleOpenModal(p)} className="btn btn-sm btn-outline-dark me-2">
                                                ✏️ Editar
                                            </button>
                                            <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-outline-danger">
                                                🗑️ Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal Crear / Editar */}
                {showModal && (
                    <div className="modal show d-block bg-dark bg-opacity-50" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content border-0 shadow">
                                <div className="modal-header bg-dark text-white border-bottom border-warning border-3">
                                    <h5 className="modal-title fw-bold text-warning">
                                        {editingProduct ? 'Editar Manga' : 'Nuevo Manga'}
                                    </h5>
                                    <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Nombre del Manga (*)
                                                </label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    value={formData.nombre} 
                                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} 
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Categoría (*)
                                                </label>
                                                <select className="form-select" value={formData.categoria} onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}>
                                                    <option value="Shonen">Shonen</option>
                                                    <option value="Seinen">Seinen</option>
                                                    <option value="Shojo">Shojo</option>
                                                    <option value="Josei">Josei</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Precio en CLP (*)
                                                </label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    placeholder="8990"
                                                    value={formData.precio} 
                                                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })} 
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Stock Inicial (*)
                                                </label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    placeholder="10"
                                                    value={formData.stock} 
                                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })} 
                                                    required
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-semibold">Imagen (Portada)</label>
                                                <input 
                                                    type="url" 
                                                    className="form-control" 
                                                    placeholder="https://..."
                                                    value={formData.imagen} 
                                                    onChange={(e) => setFormData({ ...formData, imagen: e.target.value })} 
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-semibold">Sinopsis / Descripción</label>
                                                <textarea className="form-control" rows="3" value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
                                            Cancelar
                                        </button>
                                        <button type="submit" className="btn btn-warning btn-sm fw-bold">
                                            Guardar Cambios
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminProducts;