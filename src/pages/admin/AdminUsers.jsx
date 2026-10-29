import React, { useState } from 'react'; 
import Sidebar, { Sidebar } from '../../components/admin/Sidebar';
import React from 'react';

export const AdminUsers = ({ showToast }) => { 
    const [users, setUsers] = useState([ 
        { id: 1, nombre: 'Javiera Contreras', email: 'javiera@duoc.cl', rut: '19876543K', rol: 'Administrador' }, 
        { id: 2, nombre: 'Pedro Pascal', email: 'pedro@profesor.duoc.cl', rut: '154321098', rol: 'Vendedor' }, 
        { id: 3, nombre: 'Cliente Demo', email: 'cliente@gmail.com', rut: '123456785', rol: 'Cliente' }, 
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [formData, setFormData] = useState({ 
        nombre: '', 
        email: '', 
        rut: '', 
        rol: 'Cliente', 
    });

    const handleOpenModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({ ...user });
        } else {
            setEditingUser(null);
            setFormData({
                nombre: '', 
                email: '', 
                rut: '', 
                rol: 'Cliente'
            });
        }
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Deseas eliminar a este usuario del sistema?')) {
            setProducts(users.filter((u) => u.id !== id));
            if (showToast) showToast('Usuario eliminado correctamente', 'warning');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nombre.trim() || !formData.precio || !formData.stock) {
            if (showToast) showToast('Por favor completa los campos requeridos', 'error');
            return;
        }

        if (editingUser) {
            setUsers(users.map((u) => (u.id === editingUser.id ? {
                ...formData, id: u.id } : u)));
            if (showToast) showToast('Datos del usuario actualizados', 'success');
        } else {
            setUsers([...users, { ...formData, id: Date.now() }]);
            if (showToast) showToast('Nuevo usuario registrado', 'success');
        }

        setShowModal(false);
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <main className="flex-grow-1 p-4 bg-light min-vh-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fw-extrabold text-dark mb-0">
                        👥 Mantenedor de Usuarios
                    </h1>
                    <button onClick={() => handleOpenModal()} className="btn btn-warning fw-bold rounded-pill px-4 shadow-sm">
                        + Crear Usuario
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
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u.id}>
                                        <td className="fw-bold">{u.nombre}</td>
                                        <td>{u.email}</td>
                                        <td>{u.rut}</td>
                                        <td>
                                            <span className={`badge ${ u.rol === 'Administardor' ? 'bg-danger' : u.rol === 'Vendedor' ? 'bg-primary' : 'bg-secondary' } px-3 py-1 rounded-pill`}>
                                                {u.rol}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button onClick={() => handleOpenModal(u)} className="btn btn-sm btn-outline-dark me-2">
                                                ✏️ Editar
                                            </button>
                                            <button onClick={() => handleDelete(u.id)} className="btn btn-sm btn-outline-danger">
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
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow">
                                <div className="modal-header bg-dark text-white border-bottom border-warning border-3">
                                    <h5 className="modal-title fw-bold text-warning">
                                        {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
                                    </h5>
                                    <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">
                                                Nombre Completo (*)
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={formData.nombre} 
                                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} 
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">    
                                            <label className="form-label fw-semibold">
                                                Correo Electrónico (*)
                                            </label>
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                value={formData.email} 
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">  
                                            <label className="form-label fw-semibold">
                                                RUT (*)
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={formData.rut} 
                                                onChange={(e) => setFormData({ ...formData, rut: e.target.value })} 
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">  
                                            <label className="form-label fw-semibold">
                                                Rol del Sistema (*)
                                            </label>
                                            <select className="form-select" value={formData.rol} onChange={(e) => setFormData({ ...formData, rol: e.target.value })}>
                                                <option value="Administrador">Administrador</option>
                                                <option value="Vendedor">Vendedor</option>
                                                <option value="Cliente">Cliente</option>
                                            </select>
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

export default AdminUsers;