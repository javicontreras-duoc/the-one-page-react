import React from 'react'; 
import { Link } from 'react-router-dom';
import { BLOGS_DATA } from '../../data/blogsData';

export const Blogs = () => {
    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase mb-2">
                        Comunidad & Lectura
                    </span>
                    <h1 className="fw-extrabold text-dark display-5">
                        📰 Artículos, Reseñas y Guías
                    </h1>
                    <p className="text-muted lead">
                        Análisis editoriales, historia del manga y consejos para coleccionistas.
                    </p>
                </div>

                <div className="row g-4">
                    {BLOGS_DATA.map((blog) => (
                        <div key={blog.id} className="col-md-6">
                            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                                <img
                                    src={blog.portada}
                                    alt={blog.titulo}
                                    className="w-100"
                                    style={{ height: '220px', objectFit: 'cover' }}
                                />
                                <div className="card-body p-4 d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="badge bg-secondary small">
                                            {blog.categoria}
                                        </span>
                                    </div>

                                    <h2 className="h5 fw-bold text-dark mb-2">
                                        {blog.titulo}
                                    </h2>
                                    <p className="text-muted small flex-grow-1">
                                        {blog.resumen}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-3">
                                        <span className="text-muted small">
                                            Por {blog.autor}
                                        </span>
                                        <Link 
                                            to={`/blog/${blog.id}`}
                                            className="btn btn-warning btn-sm rounded-pill fw-bold px-3 text-dark"
                                        >
                                            Leer artículo →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> 
        </div>
    );
};

export default Blogs;