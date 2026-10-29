import React from 'react'; 
import { Link } from 'react-router-dom';

export const Blogs = () => {
    const blogsList = [ 
        { 
            id: 1, 
            titulo: 'Los 5 Mangas Shonen Más Vendidos de la Década', 
            resumen: 'Descubre qué series han roto récords de ventas a nivel mundial y por qué siguen cautivando a millones de lectores.', 
            fecha: '20 Octubre, 2026', 
            imagen: '' 
        }, 
        { 
            id: 2, 
            titulo: 'Guía para Principiantes: Diferencias entre Shonen, Seinen y Shojo', 
            resumen: 'Aprende a identificar las demografías del manga y encuentra el género perfecto para iniciar tu colección.', 
            fecha: '15 Octubre, 2026', 
            imagen: '' 
        } 
    ];

    return (
        <div className="container">
            <div className="bg-dark text-white p-4 rounded-3 mb-4 border-start border-warning border-5">
                <h1 className="fw-extrabold text-warning mb-1">📰 Noticias y Curiosidades</h1>
                <p className="text-light mb-0 small">Novedades sobre el mundo del manga, recomendaciones e historias.</p>
            </div>

            <div className="row g-4">
                {blogsList.map((blog) => (
                    <div key={blog.id} className="col-12 col-md-6">
                        <div className="card h-100 shadow-sm border-0 bg-white overflow-hidden">
                            <img 
                                src={blog.imagen} 
                                alt={blog.titulo} 
                                className="card-img-top" 
                                style={{ height: '200px', 
                                objectFit: 'cover' }} 
                            />
                            <div className="card-body p-4 d-flex flex-column justify-content-between">
                                <div>
                                    <small className="text-warning bg-dark px-2 py-1 rounded fw-bold mb-2 d-inline-block">
                                        {blog.fecha}
                                    </small>
                                    <h4 className="fw-bold text-dark">{blog.titulo}</h4>
                                    <p className="text-muted small">{blog.resumen}</p>
                                </div>
                                <Link to={`/blog/${blog.id}`} className="btn btn-outline-dark btn-sm fw-bold rounded-pill align-self-start mt-3">
                                    Leer Artículo Completo →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div> 
    );
};

export default Blogs;