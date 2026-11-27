package com.theonepage.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.theonepage.backend.model.Usuario;
import com.theonepage.backend.repository.UsuarioRepository;
import com.theonepage.backend.util.ValidadorUsuario;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController 
@RequestMapping("/api/usuarios") 
@CrossOrigin(origins = {"http://localhost:5173", "https://theonepage.vercel.app"}) 
@Tag(name = "Usuarios", description = "Endpoints para la gestión y mantenedor de cuentas de usuario") 
public class UsuarioController {
    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) { this.usuarioRepository = usuarioRepository; }

    @GetMapping @Operation(summary = "Listar todos los usuarios") 
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    @PostMapping 
    @Operation(summary = "Crear nuevo usuario con validación de RUN y Correo") 
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) { 
        if (!ValidadorUsuario.esRunValido(usuario.getRun())) { 
            return ResponseEntity.badRequest().body("El RUN ingresado no es válido según el algoritmo Módulo 11."); 
        } 
        if (!ValidadorUsuario.esCorreoValido(usuario.getCorreo())) { 
            return ResponseEntity.badRequest().body("El correo debe pertenecer a @duoc.cl, @profesor.duoc.cl o @gmail.com."); 
        } 
        if (usuarioRepository.existsByCorreo(usuario.getCorreo())) { 
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El correo ya se encuentra registrado."); 
        } 
        Usuario nuevo = usuarioRepository.save(usuario); 
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo); 
    }

    @DeleteMapping("/{id}") 
    @Operation(summary = "Eliminar un usuario por su ID") 
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
