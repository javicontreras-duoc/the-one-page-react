const API_URL = 'http://localhost:8080/api';

export const getProductos = async () => {
    const response = await fetch(`${API_URL}/productos`);
    if (!response.ok) throw new Error('Error al obtener catálogo');
  return response.json();
};

export const crearProducto = async (producto) => {
    const response = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
    });
    if (!response.ok) throw new Error('Error al crear producto');
    return response.json();
};
