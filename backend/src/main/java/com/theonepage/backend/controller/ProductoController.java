package com.theonepage.backend.controller;

import com.theonepage.backend.model.Producto; 
import com.theonepage.backend.service.ProductoService; 
import io.swagger.v3.oas.annotations.Operation; 
import io.swagger.v3.oas.annotations.responses.ApiResponse; 
import io.swagger.v3.oas.annotations.tags.Tag; 
import org.springframework.http.HttpStatus; 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = {"http://localhost:5173", "https://theonepage.vercel.app"})
@Tag(name = "Productos", description = "Endpoints para operaciones CRUD sobre el catálogo de mangas e inventarios")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) { 
        this.productoService = productoService; 
    }
    
    // 1. READ ALL: GET /api/productos
    @GetMapping
    @Operation(summary = "Listar catálogo de mangas", description = "Retorna el arreglo completo de productos.")
    public ResponseEntity<List<Producto>> listarTodos() { 
        return ResponseEntity.ok(productoService.listarProductos());
    }

    // 2. READ SINGLE: GET /api/productos/{id}
    @GetMapping("/{id}") 
    @Operation(summary = "Obtener manga por ID", description = "Retorna la información técnica de un tomo específico.") 
    @ApiResponse(responseCode = "200", description = "Producto encontrado") 
    @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable  Long id) {
        return productoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. CREATE: POST /api/productos
    @PostMapping 
    @Operation(summary = "Crear nuevo producto", description = "Registra un nuevo manga en la base de datos.") 
    @ApiResponse(responseCode = "201", description = "Producto creado con éxito") 
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto) {
        Producto creado = productoService.guardarProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    // 4. UPDATE: PUT /api/productos/{id}
    @PutMapping("/{id}") 
    @Operation(summary = "Actualizar producto existente", description = "Modifica los campos de un manga existente.") 
    @ApiResponse(responseCode = "200", description = "Producto actualizado exitosamente") 
    @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @RequestBody Producto producto) {
        return productoService.obtenerPorId(id)
                .map(existingProducto -> {
                    existingProducto.setNombre(producto.getNombre());
                    existingProducto.setCategoria(producto.getCategoria());
                    existingProducto.setPrecio(producto.getPrecio());
                    existingProducto.setStock(producto.getStock());
                    existingProducto.setImagen(producto.getImagen());
                    Producto actualizado = productoService.guardarProducto(existingProducto);
                    return ResponseEntity.ok(actualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 5. DELETE: DELETE /api/productos/{id}
    @DeleteMapping("/{id}") 
    @Operation(summary = "Eliminar producto", description = "Remueve permanentemente un manga por su ID.") 
    @ApiResponse(responseCode = "204", description = "Producto eliminado correctamente") 
    @ApiResponse(responseCode = "404", description = "Producto no encontrado") 
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        if (productoService.eliminarProducto(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
