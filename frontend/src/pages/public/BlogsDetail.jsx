import React from 'react'; 
import { useParams, Link } from 'react-router-dom';
import { BLOGS_DATA } from '../../data/blogsData';

export const BlogDetail= () => {
    const { id } = useParams();

    const blog = BLOGS_DATA.find((b) => String(b.id) === String(id)) || BLOGS_DATA[0];

    const formatCLP = (amount) => new Intl.NumberFormat('es-CL', { 
        style: 'currency', 
        currency: 'CLP' 
    }).format(amount);

    return (
        <article className="bg-light min-vh-100 py-5">
            <div className="container">
                <div className="mb-4">
                    <Link to="/blogs" className="text-decoration-none text-muted small fw-semibold">
                        ← Volver a Artículos y Reseñas
                    </Link>
                </div>

                <header className="mb-4">
                    <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase mb-2">
                        {blog.categoria}
                    </span>
                    <h1 className="display-5 fw-extrabold text-dark mb-3">
                        {blog.titulo}
                    </h1>
                    <p className="lead text-muted mb-4">
                        {blog.subtitulo}
                    </p>

                    <div className="d-flex flex-wrap align-items-center gap-3 text-secondary small border-top border-bottom py-2">
                        <span>✍️ <strong>{blog.autor}</strong></span>
                        <span>•</span>
                        <span>📅 {blog.fecha}</span>
                    </div>
                </header>

                <div className="mb-5 rounded-4 overflow-hidden shadow-sm">
                    <img
                        src={blog.portada}
                        alt={blog.titulo}
                        className="w-100 object-fit-cover"
                        style={{ maxHeight: '420px' }}
                    />
                </div>

                <div className="row g-4 g-lg-5">
                    <div className="col-lg-8">
                        <div className="p-4 mb-4 bg-white border-start border-warning border-4 rounded-3 shadow-sm">
                            <p className="fs-5 fst-italic text-dark mb-0">
                                {blog.citaDestacada}
                            </p>
                        </div>

                        {blog.contenido.map((seccion, index) => (
                            <section key={index} className="mb-4 bg-white p-4 rounded-3 shadow-sm">
                                <h2 className="h4 fw-bold text-dark mb-3">
                                    {seccion.encabezado}
                                </h2>
                                <p className="text-secondary leading-relaxed mb-0" style={{ lineHeight: '1.8' }}>
                                    {seccion.texto}
                                </p>
                            </section>
                        ))}

                        <aside className="col-lg-4">
                            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                                <h3 className="h6 fw-bold text-dark border-bottom pb-2 mb-3">
                                    📋 Ficha de Análisis
                                </h3>
                                <ul className="list-unstyled small mb-0 d-flex flex-column gap-2 text-muted">
                                    <li><strong>Demografía:</strong>{blog.fichaObra.demografia}</li>
                                    <li><strong>Temáticas:</strong>{blog.fichaObra.tematica}</li>
                                    <li><strong>Editoriales:</strong>{blog.fichaObra.publicacion}</li>
                                    <li><strong>Calificación:</strong> <span className="text-warning">{blog.fichaObra.nivelRecomendacion}</span></li>
                                </ul>
                            </div>

                            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white text-center">
                                <span className="badge bg-danger text-uppercase mb-2 py-1 px-2 align-self-center small">
                                    Tomo Destacado
                                </span>
                                <h4 className="h6 fw-bold text-dark mb-3">
                                    Disponible en nuestra tienda
                                </h4>
                                <img
                                    src={blog.tomoRecomendado.portada}
                                    alt={blog.tomoRecomendado.nombre}
                                    className="img-fluid rounded-3 mb-3 mx-auto shadow-sm"
                                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                                />

                                <h5 className="fs-6 fw-bold text-dark mb-1">
                                    {blog.tomoRecomendado.nombre}
                                </h5>
                                <p className="text-warning fw-extrabold fs-5 mb-3">
                                    {formatCLP(blog.tomoRecomendado.precio)}
                                </p>

                                <Link 
                                    to="/productos"
                                    className="btn btn-warning w-100 fw-bold rounded-pill text-dark shadow-sm"
                                >
                                    Ver en el Catálogo 📖
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogDetail;