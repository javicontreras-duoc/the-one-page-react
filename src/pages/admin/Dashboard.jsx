import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import MetricCard from '../../components/admin/MetricCard';
import { collection } from 'firebase/firestore';

export const Dashboard = ({ products = [] }) => {
  const [usersCount, setTotalUsuarios] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);
  const [ordersCount, setTotalOrdenes] = useState(0);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [usersSnap, ordersSnap] = await Promise.all([
          getDocs(collection(db, 'usuarios')),
          getDocs(collection(db, 'ordenes'))
        ]);

        setTotalUsuarios(usersSnap.size);

        const totalVentasCalculado = ordersSnap.docs.reduce(
          (acc, doc) => acc + (doc.data().total || 0),
        );
        setTotalVentas(totalVentasCalculado)
      } catch (error) {
        console.error('Error cargando métricas:', error);
      }
    };

    loadDashboardData();
  }, []);

  // Filtrado reactivo de productos con stock crítico (<= 5 unidades)
  const criticalStockProducts = products.filter((p) => {
    const stockVal = p.stock !== undefined && p.stock !== null ? Number(p.stock) : 0;
    return stockVal <= 5;
  });

  const formatCLP = (amount) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount || 0);

  return (
    <div className="d-flex">
      <Sidebar />

      <main className="flex-grow-1 p-4 bg-light min-vh-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-extrabold text-dark mb-1">📊 Dashboard de Administración</h1>
            <p className="text-muted small mb-0">Métricas y alertas en tiempo real conectadas a la base de datos local</p>
          </div>
          <span className="badge bg-dark text-warning px-3 py-2 fs-6 rounded-pill">Rol: Administrador</span>
        </div>

        {/* 1. Tarjetas de Indicadores Clave (KPIs 100% dinámicos) */}
        <div className="row g-3 mb-4">
          <MetricCard
            title="Total Productos"
            value={products.length}
            color="warning"
            icon="📚"
          />

          <MetricCard
            title="Stock Crítico (≤ 5 un.)"
            value={criticalStockProducts.length}
            color="danger"
            icon="⚠️"
          />

          <MetricCard
            title="Usuarios Registrados"
            value={usersCount}
            color="success"
            icon="👥"
          />

          <MetricCard
            title={`Ventas Totales (${ordersCount} órdenes)`}
            value={formatCLP(totalVentas)}
            color="dark"
            icon="💰"
          />
        </div>

        {/* 2. Tabla de Alerta de Stock Crítico */}
        <div className="card border-0 shadow-sm bg-white p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
            <div>
              <h4 className="fw-bold text-dark mb-0">⚠️ Alertas de Inventario y Stock Crítico</h4>
              <small className="text-muted">Mangas con 5 o menos unidades en inventario</small>
            </div>
            <Link to="/admin/productos" className="btn btn-warning btn-sm fw-bold rounded-pill px-3 shadow-sm">
              Gestionar Inventario &rarr;
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
                  {criticalStockProducts.map((p) => {
                    const currentStock = p.stock !== undefined && p.stock !== null ? Number(p.stock) : 0;
                    return (
                      <tr key={p.id}>
                        <td className="fw-bold">{p.codigo || `MANGA-${p.id}`}</td>
                        <td className="fw-bold text-dark">{p.nombre}</td>
                        <td><span className="badge bg-secondary">{p.categoria || 'Sin categoría'}</span></td>
                        <td>{formatCLP(p.precio)}</td>
                        <td className="text-center fw-extrabold fs-6 text-danger">{currentStock} un.</td>
                        <td className="text-center">
                          <span className={`badge ${currentStock === 0 ? 'bg-dark' : 'bg-danger'} text-white fw-bold px-3 py-1 rounded-pill`}>
                            {currentStock === 0 ? 'Agotado' : 'Reabastecer Urgente'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-success mb-0 fw-semibold text-center py-4">
              {products.length === 0 ? (
                <>
                  📦 Actualmente no hay productos registrados en el inventario.{' '}
                  <Link to="/admin/productos" className="fw-bold text-success text-decoration-underline">
                    Haz clic aquí para agregar tu primer manga
                  </Link>.
                </>
              ) : (
                '✅ Todos los mangas en el catálogo cuentan con un nivel de stock saludable (> 5 unidades).'
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
