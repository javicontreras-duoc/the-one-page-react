import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const Header = () => {
    //obtener cantidad total de artículos desde el estado global
    const { cart } = useCart();
    const totalItems = cart ? cart.reduce((acc, item) => acc + item.cantidad, 0) : 0;

    return (
        <header className="header-main bg-dark sticky-top shadow-sm border-bottom border-warning border-3">
            <div className="container-fluid px-4 d-flex justify-content-between align-items-center py-2">
                {/* 1. Logo */}
                <Link to="/" className="brand-logo d-flex align-items-center gap-2 text-decoration-none">
                    <img 
                        src="/img/logo.png" 
                        alt="The One Page Logo" 
                        className="header-logo" 
                        style={{ height: '40px', objectFit: 'contain' }} 
                    />
                </Link>

                {/* 2. Menú de Navegación Principal */}
                <nav className="nav-menu">
                    <ul className="nav nav-pills gap-2 mb-0">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) => 
                                    `nav-link text-light fw-semibold ${isActive ? 'bg-warning text-dark active' : ''}`}
                                end
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/productos"
                                className={({ isActive }) => 
                                    `nav-link text-light fw-semibold ${isActive ? 'bg-warning text-dark active' : ''}`}
                                end
                            >
                                Productos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/Nosotros"
                                className={({ isActive }) => 
                                    `nav-link text-light fw-semibold ${isActive ? 'bg-warning text-dark active' : ''}`}
                                end
                            >
                                Nosotros
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/blogs"
                                className={({ isActive }) => 
                                    `nav-link text-light fw-semibold ${isActive ? 'bg-warning text-dark active' : ''}`}
                                end
                            >
                                Blogs
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/contacto"
                                className={({ isActive }) => 
                                    `nav-link text-light fw-semibold ${isActive ? 'bg-warning text-dark active' : ''}`}
                                end
                            >
                                Contacto
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* 3. Acciones de usuario, admin y carrito */}
                <div className="user-cart-actions d-flex align-items-center gap-2">
                    {/* Botón directo al Dashboard de Administración */}
                    <Link to="/admin/dashboard"></Link>
                </div>
            </div>
        </header>
    )
}