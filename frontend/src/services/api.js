const API_URL = 'http://localhost:8080/api';

export const getProductosAPI = async () => {
  const response = await fetch(`${API_URL}/productos`);
  if (!response.ok) throw new Error('Error al conectar con Spring Boot');
  return response.json();
};