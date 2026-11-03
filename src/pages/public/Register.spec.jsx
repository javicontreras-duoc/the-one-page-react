import React from 'react';

// Algoritmo Módulo 11 para validación de RUN Chileno
export const validarRutChileno = (rutCompleto) => {
  if (!rutCompleto) return false;
  const limpio = rutCompleto.replace(/[\.\-\s]/g, '').toUpperCase();
  if (limpio.length < 8 || limpio.length > 9) return false;

  const cuerpo = limpio.slice(0, -1);
  const dvIngresado = limpio.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  let dvCalculado = '0';
  if (resto === 11) dvCalculado = '0';
  else if (resto === 10) dvCalculado = 'K';
  else dvCalculado = resto.toString();

  return dvIngresado === dvCalculado;
};

// Validación de formato de Correo
const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

describe('Pruebas Unitarias - Validaciones de Formulario y Reglas de Negocio', () => {

  // Test 8: Algoritmo Módulo 11 para RUNs Válidos e Inválidos
  it('Test 8: Debe validar correctamente el RUN chileno usando el algoritmo Módulo 11', () => {
    // RUNs válidos sintácticamente
    expect(validarRutChileno('11.111.111-1')).toBe(true);
    expect(validarRutChileno('12.345.678-5')).toBe(true);
    expect(validarRutChileno('16.789.125-K')).toBe(true);

    // RUNs inválidos
    expect(validarRutChileno('12345678-0')).toBe(false); // DV Erróneo
    expect(validarRutChileno('11111111-9')).toBe(false);
    expect(validarRutChileno('abc')).toBe(false);
  });

  // Test 9: Validación de Correo Electrónico
  it('Test 9: Debe validar el formato correcto de correo electrónico', () => {
    expect(validarEmail('javiera@duoc.cl')).toBe(true);
    expect(validarEmail('estudiante@profesor.duoc.cl')).toBe(true);

    expect(validarEmail('correo-sin-arroba.cl')).toBe(false);
    expect(validarEmail('usuario@domain')).toBe(false);
  });

  // Test 10: Validación de Rango de Contraseña (4 a 10 caracteres)
  it('Test 10: Debe verificar que la contraseña cumpla con la regla de 4 a 10 caracteres', () => {
    const esPasswordValida = (pass) => pass.length >= 4 && pass.length <= 10;

    expect(esPasswordValida('1234')).toBe(true);
    expect(esPasswordValida('manga2026')).toBe(true);

    expect(esPasswordValida('123')).toBe(false); // Muy corta
    expect(esPasswordValida('contraseñasuperlargademasiadoscaracteres')).toBe(false); // Muy larga
  });

});
