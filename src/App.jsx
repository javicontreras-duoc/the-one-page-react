import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Importación de Componentes Globales
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';

// Importación de Páginas (TODO)
import Home from './pages/public/Home'; 
import Products from './pages/public/Products'; 
import ProductDetail from './pages/public/ProductDetail'; 
import Cart from './pages/public/Cart'; 
import Checkout from './pages/public/Checkout'; 
import Success from './pages/public/Success'; 
import About from './pages/public/About'; 
import Contact from './pages/public/Contact'; 
import Login from './pages/public/Login'; 
import Register from './pages/public/Register'; 
import Blogs from './pages/public/Blogs'; 
import BlogsDetail from './pages/public/BlogsDetail'; 
import Offers from './pages/public/Offers';

import Dashboard from './pages/admin/Dashboard'; 
import AdminProducts from './pages/admin/AdminProducts'; 
import AdminUsers from './pages/admin/AdminUsers';

// Catálogo inicial
const INITIAL_PRODUCTS = [
    {
        id: 1, 
        codigo: 'MNG-001', 
        nombre: 'One Piece Vol. 100', 
        categoria: 'Shonen', 
        precio: 8990, 
        stock: 12, 
        autor: 'Eiichiro Oda', 
        editorial: 'IVREA', 
        descripcion: 'El viaje de Luffy y los Sombrero de Paja llega a un hito histórico en la batalla por Wano.', 
        imagen: ''
    },
    {
        id: 2, 
        codigo: 'MNG-002', 
        nombre: 'Berserk Vol. 01', 
        categoria: 'Seinen', 
        precio: 12990, 
        stock: 3, // Stock Crítico 
        autor: 'Kentaro Miura', 
        editorial: 'Panini Manga', 
        descripcion: 'La obra maestra de la fantasía oscura. Sigue la historia del Espadachín Negro, Guts.', 
        imagen: ''
    },
    {
        id: 3, 
        codigo: 'MNG-003', 
        nombre: 'Demon Slayer Vol. 01', 
        categoria: 'Shonen', 
        precio: 8490, stock: 15, 
        autor: 'Koyoharu Gotouge', 
        editorial: 'IVREA', 
        descripcion: 'Tanjiro Kamado inicia su viaje para convertirse en cazador de demonios y curar a su hermana Nezuko.',
        imagen: ''
    },
    {
        id: 4, 
        codigo: 'MNG-004', 
        nombre: 'Fruit Basket Vol. 01', 
        categoria: 'Shojo', 
        precio: 9990, 
        stock: 4, // Stock Crítico }
        autor: 'Natsuki Takaya', 
        editorial: 'Panini Manga', 
        descripcion: 'Tohru Honda descubre el secreto de la familia Sohma y la maldición del zodiaco chino.',
        imagen: ''
    }
]

function App() {

    const [products, setProducts] = useState(() => { 
        try { 
            const savedProducts = localStorage.getItem('manga_products'); 
            return savedProducts ? JSON.parse(savedProducts) : [];
        } catch (error) { 
            console.error('Error cargando inventario:', error); 
            return []; 
        } 
    });

    useEffect(() => { 
        try { 
            localStorage.setItem('manga_products', JSON.stringify(products)); 
        } catch (error) { 
            console.error('Error guardando inventario:', error); 
        } 
    }, [products]);

    const [toast, setToast] = useState({ message: '', type: 'success' });

    const showToast = (message, type = 'success') => { 
        setToast({ message, type }); 
        setTimeout(() => { 
            setToast({ message: '', type: 'success' }); 
        }, 3500); 
    };

    return (
        <CartProvider>
            <Router>
                {/* Encabezado Fijo Global */}
                <Header />

                {/* Notificación Flotante Toast */}
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ message: '', type: 'success' })}
                />

                {/* Contenedor Principal de la App */}
                <main className="main-content min-vh-100">
                    <Routes>
                        <Route path="/" element={<Home products={products} showToast={showToast} />} />
                        <Route path="/productos" element={<Products products={products} showToast={showToast} />} />
                        <Route path="/producto/:id" element={<ProductDetail products={products} showToast={showToast} />} />
                        <Route path="/carrito" element={<Cart showToast={showToast} />} />
                        <Route path="/checkout" element={<Checkout showToast={showToast} />} />
                        <Route path="/exito" element={<Success />} />
                        <Route path="/nosotros" element={<About />} />
                        <Route path="/contacto" element={<Contact showToast={showToast} />} />
                        <Route path="/login" element={<Login showToast={showToast} />} />
                        <Route path="/registro" element={<Register showToast={showToast} />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/blog/:id" element={<BlogsDetail />} />
                        <Route path="/ofertas" element={<Offers products={products} showToast={showToast} />} />

                        <Route path="/admin/dashboard" element={<Dashboard products={products} />} />
                        <Route
                            path="/admin/productos"
                            element={<AdminProducts products={products} setProducts={setProducts} showToast={showToast} />}
                        />
                        <Route path="/admin/usuarios" element={<AdminUsers showToast={showToast} />} />
                    </Routes>
                </main>

                <Footer />
            </Router>
        </CartProvider>
    );
}

export default App;