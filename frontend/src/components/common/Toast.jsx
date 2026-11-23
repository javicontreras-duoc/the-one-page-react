import React from 'react';

export const Toast = ({ message, type = 'success', onClose }) => {
    if (!message) return null;

    const bgClass =
        type === 'success' ? 'bg-success text-white' :
        type === 'error' ? 'bg-danger text-white' : 'bg-warning text-dark';

    return (
        <div className="toast-container-custom">
            <div className={`toast show align-items-center ${bgClass} border-0 shadow-lg p-2 rounded-3`} role="alert">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="toast-body fw-bold d-flex align-items-center gap-2">
                        <span>{type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'}</span>
                        <span>{message}</span>
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2" onClick={onClose}></button>
                </div>
            </div>
        </div>
    );
};

export default Toast;