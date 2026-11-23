import React from 'react';

export const MetricCard = ({ title, value, color = 'warning', icon = '📊' }) => {
    return (
        <div className="col-12 col-sm-6 col-xl-3">
            <div className={`card border-0 shadow-sm p-3 bg-white border-start border-${color} border-4`}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <small className="text-muted fw-bold text-uppercase d-block">
                            {title}
                        </small>
                        <div className={`fs-2 fw-extrabold text-${color === 'warning' ? 'dark' : color}`}>
                            {value}
                        </div>
                        <div className="fs-1 opacity-75">{icon}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MetricCard;