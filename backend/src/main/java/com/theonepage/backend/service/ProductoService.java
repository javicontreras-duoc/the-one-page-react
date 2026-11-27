package com.theonepage.backend.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.theonepage.backend.model.Producto;
import com.theonepage.backend.repository.ProductoRepository;

@Service 
public class ProductoService {
    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) { 
        this.productoRepository = productoRepository; 
    }

    // Obtenemos todos los registros
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    // Buscamos un registro por su ID
    public Optional<Producto> obtenerPorId(Long id) { 
        return productoRepository.findById(id); 
    }

    // Guardar o actualizar
    public Producto guardarProducto(Producto producto) { 
        return productoRepository.save(producto); 
    }

    // Eliminar por ID
    public boolean eliminarProducto(Long id) { 
        if (productoRepository.existsById(id)) { 
            productoRepository.deleteById(id); return true; 
        } return false; 
    }
}
