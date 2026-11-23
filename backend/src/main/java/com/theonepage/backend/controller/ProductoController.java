package com.theonepage.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {
    
    @GetMapping
    public List<String> obtenerMensajePrueba() {
        return List.of("Demon Slayer Vol. 01", "One Piece Vol. 100", "Berserk Vol. 01");
    }
    
}
