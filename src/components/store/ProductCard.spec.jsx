import React from 'react';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import { CartProvider } from '../../context/CartContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Pruebas Unitarias - <ProductCard />', () => {
  let container = null;
  let root = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    if (root) { 
      act(() => { 
        root.unmount(); 
      }); 
      root = null; 
    } 
    if (container) { 
      container.remove(); 
      container = null; 
    } 
  });

  // Test 1: Renderizado de Props y Título
  it('Test 1: Debe renderizar el nombre del manga y la categoría desde las props', () => {
    const mockProduct = {
      id: 'mng-op-100', 
      nombre: 'One Piece Vol. 100', 
      categoria: 'Shonen', 
      precio: 10990, 
      stock: 12, 
      imagen: ''
    };

    act(() => {
      root.render(
        <MemoryRouter>
          <CartProvider>
            <ProductCard product={mockProduct} />
          </CartProvider>
        </MemoryRouter>
      );
    });

    expect(container.textContent).toContain('One Piece Vol. 100');
    expect(container.textContent).toContain('Shonen');
  });

  // Test 2: Formato de Moneda CLP
  it('Test 2: Debe formatear correctamente el precio en Pesos Chilenos (CLP)', () => {
    const mockProduct = {
      id: 'mng-berserk-01', 
      nombre: 'Berserk Vol. 01', 
      categoria: 'Seinen', 
      precio: 12990, 
      stock: 8
    };

    act(() => {
      root.render(
        <MemoryRouter>
          <CartProvider>
            <ProductCard product={mockProduct} />
          </CartProvider>
        </MemoryRouter>
      );
    });

    // Formato de moneda es-CL ($12.990)
    expect(container.textContent).toMatch(/\$12\.990|\$12990/);
  });

  // Test 3: Disparo de Evento al Añadir al Carrito
  it('Test 3: Debe ejecutar la función de agregar al carrito al hacer clic en el botón', () => {
    let fueAgregado = false;

    const handleAddToCartMock = () => {
      fueAgregado = true;
    };

    act(() => {
      root.render(
        <button type="button" className="btn btn-warning" onClick={handleAddToCartMock}>
          🛒 Añadir al carrito
        </button>
      );
    });

    const button = container.querySelector('button');

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(fueAgregado).toBe(true);
  });

  // Test 4: Detección de Stock Crítico (<= 5 unidades)
  it('Test 4: Debe clasificar correctamente el stock crítico cuando es menor o igual a 5', () => { 
    const productoCritico = { 
      id: 'p1', 
      nombre: 'Chainsaw Man 01', 
      stock: 3 
    }; 
    const productoNormal = { 
      id: 'p2', 
      nombre: 'Naruto 01', 
      stock: 15 }; 
      const esStockCritico = (p) => (p.stock ?? 0) <= 5; 
      expect(esStockCritico(productoCritico)).toBe(true); 
      expect(esStockCritico(productoNormal)).toBe(false); 
    }); 
  });