import React, { useState } from 'react';

export const Contact = ({ showToast }) => {
    const [formData, setFormData] = useState({
        nombre: '', 
        email: '', 
        telefono: '', 
        asunto: 'Consulta General', 
        mensaje: '',
    });

    const [errors, setErrors] = useState({});
    const [enviado, setEnviado] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        // 1. Nombre obligatorio
        if (!formData.nombre.trim()) {
            nuevosErrores.nombre = 'El nombre completo es obligatorio.';
        }

        // 2. Correo electrónico válido (@duoc.cl, @profesor.duoc.cl, @gmail.com, etc.)
        if (!formData.email.trim()) {
            nuevosErrores.email = 'El correo electrónico es obligatorio.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            nuevosErrores.email = 'Ingrese un formato de correo válido (ej: usuario@gmail.cl).';
        }

        // 3. Teléfono obligatorio
        if (!formData.telefono.trim()) {
            nuevosErrores.telefono = 'El teléfono de contacto es obligatorio.';
        }

        // 4. Mensaje con longitud mínima
        if (!formData.mensaje.trim()) {
            nuevosErrores.mensaje = 'El mensaje no puede estar vacío.';
        } else if (formData.mensaje.trim().length < 10) {
            nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
        }

        setErrors(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            if (showToast) showToast('Por favor, corrige los errores en el formulario', 'error');
            return;
        }

        setEnviado(true);
        if (showToast) showToast('¡Mensaje enviado con éxito! Te responderemos pronto.', 'success');

        setFormData({
            nombre: '', 
            email: '', 
            telefono: '', 
            asunto: 'Consulta General', 
            mensaje: '',
        });
    };

    return (
        <div className="container">
            {/* Encabezado de Sección */}
            <div className="bg-dark text-white p-4 rounded-3 mb-4 border-start border-warning border-5">
                <h1 className="fw-extrabold text-warning mb-1">
                    📩 Contáctanos
                </h1>
                <p className="text-light mb-0 small">
                    ¿Tienes alguna duda sobre tu pedido o buscas un tomo en específico? Escríbenos y te responderemos a la brevedad.
                </p>
            </div>

            <div className="row g-4">
                {/* Columna Izquierda: Formulario de Contacto (7 Cols) */}
                <div className="col-12 col-lg-7">
                    <div className="card shadow-sm border-0 p-4 bg-white">
                        <h4 className="fw-bold text-dark border-bottom pb-2 mb-3">
                            Envíanos un Mensaje
                        </h4>

                        {enviado && (
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>¡Gracias por escribirnos! Tu mensaje ha sido enviado correctamente.</strong>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setEnviado(false)}
                                ></button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="row g-3">
                                {/* Nombre Completo */}
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">
                                        Nombre Completo (*) 
                                    </label>
                                    <input
                                        type="text" 
                                        name="nombre" 
                                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} 
                                        placeholder="Ej. Juan Pérez" 
                                        value={formData.nombre} 
                                        onChange={handleChange}
                                    />
                                    {errors.nombre && <div className="invalid-feedback fw-bold">{errors.nombre}</div>}
                                </div>

                                {/* Correo Electrónico */}
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">
                                        Correo Electrónico (*) 
                                    </label>
                                    <input
                                        type="email" 
                                        name="email" 
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                                        placeholder="ejemplo@gmail.cl" 
                                        value={formData.email} 
                                        onChange={handleChange}
                                    />
                                    {errors.email && <div className="invalid-feedback fw-bold">{errors.email}</div>}
                                </div>

                                {/* Teléfono */}
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">
                                        Teléfono (*) 
                                    </label>
                                    <input
                                        type="tel" 
                                        name="telefono" 
                                        className={`form-control ${errors.telefono ? 'is-invalid' : ''}`} 
                                        placeholder="+56 9 1234 5678" 
                                        value={formData.telefono} 
                                        onChange={handleChange}
                                    />
                                    {errors.telefono && <div className="invalid-feedback fw-bold">{errors.telefono}</div>}
                                </div>

                                {/* Asunto */}
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">
                                        Asunto 
                                    </label>
                                    <select 
                                        name="asunto"
                                        className="form-select"
                                        value={formData.asunto}
                                        onChange={handleChange}
                                    >
                                        <option value="Consulta General">Consulta General</option>
                                        <option value="Estado de Pedido">Estado de Pedido</option>
                                        <option value="Solicitud de Stock">Solicitud de Stock</option>
                                        <option value="Reclamo o Devolución">Reclamo o Devolución</option>
                                    </select>
                                </div>

                                {/* Mensaje */}
                                <div className="col-12">
                                    <label className="form-label fw-semibold text-dark">
                                        Mensaje (*)
                                    </label>
                                    <textarea
                                        name="mensaje" 
                                        rows="4" 
                                        className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`} 
                                        placeholder="Escribe aquí tu consulta en detalle..." 
                                        value={formData.mensaje} 
                                        onChange={handleChange}
                                    ></textarea>
                                    {errors.mensaje && <div className="invalid-feedback fw-bold">{errors.mensaje}</div>}
                                </div>

                                {/* Botón de Envío */}
                                <div className="col-12 pt-2">
                                    <button
                                        type="submit" 
                                        className="btn btn-warning btn-lg w-100 rounded-pill fw-bold text-dark shadow-sm hover-amber"
                                    >
                                        ✉️ Enviar Consulta
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Columna Derecha: Datos de Contacto y Horarios (5 Cols) */}
                <div className="col-12 col-lg-5">
                    <div className="card shadow-sm border-0 p-4 bg-white mb-4">
                        <h4 className="fw-bold text-dark border-bottom pb-2 mb-3">
                            Información de la Tienda
                        </h4>

                        <div className="d-flex align-items-start gap-3 mb-3">
                            <div className="fs-3">📍</div>
                            <div>
                                <strong className="d-block text-dark">Dirección Física:</strong>
                                <span className="text-muted small">Av. Providencia 1234, Local 45, Santiago, Chile.</span>
                            </div>
                        </div>

                        <div className="d-flex align-items-start gap-3 mb-3">
                            <div className="fs-3">📧</div>
                            <div>
                                <strong className="d-block text-dark">Atención Telefónica:</strong>
                                <span className="text-muted small">+56 2 2345 6789</span>
                            </div>
                        </div>

                        <div className="d-flex align-items-start gap-3 mb-3">
                            <div className="fs-3">⏰</div>
                            <div>
                                <strong className="d-block text-dark">Horario de Atención:</strong>
                                <span className="text-muted small">Lunes a Viernes: 10:00 - 19:00 hrs.</span><br />
                                <span className="text-muted small">Sábados: 11:00 - 15:00 hrs.</span>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta de Redes Sociales */}
                    <div className="card shadow-sm border-0 p-4 bg-dark text-white text-center">
                        <h5 className="fw-bold text-warning mb-2">
                            Síguenos en Redes Sociales
                        </h5>
                        <p className="small text-light mb-3">
                            Enterate de los últimos lanzamientos y promociones exclusivas.
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                            <span className="badge bg-warning text-dark px-3 py-2 fw-bold">Instagram</span>
                            <span className="badge bg-warning text-dark px-3 py-2 fw-bold">Facebook</span>
                            <span className="badge bg-warning text-dark px-3 py-2 fw-bold">X (Twitter)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;