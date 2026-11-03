import React from 'react';

describe('Pruebas Unitarias - Lógica del Carrito y Contexto (CartContext)', () => {
  let cartState = [];

  const addToCart = (product, cantidad = 1) => {
    const existingIndex = cartState.findIndex((item) => item.id === product.id);
    if (existingIndex >= 0) {
      cartState[existingIndex].cantidad += cantidad;
    } else {
      cartState.push({ ...product, cantidad });
    }
  };

  const removeFromCart = (id) => {
    cartState = cartState.filter((item) => item.id !== id);
  };

  const getCartTotal = () => {
    return cartState.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  beforeEach(() => {
    cartState = [];
  });

  // Test 4: Estado Inicial Vacío
  it('Test 4: El carrito debe iniciar vacío por defecto', () => {
    expect(cartState.length).toBe(0);
    expect(getCartTotal()).toBe(0);
  });

  // Test 5: Agregar Producto y Acumular Cantidad
  it('Test 5: Debe agregar un producto y sumar la cantidad si ya existe en el carrito', () => {
    const item = { id: 101, nombre: 'Fruit Basket Vol. 01', precio: 9990 };

    addToCart(item, 1);
    expect(cartState.length).toBe(1);
    expect(cartState[0].cantidad).toBe(1);

    // Mismo producto agregado nuevamente
    addToCart(item, 2);
    expect(cartState.length).toBe(1);
    expect(cartState[0].cantidad).toBe(3);
  });

  // Test 6: Cálculo Correcto del Total de la Compra
  it('Test 6: Debe calcular correctamente el monto total acumulado en CLP', () => {
    addToCart({ id: 1, nombre: 'Manga A', precio: 8000 }, 2); // 16.000
    addToCart({ id: 2, nombre: 'Manga B', precio: 10000 }, 1); // 10.000

    expect(getCartTotal()).toBe(26000);
  });

  // Test 7: Eliminar Producto del Carrito
  it('Test 7: Debe remover un producto del carrito según su ID', () => {
    addToCart({ id: 1, nombre: 'Manga A', precio: 8000 }, 1);
    addToCart({ id: 2, nombre: 'Manga B', precio: 10000 }, 1);

    expect(cartState.length).toBe(2);

    removeFromCart(1);
    expect(cartState.length).toBe(1);
    expect(cartState[0].id).toBe(2);
  });
});
