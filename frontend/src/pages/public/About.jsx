import React from 'react'; 
import { Link } from 'react-router-dom';

export const About = () => {
    return (
        <div className="container">
            {/* 1. Encabezado de la Sección */}
            <div className="bg-dark text-white p-4 p-md-5 rounded-3 mb-5 border-start border-warning border-5 position-relative overflow-hidden">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-8">
                        <span className="badge bg-warning text-dark fw-bold mb-2 px-3 py-2 rounded-pill text-uppercase">
                            📖 Conoce Nuestra Historia
                        </span>
                        <h1 className="display-5 fw-extrabold text-warning mb-2">
                            Sobre The One Page
                        </h1>
                        <p className="fs-5 text-light mb-0">
                            Somos tu tienda especializada en mangas, cómics e historietas orientales en Chile. 
                            Apasionados por llevar las mejores historias directo a tus manos.
                        </p>
                    </div>
                    <div className="col-12 col-lg-4 text-center d-none d-lg-block">
                        <img
                            src="/img/logo.png" 
                            alt="The One Page Logo" 
                            className="img-fluid drop-shadow" 
                            style={{ maxHeight: '180px', objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </div>

            {/* 2. Misión, Visión y Valores */}
            <section className="mb-5">
                <div className="row g-4">
                    <div className="col-12 col-md-4">
                        <div className="card h-100 border-0 shadow-sm p-4 bg-white border-top border-warning border-4">
                            <div className="fs-1 text-warning mb-2">🎯</div>
                            <h4 className="fw-bold text-dark">Nuestra Misión</h4>
                            <p className="text-muted small mb-0 lh-base">
                                Proveer a los fanáticos del manga en Chile un catálogo actualizado, diverso y con ediciones oficiales 
                                de alta calidad, asegurando un proceso de compra rápido, confiable y accesible.
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="card h-100 border-0 shadow-sm p-4 bg-white border-top border-warning border-4">
                            <div className="fs-1 text-warning mb-2">👁️</div>
                            <h4 className="fw-bold text-dark">Nuestra Visión</h4>
                            <p className="text-muted small mb-0 lh-base">
                                Convertirnos en la plataforma e-commerce de manga de referencia a nivel nacional, destacando por 
                                la excelencia en la atención al cliente, envíos garantizados y comunidad activa.
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="card h-100 border-0 shadow-sm p-4 bg-white border-top border-warning border-4">
                            <div className="fs-1 text-warning mb-2">⭐</div>
                            <h4 className="fw-bold text-dark">Nuestros Valores</h4>
                            <ul className="text-muted small ps-3 mb-0 lh-base">
                                <li><strong>Pasión:</strong> Amor genuino por la cultura del manga.</li>
                                <li><strong>Calidad:</strong> Productos 100% originales y sellados.</li>
                                <li><strong>Transparencia:</strong> Compromiso en tiempos de despacho.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Ficha Técnica del Proyecto Académico y Desarrolladora */}
            <section className="mb-5">
                <div className="card shadow-sm border-0 bg-white p-4 p-md-5">
                    <div className="row align-items-center g-4">
                        <div className="col-12 col-md-4 text-center border-end-md">
                            <div className="bg-dark text-warning p-4 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '120px', height: '120px' }}>
                                <span className="fs-1">👩‍💻</span>
                            </div>
                            <h3 className="fw-extrabold text-dark mb-1">Javiera Contreras</h3>
                            <p className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill mb-2">
                                Desarrolladora Principal
                            </p>
                            <p className="text-muted small d-block mb-0">
                                Estudiante de Ingeniería
                            </p>
                        </div>

                        <div className="col-12 col-md-8">
                            <h3 className="fw-bold text-dark border-bottom pb-2 mb-3">
                                🎓 Ficha Técnica del Proyecto
                            </h3>

                            <div className="row g-3">
                                <div className="col-12 col-sm-6">
                                    <strong className="d-block text-dark small text-uppercase">
                                        Institución:
                                    </strong>
                                    <span className="text-secondary fw-semibold">DuocUC</span>
                                </div>
                                
                                <div className="col-12 col-sm-6">
                                    <strong className="d-block text-dark small text-uppercase">
                                        Stack Tecnológico:
                                    </strong>
                                    <span className="text-secondary fw-semibold">React + Bootstrap 5</span>
                                </div>

                                <div className="col-12 col-sm-6">
                                    <strong className="d-block text-dark small text-uppercase">
                                        Descripción de la Solución:
                                    </strong>
                                    <p className="text-muted small mb-0 lh-base">
                                        Aplicación web SPA desarrollada para la tienda virtual <strong>The One Page</strong>. 
                                        Incluye catálogo interactivo con filtros, carrito de compras dinámico con persistencia en 
                                        <code>LocalStorage</code>, flujo completo de Checkout con validación de formularios y panel administrativo 
                                        para la gestión de productos e inventarios.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Llamado a la Acción (CTA) */}
            <div className="bg-dark text-white p-4 text-center rounded-3 shadow-sm">
                <h3 className="fw-bold text-warning mb-2">¿Listo para empezar tu colección?</h3>
                <p className="text-light small mb-3">Revisa nuestras últimas novedades y ofertas especiales en tomos seleccionados.</p>
                <Link to="/productos" className="btn btn-warning fw-bold text-dark rounded-pill px-4">
                    📚 Explorar Catálogo
                </Link>
            </div>
        </div>
    );
};

export default About;