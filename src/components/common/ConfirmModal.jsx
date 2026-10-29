import React from 'react';

export const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div className="modal show d-block bg-dark bg-opacity-50" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header bg-dark text-white border-bottom border-warning border-3">
                        <h5 className="modal-title fw-bold text-warning">{title}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <p className="fs-6 text-dark mb-0">{message}</p>
                    </div>
                    <div className="modal-footer bg-light">
                        <button type="button" className="btn btn-secondary btn-sm rounded-pill fw-semibold" onClick={onCancel}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-danger btn-sm rounded-pill fw-bold px-3" onClick={onConfirm}>
                            Sí, confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;