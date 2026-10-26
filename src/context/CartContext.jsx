import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser utilizado dentro de un CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error al cargar el carrito desde localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Error al guardar el carrito en localStorage:', error);
        }
    }, [cart]);
    
    // A) Agregar Producto al Carrito
    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingIndex] = {
                    ...updatedCart[existingIndex],
                    cantidad: updatedCart[existingIndex].cantidad + quantity
                };
                return updatedCart;
            } else {
                return [...prevCart, { ...product, cantidad: quantity }];
            }
        });
    };

    // B) Remover Producto por ID
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    }

    // C) Modificar Cantidad de un Producto
    const updateQuantity = (productId, quantity) => {
        if (newQuantity < 1) return;
        setCart((prevCart) => 
            prevCart.map(item =>
                item.id === productId ? { ...item, cantidad: quantity } : item
            )
        );
    };

    // D) Vaciar el Carrito Completo
    const clearCart = () => {
        setCart([]);
    };

    // E) Obtener Total en Pesos (\$ CLP)
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
    };

    // F) Obtener Cantidad Total de Unidades
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.cantidad, 0);
    };

    return (
        <CartContext.CartProvider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getTotalItems
            }}
        >
            {children}
        </CartContext.CartProvider>
    );
};

export default CartContext;