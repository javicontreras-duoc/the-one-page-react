import React from 'react'; 
import { Link } from 'react-router-dom'; 
import Sidebar from '../../components/admin/Sidebar';

export const Dashboard = ({ products = [] }) => {
    const criticalStockProducts = products.filter((p) => (p.stock ?? 10) <= 5);

    const formatCLP = (amount) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);

    return (
        <div className="d-flex">
            <Sidebar />

            <main className="flex-grow-1 p-4 bg-light min-vh-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fw-extrabold text-dark mb-0">
                        📊 Dashboard de Administración
                    </h1>
                    <span className="badge bg-dark text-warning px-3 py-2 fs-6 rounded-pill">
                        Rol: Administrador
                    </span>
                </div>

                {/* 1. Tarjetas de Indicadores Clave (KPIs) */}
                <div className="row g-3 mb-4">
                    <div className="col-12 col-sm-6 col-xl-3">
                        <div className="card border-0 shadow-sm p-3 bg-white border-start border-warning border-4">
                            <small className="text-muted fw-bold text-uppercase">
                                Total Productos
                            </small>
                            <div className="fs-2 fw-extrabold text-dark">
                                {products.length}
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-xl-3">
                        <div className="card border-0 shadow-sm p-3 bg-white border-start border-warning border-4">
                            <small className="text-muted fw-bold text-uppercase">
                                Stock Crítico (≤ 5 un.)
                            </small>
                            <div className="fs-2 fw-extrabold text-dark">
                                {criticalStockProducts.length}
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-xl-3">
                        <div className="card border-0 shadow-sm p-3 bg-white border-start border-warning border-4">
                            <small className="text-muted fw-bold text-uppercase">
                                Usuarios Registrados
                            </small>
                            <div className="fs-2 fw-extrabold text-dark">
                                24
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-xl-3">
                        <div className="card border-0 shadow-sm p-3 bg-white border-start border-warning border-4">
                            <small className="text-muted fw-bold text-uppercase">
                                Ventas del Mes
                            </small>
                            <div className="fs-2 fw-extrabold text-dark">
                                {formatCLP(458900)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Tabla de Alerta de Stock Crítico */}
                <div className="card border-0 shadow-sm bg-white p-4 mb-4">
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                        <h4 className="fw-bold text-dark mb-0">
                            ⚠️ Alertas de Inventario y Stock Crítico
                        </h4>
                        <Link to="/admin/productos" className="btn btn-warning btn-sm fw-bold rounded-pill">
                            Gestionar Inventario →
                        </Link>
                    </div>

                    {criticalStockProducts.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Código</th>
                                        <th>Manga</th>
                                        <th>Categoría</th>
                                        <th>Precio</th>
                                        <th className="text-center">Stock Actual</th>
                                        <th className="text-center">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {criticalStockProducts.map((p) => (
                                        <tr key={p.id}>
                                            <td className="fw-bold">{p.codigo || `MANGA-${p.id}`}</td>
                                            <td className="fw-bold text-dark">{p.nombre}</td>
                                            <td><span className="badge bg-secondary">{p.categoria}</span></td>
                                            <td>{formatCLP(p.precio)}</td>
                                            <td className="text-center fw-extrabold fs-6 text-danger">{p.stock ?? 0} un.</td>
                                            <td className="text-center"><span className="badge bg-danger text-white fw-bold px-3 py-1 rounded-pill">Reabastecer Urgente</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="alert alert-success mb-0 fw-semibold text-center py-3">
                            ✅ Todos los productos cuentan con stock suficiente en inventario.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;