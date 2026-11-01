import React, { useState } from 'react'; 
import Sidebar from '../../components/admin/Sidebar';
import { db, collection, addDoc, doc, updateDoc, deleteDoc } from '../../services/firebase';

export const AdminProducts = ({ products = [], setProducts, showToast }) => {
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({ 
        codigo: '', 
        nombre: '', 
        categoria: 'Shonen', 
        precio: '', 
        stock: '', 
        autor: '', 
        editorial: '',
        descripcion: '', 
        imagen: '' 
    });

    const formatCLP = (amount) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                codigo: product.codigo || '', 
                nombre: product.nombre || '', 
                categoria: product.categoria || 'Shonen', 
                precio: product.precio || '', 
                stock: product.stock ?? '', 
                autor: product.autor || '', 
                editorial: product.editorial || '', 
                descripcion: product.descripcion || '', 
                imagen: product.imagen || ''
            });
        } else {
            setEditingProduct(null);
            setFormData({ 
                codigo: `MNG-${Math.floor(100 + Math.random() * 900)}`, 
                nombre: '', 
                categoria: 'Shonen', 
                precio: '', 
                stock: '', 
                autor: '', 
                editorial: '',
                descripcion: '', 
                imagen: '' 
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProduct(null);
    };

    const handleDelete = async (id) => {
        const confirmar = window.confirm(`¿Estás seguro de eliminar "${nombre}" del catálogo?`);
        if (!confirmar) return;

        try {
            await deleteDoc(doc(db, 'productos', id));

            setProducts((prev) => prev.filter((p) => p.id !== id));

            if (showToast) showToast('Manga eliminado de la base de datos', 'warning');
        } catch (error) {
            console.error('Error al eliminar en Firebase:', error);
            if (showToast) showToast('Error al eliminar el producto', 'error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nombre.trim() || !formData.precio || formData.stock === '') {
            if (showToast) showToast('Por favor completa todos los campos requeridos (*)', 'error');
            return;
        }

        setLoading(true);

        const payload = {
            codigo: formData.codigo.trim(), 
            nombre: formData.nombre.trim(), 
            categoria: formData.categoria, 
            precio: Number(formData.precio), 
            stock: Number(formData.stock), 
            autor: formData.autor.trim(), 
            editorial: formData.editorial.trim(), 
            descripcion: formData.descripcion.trim(), 
            imagen: formData.imagen.trim() || 'https://img.icons8.com/m_rounded/1200/no-image.jpg', 
            fechaActualizacion: new Date().toISOString()
        };

        try {
            if (editingProduct) {
                const productRef = doc(db, 'productos', editingProduct.id);
                await updateDoc(productRef, payload);

                setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? {
                    ...payload, id: editingProduct.id
                } : p)));

                if (showToast) showToast('¡Manga actualizado correctamente!', 'success');
            } else {
                const docRef = await addDoc(collection(db, 'productos'), payload);

                const nuevoProducto = {...payload, id: docRef.id};
                setProducts((prev) => [nuevoProducto, ...prev]);

                if (showToast) showToast('¡Nuevo manga guardado en Firebase!', 'success');
            }

            handleCloseModal();
        } catch (error) {
            console.error('Error al guardar en Firebase:', error);
            if (showToast) showToast('Error al conectar con la base de datos', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <main className="flex-grow-1 p-4 bg-light min-vh-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div> 
                        <h1>
                            📚 Gestor de Inventario de Mangas
                        </h1> 
                        <p>
                            Administra el catálogo sincronizado en tiempo real con Firebase Firestore
                        </p> 
                    </div>
                    <button onClick={() => handleOpenModal()} className="btn btn-warning fw-bold rounded-pill px-4 shadow-sm">
                        + Agregar Nuevo Manga
                    </button>
                </div>

                {/* Tabla de Productos */}
                <div className="card border-0 shadow-sm bg-white p-4">
                    <div className="table-responsive">
                        <table className="table align-middle table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Portada</th>
                                    <th>Código</th>
                                    <th>Título</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th className="text-center">Stock</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((p) => (
                                        <tr>
                                            <td>
                                                <img
                                                    src={p.imagen || 'https://via.placeholder.com/50'}
                                                    alt={p.nombre}
                                                    style={{ width: '45px', height: '65px', objectFit: 'cover' }}
                                                    className="rounded border"
                                                />
                                            </td>
                                            <td className="fw-bold">
                                                {p.codigo || 'S/C'}
                                            </td>
                                            <td>
                                                <strong className="d-block text-dark">
                                                    {p.nombre}
                                                </strong>
                                                <small className="text-muted">
                                                    {p.autor || 'Autor no especificado'}
                                                </small>
                                            </td>
                                            <td>
                                                <span className="badge bg-secondary">
                                                    {p.categoria}
                                                </span>
                                            </td>
                                            <td className="fw-semibold">
                                                {formatCLP(p.precio)}
                                            </td>
                                            <td className="text-center">
                                                <span className={`badge ${ (p.stock ?? 0) <= 5 ? 'bg-danger' : 'bg-success' } px-3 py-1 rounded-pill`}>
                                                    {p.stock ?? 0} un.
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <button 
                                                    onClick={() => handleOpenModal(p)} 
                                                    className="btn btn-sm btn-outline-dark me-2" 
                                                    title="Editar producto"
                                                >
                                                    ✏️ Editar
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(p.id, p.nombre)} 
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Eliminar producto"
                                                >
                                                    🗑️ Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-5 text-muted">
                                            No hay mangas registrados en Firebase. Haz clic en <strong>"+ Agregar Nuevo Manga"</strong> para ingresar el primero.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal Crear / Editar */}
                {showModal && (
                    <div className="modal show d-block bg-dark bg-opacity-50" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content border-0 shadow-lg">
                                <div className="modal-header bg-dark text-white border-bottom border-warning border-3">
                                    <h5 className="modal-title fw-bold text-warning">
                                        {editingProduct ? '✏️ Editar Manga' : '➕ Registrar Nuevo Manga'}
                                    </h5>
                                    <button 
                                        type="button" 
                                        className="btn-close btn-close-white" 
                                        onClick={handleCloseModal}
                                    ></button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body p-4">
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <label className="form-label fw-semibold">
                                                    Código (*)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={formData.codigo}
                                                    onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-8">
                                                <label className="form-label fw-semibold">
                                                    Título del Manga (*)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Ej. Chainsaw Man Vol. 01"
                                                    value={formData.nombre}
                                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label fw-semibold">
                                                    Categoría / Demografía (*)
                                                </label>
                                                <select
                                                    className="form-select"
                                                    value={formData.categoria}
                                                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                                                >
                                                    <option value="Shonen">Shonen</option>
                                                    <option value="Seinen">Seinen</option>
                                                    <option value="Shojo">Shojo</option>
                                                    <option value="Josei">Josei</option>
                                                </select>
                                            </div>

                                            <div className="col-md-4">
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
                                                    min = '0'
                                                />
                                            </div>

                                            <div className="col-md-4">
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
                                                    min = '0'
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Autor / Mangaka (*)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Ej. Tatsuki Fujimoto"
                                                    value={formData.autor}
                                                    onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Editorial (*)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Ej. Panini Manga / IVREA"
                                                    value={formData.editorial}
                                                    onChange={(e) => setFormData({ ...formData, editorial: e.target.value })}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label fw-semibold">
                                                    URL de la Portada (Imagen)
                                                </label>
                                                <input
                                                    type="url"
                                                    className="form-control"
                                                    placeholder="https://..."
                                                    value={formData.imagen}
                                                    onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label fw-semibold">
                                                    Sinopsis / Descripción
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    rows="3"
                                                    placeholder="Breve reseña del tomo..."
                                                    value={formData.descripcion}
                                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer bg-light">
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm rounded-pill px-3"
                                            onClick={handleCloseModal}
                                            disabled={loading}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-warning btn-sm rounded-pill fw-bold px-4 text-dark"
                                            disabled={loading}
                                        >
                                            {loading ? 'Guardando en Firebase...' : editingProduct ? 'Actualizar Manga' : 'Crear Manga'}
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