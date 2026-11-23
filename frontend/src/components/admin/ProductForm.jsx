import React, { useState, useEffect } from 'react';

export const ProductForm = ({ initialData, onSubmit, onCancel }) => { 
    const [formData, setFormData] = useState({ 
        codigo: '', nombre: '', 
        categoria: 'Shonen', 
        precio: '', 
        stock: '', 
        descripcion: '', 
        imagen: '' 
    });

    useEffect(() => { 
        if (initialData) { 
            setFormData({ ...initialData }); 
        } else { 
            setFormData({ 
                codigo: `MNG-${Math.floor(100 + Math.random() * 900)}`, 
                nombre: '', 
                categoria: 'Shonen', 
                precio: '', stock: '', 
                descripcion: '', 
                imagen: '' 
            }); 
        } 
    }, [initialData]);

    const handleChange = (e) => { 
        const { name, value } = e.target; 
        setFormData({ ...formData, [name]: value }); 
    };

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        onSubmit({ 
            ...formData, 
            precio: Number(formData.precio), 
            stock: Number(formData.stock) 
        }); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label fw-semibold">
                        Código (*)
                    </label>
                    <input 
                        type="text" 
                        name="codigo"
                        className="form-control" 
                        value={formData.codigo} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label fw-semibold">
                        Nombre del Manga (*)
                    </label>
                    <input 
                        type="text" 
                        name="nombre"
                        className="form-control" 
                        value={formData.nombre} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label fw-semibold">
                        Categoría (*)
                    </label>
                    <select className="form-select" value={formData.categoria} onChange={handleChange}>
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
                        name="precio"
                        className="form-control" 
                        placeholder="8990"
                        value={formData.precio} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label fw-semibold">
                        Stock (*)
                    </label>
                    <input 
                        type="number" 
                        name="stock"
                        className="form-control" 
                        placeholder="10"
                        value={formData.stock} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="col-12">
                    <label className="form-label fw-semibold">Imagen (Portada)</label>
                    <input 
                        type="url" 
                        name="imagen"
                        className="form-control" 
                        placeholder="https://..."
                        value={formData.imagen} 
                        onChange={handleChange} 
                        />
                </div>
                <div className="col-12">
                    <label className="form-label fw-semibold">Sinopsis / Descripción</label>
                    <textarea name="descripcion" className="form-control" rows="3" value={formData.descripcion} onChange={handleChange} ></textarea>
                </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>Cancelar</button>
                <button type="submit" className="btn btn-warning btn-sm fw-bold">Guardar Producto</button>
            </div>
        </form>
    );
};

export default ProductForm;