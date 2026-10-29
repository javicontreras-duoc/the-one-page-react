import React, { useState, useEffect } from 'react';

export const UserForm = ({ initialData, onSubmit, onCancel }) => { 
    const [formData, setFormData] = useState({ 
        nombre: '', 
        email: '', 
        rut: '', 
        rol: 'Cliente'
    });

    useEffect(() => { 
        if (initialData) { 
            setFormData({ ...initialData }); 
        } else { 
            setFormData({ 
                nombre: '', 
                email: '', 
                rut: '', 
                rol: 'Cliente' 
            }); 
        } 
    }, [initialData]);

    const handleChange = (e) => { 
        const { name, value } = e.target; 
        setFormData({ ...formData, [name]: value }); 
    };

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label fw-semibold">
                    Nombre Completo (*)
                </label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={formData.nombre} 
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">  
                <label className="form-label fw-semibold">
                    Rol Asignado (*)
                </label>
                <select className="form-select" value={formData.rol} onChange={handleChange}>
                    <option value="Administrador">Administrador</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Cliente">Cliente</option>
                </select>
            </div>
        
            <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>Cancelar</button>
                <button type="submit" className="btn btn-warning btn-sm fw-bold">Guardar Producto</button>
            </div>
        </form>
    );
};

export default UserForm;