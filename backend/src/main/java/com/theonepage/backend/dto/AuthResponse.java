package com.theonepage.backend.dto;

import com.theonepage.backend.model.Rol;

public class AuthResponse { 
    private String token; 
    private Long id; 
    private String nombre; 
    private String correo; 
    private Rol rol; 
    
    public AuthResponse(String token, Long id, String nombre, String correo, Rol rol) { 
        this.token = token; 
        this.id = id; 
        this.nombre = nombre; 
        this.correo = correo; 
        this.rol = rol; 
    } 
    
    public String getToken() { return token; } 
    public Long getId() { return id; } 
    public String getNombre() { return nombre; } 
    public String getCorreo() { return correo; } 
    public Rol getRol() { return rol; } 
}