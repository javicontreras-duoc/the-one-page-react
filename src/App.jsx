import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Importación de Componentes Globales
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Importación de Páginas (TODO)
import Home from './pages/public/Home';
import Products from './pages/public/Products';
import Cart from './pages/public/Cart';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';

function App() {
    return (
        <CartProvider>
            <Router>
                {/* El Header se muestra fijo arriba en todas las vistas */}
                <Header />

                {/* Contenedor Principal de la App */}
                <main className="main-content min-vh-100 py-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/productos" element={<Products />} />
                        <Route path="/carrito" element={<Cart />} />
                        <Route path="/contacto" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </main>
            </Router>
        </CartProvider>
    );
}

export default App;