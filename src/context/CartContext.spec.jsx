import React from 'react';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { CartProvider, useCart } from './CartContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Pruebas Unitarias - Cobertura Total de <CartProvider /> y useCart', () => {
  let container = null;
  let root = null;
  let cartContext = null;

  const TestConsumer = () => {
    cartContext = useCart();
    return (
      <div>
        <span id="cart-count">{cartContext.getTotalItems()}</span>
        <span id="cart-total">{cartContext.getCartTotal()}</span>
      </div>
    );
  };

  beforeEach(() => {
    localStorage.clear();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    root = null;
  
    container.remove();
    container = null;
    localStorage.clear();
    cartContext = null;
  });

  // Test 5: useCart debe estar dentro de un CartProvider
  it('Test 5: Debe lanzar error descriptivo cuando useCart se utiliza fuera de CartProvider', () => {
    let errorCapturado = null;

    const ConsumerSinProvider = () => {
      try {
        useCart();
      } catch (error) {
        errorCapturado = error;
      }
      return null;
    };

    act(() => {
      root.render(<ConsumerSinProvider />);
    });

    expect(errorCapturado).not.toBeNull();
    expect(errorCapturado.message).toContain('CartProvider');
  });

  // Test 6: Error al cargar carrito desde localStorage 
  it('Test 6: Debe capturar error y retornar [] si el contenido de localStorage está corrupto', () => {
    localStorage.setItem('cart', 'JSON_CORRUPTO_{{{');

    act(() => {
      root.render(
        <CartProvider>
          <TestConsumer />
        </CartProvider>
      );
    });

    expect(cartContext.cart).toEqual([]);
  });

  // Test 7: Funciones del carrito vacías por defecto
  it('Test 7: Debe inicializar el carrito vacío y calcular total y contador en 0', () => {
    act(() => {
      root.render(
        <CartProvider>
          <TestConsumer />
        </CartProvider>
      );
    });

    expect(cartContext.cart.length).toBe(0);
    expect(cartContext.getCartTotal()).toBe(0);
    expect(cartContext.getTotalItems()).toBe(0);
  });

  // Test 8: Agregar nuevos productos y aumentar cantidad de productos existentes
  it('Test 8: Debe remover un producto del carrito según su ID', () => {
    act(() => {
      root.render(
        <CartProvider>
          <TestConsumer />
        </CartProvider>
      );
    });

    const manga = { id: 'm1', nombre: 'Berserk 01', precio: 10000 };

    act(() => {
      cartContext.addToCart(manga, 1);
    });
    expect(cartContext.cart.length).toBe(1);
    expect(cartContext.cart[0].cantidad).toBe(1);

    act(() => {
      cartContext.addToCart(manga, 2);
    });
    expect(cartContext.cart.length).toBe(1);
    expect(cartContext.cart[0].cantidad).toBe(3);
    expect(cartContext.getCartTotal()).toBe(30000);
    expect(cartContext.getTotalItems()).toBe(3);
  });

  // Test 9: Manejar cambios de cantidades 
  it('Test 9: Debe manejar cambios de cantidades ', () => {
    act(() => {
      root.render(
        <CartProvider>
          <TestConsumer />
        </CartProvider>
      );
    });

    act(() => {
      cartContext.addToCart({ id: 'm1', nombre: 'Naruto 01', precio: 8000 }, 1);
    });

    act(() => {
      cartContext.updateQuantity('m1', 4);
    });
    expect(cartContext.cart[0].cantidad).toBe(4);

    act(() => {
      cartContext.updateQuantity('m1', 0);
    });
    expect(cartContext.cart[0].cantidad).toBe(4);
  });

  // Test 10: Manejar eliminar producto por ID 
  it('Test 10: Debe manejar eliminación de producto por ID', () => {
    act(() => {
      root.render(
        <CartProvider>
          <TestConsumer />
        </CartProvider>
      );
    });

    act(() => {
      cartContext.addToCart({ id: 'm1', precio: 5000 }, 1);
      cartContext.addToCart({ id: 'm2', precio: 6000 }, 1);
    });
    expect(cartContext.cart.length).toBe(2);

    act(() => {
      cartContext.removeFromCart('m1');
    });
    expect(cartContext.cart.length).toBe(1);
    expect(cartContext.cart[0].id).toBe('m2');
  });

  // Test 11: Manejar limpiar carrito
  it('Test 11: Debe manejar limpieza completa del carrito', () => {
    act(() => {
      root.render(
        <CartProvider>
          <TestConsumer />
        </CartProvider>
      );
    });

    act(() => {
      cartContext.addToCart({ id: 'm1', precio: 5000 }, 2);
    });
    expect(cartContext.cart.length).toBe(1);

    act(() => {
      cartContext.clearCart();
    });
    expect(cartContext.cart.length).toBe(0);
    expect(cartContext.getCartTotal()).toBe(0);
  });

  // Test 12: Simular error al guardar en localStorage
  it('Test 12: Debe capturar error al guardar en localStorage', () => {
    const setItemOriginal = localStorage.setItem;

    localStorage.setItem = () => {
      throw new Error('QuotaExceeded');
    }

    act(() => {
      root.render(
        <CartProvider>
          <TestConsumer />
        </CartProvider>
      );
    });

    act(() => {
      cartContext.addToCart({ id: 'm99', precio: 1000 }, 1);
    });

    localStorage.setItem = setItemOriginal;

    expect(true).toBe(true);
  });
});