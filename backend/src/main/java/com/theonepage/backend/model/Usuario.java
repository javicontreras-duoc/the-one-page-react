package com.theonepage.backend.model;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name = "usuarios")
@Schema (description = "Entidad que representa a un usuario registrado o administrador de la plataforma")
public class Usuario {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "ID único autogenerado", example = "1")
    private Long id;

    @Column(nullable = false, length = 12, unique = true) 
    @Schema(description = "RUN chileno del usuario (con o sin formato)", example = "16789124K") 
    private String run;

    @Column(nullable = false, length = 50) 
    @Schema(description = "Nombres del usuario", example = "Bastián") 
    private String nombre;

    @Column(nullable = false, length = 100) 
    @Schema(description = "Apellidos del usuario", example = "Jara") 
    private String apellidos;

    @Column(nullable = false, length = 100, unique = true) 
    @Schema(description = "Correo electrónico (@duoc.cl, @profesor.duoc.cl o @gmail.com)", example = "bastian@duoc.cl") 
    private String correo;

    @Column(nullable = false, length = 255) 
    @Schema(description = "Contraseña encriptada o protegida", example = "123456") 
    private String password;

    @Schema(description = "Fecha de nacimiento (opcional)", example = "2000-05-15") 
    private LocalDate fechaNacimiento;

    @Schema(description = "Teléfono de contacto (opcional)", example = "+56912345678") 
    private String telefono;

    @Column(length = 100) 
    @Schema(description = "Región de residencia", example = "Región Metropolitana de Santiago") 
    private String region;

    @Column(length = 100) 
    @Schema(description = "Comuna de residencia", example = "Santiago") 
    private String comuna;

    @Column(length = 300) 
    @Schema(description = "Dirección exacta de despacho", example = "Av. España 8, Dpto 402") 
    private String direccion;

    @Enumerated(EnumType.STRING) 
    @Column(nullable = false, length = 20)
     @Schema(description = "Rol del usuario en el sistema", example = "ROLE_CLIENTE") 
     private Rol rol = Rol.ROLE_CLIENTE;

    @Column(nullable = false) 
    @Schema(description = "Estado activo/inactivo de la cuenta", example = "true") 
    private Boolean activo = true;

    // --- CONSTRUCTORES ---
    public Usuario() {}

    public Usuario(String run, String nombre, String apellidos, String correo, String password, Rol rol) { 
        this.run = run; 
        this.nombre = nombre; 
        this.apellidos = apellidos; 
        this.correo = correo; 
        this.password = password; 
        this.rol = rol != null ? rol : Rol.ROLE_CLIENTE; 
    }

    // --- GETTERS Y SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRun() { return run; }
    public void setRun(String run) { this.run = run; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public LocalDate getFechaNacimiento() { return fechaNacimiento; }
    public void setFechaNacimiento(LocalDate fechaNacimiento) { this.fechaNacimiento = fechaNacimiento; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public String getComuna() { return comuna; }
    public void setComuna(String comuna) { this.comuna = comuna; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public Rol getRol() { return rol; }
    public void setRol(Rol rol) { this.rol = rol; }

    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }
}
