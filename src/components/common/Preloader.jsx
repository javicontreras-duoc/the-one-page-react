import React from 'react';

export const Preloader = ({ message = 'Cargando tienda...' }) => {
    return (
        <div className="preloader-overlay">
            <img
                src="/img/logo.png" 
                alt="Loading..." 
                className="mb-3 drop-shadow" 
                style={{ height: '70px' }}
            />
            <div className="spinner-border text-warning mb-2" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
            <span className="text-warning fw-bold fs-5">{message}</span>
        </div>
    );
};

export default Preloader;