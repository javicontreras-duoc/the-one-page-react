import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';

export const Footer = () => {
    const [emailNewsletter, setEmailNewsletter] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault(); 
        if (emailNewsletter.trim()) { 
            setSubscribed(true); setEmailNewsletter(''); 
        }
    };

    return (
        <footer className="bg-dark text-light pt-5 pb-3 border-top border-warning border-4 mt-auto">
            <div className="container">
                <div className="row g-4 mb-4">

                    {/* Marca e Información */}
                    <div className="col-12 col-md-4">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <img
                                src="/img/logo.png" 
                                alt="The One Page Logo" 
                                style={{ height: '35px', objectFit: 'contain' }}
                            />
                            <span className="fw-bold fs-4 text-warning">The One Page</span>
                        </div>
                        <p className="small text-secondary lh-sm">
                            Tu tienda especializada en mangas, cómics e historietas orientales en Chile. 
                            Envíos garantizados y ediciones 100% oficiales.
                        </p>
                    </div>

                    {/* Enlaces Rápidos */}
                    <div className="col-6 col-md-2">
                        <h6 className="fw-bold text-warning text-uppercase mb-3">
                            Navegación
                        </h6>
                        <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
                            <li><Link to="/" className="text-decoration-none text-light">Home</Link></li>
                            <li><Link to="/productos" className="text-decoration-none text-light">Catálogo</Link></li>
                            <li><Link to="/blogs" className="text-decoration-none text-light">Blogs</Link></li>
                        </ul>
                    </div>

                    {/* Soporte y Legal */}
                    <div className="col-6 col-md-2">
                        <h6 className="fw-bold text-warning text-uppercase mb-3">
                            Soporte
                        </h6>
                        <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
                            <li><Link to="/contacto" className="text-decoration-none text-light">Contacto</Link></li>
                            <li><Link to="/nosotros" className="text-decoration-none text-light">Nosotros</Link></li>
                            <li><Link to="/login" className="text-decoration-none text-light">Mi cuenta</Link></li>
                        </ul>
                    </div>

                    {/* Subscripción a Newsletter */}
                    <div className="col-12 col-md-4">
                        <h6 className="fw-bold text-warning text-uppercase mb-2">
                            Boletín Informativo
                        </h6>
                        <p className="small text-secondary mb-3">
                            Recibe ofertas exclusivas y enterate de nuevos tomos antes que nadie.
                        </p>

                        {subscribed ? (
                            <div className="alert alert-success py-2 px-3 small fw-bold">
                                ¡Gracias por suscribirte a nuestro boletín!
                            </div>    
                        ) : (
                            <form onSubmit={handleSubscribe} className="input-group">
                                <input
                                    type="email" 
                                    className="form-control form-control-sm border-secondary bg-dark text-light" 
                                    placeholder="tu-correo@gmail.cl" 
                                    value={emailNewsletter} onChange={(e) => setEmailNewsletter(e.target.value)} 
                                    required
                                />
                                <button className="btn btn-warning btn-sm fw-bold text-dark" type="submit">
                                    Suscribirse
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="border-top border-secondary pt-3 text-center small text-secondary">
                    <p className="mb-0">© {new Date().getFullYear()} The One Page Store. Desarrollado por Javiera Contreras - Duoc UC.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;