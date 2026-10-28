import React from 'react'; 
import { Link } from 'react-router-dom'; 
import ProductCard from '../../components/store/ProductCard';

export const Home = ({ products = [], showToast }) => {
    const featuredProducts = products.slice(0,4);

    return (
        <div className="home-page">
            {/* 1\. Hero Banner Principal \*/}
            <section className="hero-banner bg-dark text-white py-5 px-4 mb-5 rounded-3 position-relative overflow-hidden border-bottom border-warning border-4">
                <div className="container py-4">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-7">
                            <span className="badge bg-warning text-dark fw-bold mb-2 px-3 py-2 rounded-pill text-uppercase">
                                ⚡ ¡Nuevos Lanzamientos Disponibles!
                            </span>
                            <h1 className="display-4 fw-extrabold text-warning mb-3">
                                Tu Manga Favorito a Un Clic de Distancia
                            </h1>
                            <p className="fs-5 text-light mb-4">
                                Explora el catálogo más completo de tomos Shonen, Seinen, Shojo y Josei en Chile. Envíos rápidos y 100% garantizados.
                            </p>
                            <div className="d-flex gap-3 flex-wrap">
                                <Link to="/productos" className="btn btn-warning btn-lg rounded-pill fw-bold text-dark px-4 shadow">
                                    📚 Ver Catálogo Completo
                                </Link>
                                <a href="#destacados" className="btn btn-outline-light btn-lg rounded-pill fw-semibold px-4">
                                    🔥 Mangas Destacados
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5 text-center d-none d-lg-block">
                            <img 
                                src="/img/logo.png"
                                alt="The One Page Banner"
                                className="img-fluid drop-shadow"
                                style={{ maxHeight: '280px', objectFit: 'contain' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Beneficios de la Tienda */}
            <section className="features-section mb-5">
                <div className="container">
                    <div className="row g-4 text-center">
                        <div className="col-12 col-md-4">
                            <div className="card h-100 border-0 shadow-sm p-4 bg-white">
                                <div className="fs-1 mb-2">🚚</div>
                                <h5 className="fw-bold text-dark">Envío Gratis</h5>
                                <p className="text-muted small mb-0">En compras sobre $30.000 a todo Chile continental.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="card h-100 border-0 shadow-sm p-4 bg-white">
                                <div className="fs-1 mb-2">🔒</div>
                                <h5 className="fw-bold text-dark">Pago 100% Seguro</h5>
                                <p className="text-muted small mb-0">Transacciones protegidas vía Webpay Plus y Transferencia.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="card h-100 border-0 shadow-sm p-4 bg-white">
                                <div className="fs-1 mb-2">⭐</div>
                                <h5 className="fw-bold text-dark">Calidad Garantizada</h5>
                                <p className="text-muted small mb-0">Ediciones originales y selladas de las mejores editoriales.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Sección de Mangas Destacados */}
            <section id="destacados" className="featured-section mb-5 container">
                <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-2">
                    <div>
                        <h2 className="fw-extrabold text-dark mb-1">🔥 Destacados de la Semana</h2>
                        <p className="text-muted mb-0">Los tomos más leídos por nuestra comunidad.</p>
                    </div>
                    <Link to="/productos" className="btn btn-link text-warning fw-bold text-decoration-none bg-dark px-3 py-1 rounded-pill">
                        Ver Todos →
                    </Link>
                </div>

                <div className="row">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} showToast={showToast} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;