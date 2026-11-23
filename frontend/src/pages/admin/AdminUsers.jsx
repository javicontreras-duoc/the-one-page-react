import React, { useEffect, useState } from 'react'; 
import Sidebar from '../../components/admin/Sidebar';
import ConfirmModal from '../../components/common/ConfirmModal';
import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from '../../services/firebase';

const validarEmail = (email) => { 
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
};

export const AdminUsers = ({ showToast }) => { 
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);

    const [formData, setFormData] = useState({ 
        nombre: '', 
        email: '', 
        rut: '', 
        rol: 'Cliente', 
        telefono: '',
        estado: 'Activo'
    });

    const [errors, setErrors] = useState({});

    const fetchUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'usuarios'));
            const loadedUsers = querySnapshot.docs.map((d) => ({
                id: d.id,
                ...d.data()
            }));
            setUsers(loadedUsers);
        } catch (error) {
            console.error('Error cargando usuarios de Firebase:', error);
            if (showToast) showToast('Error al conectar con la base de datos de usuarios', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        fetchUsers(); 
    }, []);

    const handleOpenModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                nombre: user.nombre || '', 
                email: user.email || '', 
                rut: user.rut || '', 
                rol: user.rol || 'Cliente', 
                telefono: user.telefono || '', 
                estado: user.estado || 'Activo'
            });
        } else {
            setEditingUser(null);
            setFormData({ 
                nombre: '', 
                email: '', 
                rut: '', 
                rol: 'Cliente', 
                telefono: '', 
                estado: 'Activo' 
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => { 
        setShowModal(false); 
        setEditingUser(null); 
    };

    const handleAskDelete = (user) => {
        setDeletingUser(user);
    };

    const handleConfirmDelete = async () => {
        if (!deletingUser) return;

        try {
            await deleteDoc(doc(db, 'usuarios', deletingUser.id));

            setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
            if (showToast) showToast('Usuario eliminado de la base de datos', 'warning');
        } catch (error) {
            console.error('Error al eliminar usuario en Firebase:', error);
            if (showToast) showToast('No se pudo eliminar el usuario', 'error');
        } finally {
            setDeletingUser(null);
        }
    }

    const validarFormulario = () => {
        const err = {};
        if (!formData.nombre.trim()) err.nombre = 'El nombre es obligatorio.';
        if (!formData.email.trim()) { 
            err.email = 'El correo es obligatorio.';
        } else if (!validarEmail(formData.email)) {
            err.email = 'Formato de correo no válido.';
        }
        if (!formData.rut.trim()) err.rut = 'El RUT es obligatorio.';
        if (!formData.telefono.trim()) err.telefono = 'El teléfono es obligatorio.';

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            if (showToast) showToast('Por favor, corrige los errores del formulario', 'error');
            return;
        }

        setSubmitting(true);

        const payload = {
            nombre: formData.nombre.trim(), 
            email: formData.email.trim().toLowerCase(), 
            rut: formData.rut.trim(),
            rol: formData.rol,
            telefono: formData.telefono.trim(),
            estado: formData.estado,
            fechaModificacion: new Date().toISOString()
        };

        try {
            if (editingUser) {
                const userRef = doc(db, 'usuarios', editingUser.id);
                await updateDoc(userRef, payload);

                setUsers((prev) => 
                    prev.map((u) => (u.id === editingUser.id ? { ...payload, id: editingUser.id } : u)) );

                if (showToast) showToast('¡Usuario actualizado en Firebase!', 'success');
            } else {
                payload.fechaCreacion = new Date().toISOString();
                const docRef = await addDoc(collection(db, 'usuarios'), payload);

                const nuevoUsuario = { ...payload, id: docRef.id };
                setUsers((prev) => [nuevoUsuario, ...prev]);

                if (showToast) showToast('¡Usuario registrado exitosamente en la nube!', 'success');
            }

            handleCloseModal();
        } catch (error) {
            console.error('Error al guardar usuario en Firestore:', error);
            if (showToast) showToast('Error al procesar la solicitud en Firebase', 'error');
        } finally { 
            setSubmitting(false); 
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <main className="flex-grow-1 p-4 bg-light min-vh-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="fw-extrabold text-dark mb-0">
                            👥 Gestión de Usuarios y Accesos
                        </h1>
                        <p className="text-muted small mb-0">
                            Control de perfiles, roles y permisos sincronizados con Firebase Firestore
                        </p>
                    </div>
                    <button 
                        onClick={() => handleOpenModal()} 
                        className="btn btn-warning fw-bold rounded-pill px-4 shadow-sm"
                    >
                        + Registrar Nuevo Usuario
                    </button>
                </div>

                <div className="card border-0 shadow-sm bg-white p-4">
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>RUT</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-muted">
                                            <div className="spinner-border spinner-border-sm text-warning me-2" role="status"></div>
                                            Cargando usuarios desde Firebase...
                                        </td>
                                    </tr>
                                ) : users.length > 0 ? (
                                    users.map((u) => (
                                        <tr key={u.id}>
                                            <td className="fw-bold text-dark">{u.nombre}</td>
                                            <td>{u.email}</td>
                                            <td><code>{u.rut}</code></td>
                                            <td>
                                                <span className={`badge ${ u.rol === 'Administrador' ? 'bg-danger' : u.rol === 'Vendedor' ? 'bg-primary' : 'bg-secondary' }`}>
                                                    {u.rol}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${ u.estado === 'Activo' ? 'bg-success' : 'bg-warning text-dark' } rounder-pill px-3`}>
                                                    {u.estado || 'Activo'}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleOpenModal(u)}
                                                    className="btn btn-sm btn-outline-dark me-2"
                                                    title="Editar usuario"
                                                >
                                                    ✏️ Editar
                                                </button>
                                                <button
                                                    onClick={() => handleAskDelete(u)}
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Eliminar usuario"
                                                >
                                                    🗑️ Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-muted">
                                            No hay usuarios registrados en la base de datos. Presiona <strong>"+ Registrar Nuevo Usuario"</strong> para crear el primero.
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
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow">
                                <div className="modal-header bg-dark text-white border-bottom border-warning border-3">
                                    <h5 className="modal-title fw-bold text-warning">
                                        {editingUser ? '✏️ Editar Perfil de Usuario' : '➕ Registrar Usuario en Firebase'}
                                    </h5>
                                    <button 
                                        type="button" 
                                        className="btn-close btn-close-white" 
                                        onClick={handleCloseModal}
                                        disabled={submitting}
                                    ></button>
                                </div>

                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="modal-body p-4">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <label className="form-label fw-semibold">
                                                    Nombre Completo (*)
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                                        value={formData.nombre}
                                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                                        required
                                                    />
                                                    {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                                                </label>
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label fw-semibold">
                                                    Correo Electrónico (*)
                                                    <input
                                                        type="email"
                                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                        value={formData.email}
                                                        placeholder="ejemplo@duoc.cl"
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        required
                                                    />
                                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                                </label>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    RUT (*)
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.rut ? 'is-invalid' : ''}`}
                                                        value={formData.rut}
                                                        placeholder="12345678-K"
                                                        onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
                                                        required
                                                    />
                                                    {errors.rut && <div className="invalid-feedback">{errors.rut}</div>}
                                                </label>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Teléfono (*)
                                                    <input
                                                        type="tel"
                                                        className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                                                        value={formData.telefono}
                                                        placeholder="+56 9 1234 5678"
                                                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                                        required
                                                    />
                                                    {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                                                </label>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Rol Asignado (*)
                                                    <select
                                                        className="form-select"
                                                        value={formData.rol}
                                                        onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                                                    >
                                                        <option value="Cliente">Cliente</option>
                                                        <option value="Vendedor">Vendedor</option>
                                                        <option value="Administrador">Administrador</option>
                                                    </select>
                                                </label>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Estado
                                                    <select
                                                        className="form-select"
                                                        value={formData.estado}
                                                        onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                                                    >
                                                        <option value="Activo">Activo</option>
                                                        <option value="Suspendido">VendeSuspendidodor</option>
                                                    </select>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer bg-light">
                                        <button 
                                            type="button" 
                                            className="btn btn-secondary btn-sm rounded-pill px-3" 
                                            onClick={handleCloseModal}
                                            disabled={submitting}
                                        >
                                            Cancelar
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="btn btn-warning btn-sm rounded-pill fw-bold px-4 text-dark"
                                            disabled={submitting}
                                        >
                                            {submitting ? 'Guardando...' : editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de Confirmación de Eliminación */}
                {deletingUser && (
                    <ConfirmModal
                        title="¿Eliminar usuario de la base de datos?"
                        message={`¿Estás seguro de que deseas eliminar permanentemente a "${deletingUser.nombre}" de la base de datos? Esta acción no se puede deshacer.`}
                        onConfirm={handleConfirmDelete}
                        onCancel={() => setDeletingUser(null)}
                    />
                )}
            </main>
        </div>
    );
};

export default AdminUsers;