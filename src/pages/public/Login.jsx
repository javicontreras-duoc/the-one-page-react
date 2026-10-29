import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';

export const Login = ({ showToast }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '', 
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});

        if (errors[name]) {
            setErrors({...errors, [name]: ''});
        }
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        // 1. Validación de Correo Electrónico
        if (!formData.email.trim()) {
            nuevosErrores.email = 'El correo electrónico es obligatorio.';
        } else { 
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(formData.email)) {
                nuevosErrores.email = 'Ingrese un formato de correo válido (ej: usuario@gmail.cl).';
            }
        }

        // 2. Validación de Contraseña (entre 4 y 10 caracteres)
        if (!formData.password) {
            nuevosErrores.password = 'La contraseña es obligatoria.';
        } else if (formData.password.length < 4 || formData.password.length > 10) {
            nuevosErrores.password = 'La contraseña debe tener entre 4 y 10 caracteres.';
        }

        setErrors(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            if (showToast) showToast('Corrige los errores antes de iniciar sesión', 'error');
            return;
        }

        // Simulación de autenticación exitosa
        if (showToast) showToast('¡Bienvenido a The One Page!', 'success');

        // Redirección según rol
        if (formData.email.toLowerCase().includes('admin')) {
            navigate('/admin/dashboard');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">
                    <div className="card shadow-sm border-0 bg-white p-4 p-md-5">
                        {/* Encabezado */}
                        <div className="text-center mb-4">
                            <img
                                src="/img/logo.png" 
                                alt="The One Page Logo" 
                                style={{ height: '60px', objectFit: 'contain' }} 
                                className="mb-2"
                            />
                            <h2 className="fw-extrabold text-dark">Iniciar sesión</h2>
                            <p className="text-muted small">Ingresa tus credenciales para acceder a tu cuenta</p>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-3">
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
                                {errors.email && <div lassName="invalid-feedback fw-bold">{errors.email}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold text-dark">
                                    Contraseña (*)
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="4 a 10 caracteres"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <div lassName="invalid-feedback fw-bold">{errors.password}</div>}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-warning btn-lg w-100 rounded-pill fw-bold text-dark shadow-sm mb-3 hover-amber"
                            >
                                Ingresar a Mi Cuenta
                            </button>
                        </form>

                        <div className="text-center border-top pt-3 mt-2">
                            <span className="text-muted small">¿Aún no tienes una cuenta? </span>
                            <Link to="/registro" className="fw-bold text-dark text-decoration-none small">
                                Regístrate aquí
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;