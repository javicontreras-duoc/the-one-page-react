import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { db, collection, getDocs } from './services/firebase';

// Importación de Componentes Globales
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';

// Importación de Páginas 
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

function App() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'productos'));
                const loadedProducts = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(loadedProducts);
            } catch (error) {
                console.error('Error cargando productos de Firebase:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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