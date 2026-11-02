import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { db, collection, getDocs } from '../../services/firebase';

export const Login = ({ showToast, setCurrentUser }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '', 
        password: '',
    });

    const [error, setError] = useState({});

    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        }); setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email.trim() || !formData.password.trim()) { 
            setError('Por favor, ingresa tu correo y contraseña.'); 
            return; 
        }

        setLoading(true);

        try {
            const usersSnapshot = await getDocs(collection(db, 'usuarios'));
            const emailIngresado = formData.email.trim().toLowerCase();

            const usuarioEncontrado = usersSnapshot.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .find((u) => u.email?.toLowerCase() === emailIngresado);

            const esAdminPorCorreo = emailIngresado.includes('admin');
            const esAdminPorRol = usuarioEncontrado && usuarioEncontrado.rol === 'Administrador';

            if (!usuarioEncontrado && !esAdminPorCorreo) {
                setError('No encontramos una cuenta registrada con este correo electrónico.');
                if (showToast) showToast('Usuario no encontrado', 'error');
                setLoading(false);
                return;
            }

            const sesionUsuario = usuarioEncontrado || {
                email: emailIngresado, 
                nombre: 'Administrador Maestro', 
                rol: 'Administrador'
            }

            localStorage.setItem('active_user', JSON.stringify(sesionUsuario));
            if (setCurrentUser) setCurrentUser(sesionUsuario);

            if (esAdminPorRol || esAdminPorCorreo) {
                if (showToast) showToast(`¡Bienvenido(a) Administrador(a) ${sesionUsuario.nombre}!`, 'success');
                navigate('/admin/dashboard');
            } else {
                if (showToast) showToast(`¡Hola de nuevo, ${sesionUsuario.nombre}!`, 'success');
                navigate('/productos');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', err);
            setError('Hubo un problema al conectar con el servidor.');
            if (showToast) showToast('Error al conectar con la base de datos', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        <div className="card-header bg-dark text-white text-center py-4 border-bottom border-warning border-3">
                            <h3 className="fw-bold text-warning mb-0">Iniciar Sesión</h3>
                            <p className="text-light small mb-0 mt-1">Accede a tu cuenta de The One Page</p>
                        </div>

                        <div className="card-body p-4 p-md-5">
                            {/* Formulario */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark">
                                        Correo Electrónico (*)
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="usuario@duoc.cl o admin@tienda.cl"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        <div className="form-text small">
                                            Si tu correo contiene <code>admin</code> o tienes rol Administrador, entrarás al Dashboard.
                                        </div>
                                    </label>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold text-dark">
                                        Contraseña (*)
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-warning w-100 fw-bold py-2 rounded-pill text-dark shadow-sm"
                                    disabled={loading}
                                >
                                    {loading ? 'Comprobando rol...' : 'Ingresar'}
                                </button>
                            </form>

                            <div className="text-center mt-4 pt-3 border-top">
                                <span className="text-muted small">¿Aún no tienes una cuenta? </span>
                                <Link to="/registro" className="text-warning fw-bold small text-decoration-none">
                                    Regístrate aquí
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;