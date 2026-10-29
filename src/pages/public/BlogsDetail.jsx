import React from 'react'; 
import { useParams, Link } from 'react-router-dom';

export const BlogDetail= () => {
    const { id } = useParams();

    return (
        <div className="container">
            <div className="max-w-800 mx-auto bg-white p-4 p-md-5 rounded shadow-sm">
                <Link to="/blogs" className="btn btn-outline-dark btn-sm rounded-pill mb-4">
                    ← Volver a Blogs
                </Link>
                <span className="badge bg-warning text-dark mb-2 fw-bold px-3 py-2">
                    Artículo #{id}  
                </span>
                <h1 className="fw-extrabold text-dark mb-3">
                    Guía Especial sobre la Cultura del Manga
                </h1>
                <p className="text-muted border-bottom pb-3 mb-4">
                    Publicado por el Equipo Editorial de The One Page
                </p>

                <img
                    src="" 
                    className="img-fluid rounded mb-4 w-100" 
                    alt="Manga Banner"
                />

                <div className="lh-lg text-secondary">
                    <p>
                        El mundo del manga abarca una riqueza narrativa inigualable. Desde aventuras de acción hasta dramas cotidianos, 
                        la industria japonesa ha marcado una tendencia global en la cultura pop.
                    </p>
                    <h4 className="fw-bold text-dark mt-4">
                        ¿Por qué coleccionar ediciones físicas?
                    </h4>
                    <p>
                        Tener el tomo impreso en tus manos ofrece una experiencia sensorial única: apreciar 
                        el arte del mangaka, los detalles de portada y conservar una biblioteca física que perdurará en el tiempo.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;