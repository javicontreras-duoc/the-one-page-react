import React from 'react'; 
import { NavLink, Link } from 'react-router-dom';

export const Sidebar = () => {
    return (
        <aside 
            className="bg-dark text-white p-3 min-vh-100 border-end border-warning border-3 d-flex flex-column justify-content-between"
            style={{ minWidth: '240px' }}
        >
            <div>
                

                {/* Menú de Navegación Lateral */}
                <ul className="nav nav-pills flex-column gap-2 mb-auto">
                    <li className="nav-item">
                        <NavLink
                            to="/admin/dashboard"
                            className={({ isActive }) =>
                                `nav-link fw-semibold d-flex align-items-center gap-2 ${ isActive ? 'bg-warning text-dark active' : 'text-light' }`
                            }
                        >
                            📊 Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/admin/productos"
                            className={({ isActive }) =>
                                `nav-link fw-semibold d-flex align-items-center gap-2 ${ isActive ? 'bg-warning text-dark active' : 'text-light' }`
                            }
                        >
                            📚 Gestor de Productos
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/admin/usuarios"
                            className={({ isActive }) =>
                                `nav-link fw-semibold d-flex align-items-center gap-2 ${ isActive ? 'bg-warning text-dark active' : 'text-light' }`
                            }
                        >
                            👥 Gestor de Usuarios
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Botón para volver a la tienda pública */}
            <div className="pt-3 border-top border-secondary">
                <Link to="/" className="btn btn-outline-warning w-100 btn-sm fw-bold">
                    ← Volver a la Tienda
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;