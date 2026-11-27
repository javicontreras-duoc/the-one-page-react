package com.theonepage.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository; 
import org.springframework.stereotype.Repository;
import com.theonepage.backend.model.Producto;

import java.util.List; 

@Repository public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Método personalizado para filtrar por categoría
    List<Producto> findByCategoriaIgnoreCase(String categoria);
}