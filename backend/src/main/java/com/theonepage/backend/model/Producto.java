package com.theonepage.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;

@Entity
@Table(name = "productos")
@Schema(description = "Entidad que representa un tomo de manga o producto del catálogo")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único autogenerado", example = "1")
    private Long id;

    @Column(nullable = false, length = 20, unique = true) 
    @Schema(description = "Código único de producto", example = "mng-ds-01") 
    private String codigo;

    @Column(nullable = false, length = 100)
    @Schema(description = "Título o nombre del tomo de manga", example = "Demon Slayer Vol. 01")
    private String nombre;

    @Column(nullable = false)
    @Schema(description = "Categoría o demografía (Shonen, Seinen, Shojo)", example = "Shonen")
    private String categoria;

    @Column(length = 500)
    @Schema(description = "Sinopsis o descripción corta del tomo", example = "Tanjiro Kamado busca salvar a su hermana Nezuko...") 
    private String descripcion;

    @Column(nullable = false)
    @Schema(description = "Precio de venta en pesos chilenos (CLP)", example = "8490.0")
    private Double precio;

    @Column(nullable = false)
    @Schema(description = "Unidades disponibles en bodega", example = "10")
    private Integer stock;

    @Column(length = 255) 
    @Schema(description = "Ruta o URL de la imagen del producto", example = "/images/demon-slayer-01.webp")
    private String imagen;

    // --- CONSTRUCTORES ---
    public Producto() {}

    public Producto(String codigo, String nombre, String categoria, String descripcion, Double precio, Integer stock, String imagen) { 
        this.codigo = codigo; 
        this.nombre = nombre; 
        this.categoria = categoria; 
        this.descripcion = descripcion; 
        this.precio = precio; 
        this.stock = stock; 
        this.imagen = imagen; 
    }

    // --- LÓGICA DE NEGOCIO ---
    @Transient // No se guarda como columna física en la BD, se calcula dinámicamente 
    @Schema(description = "Indica si el stock es igual o inferior al umbral crítico (&lt;= 5)", example = "false") 
    public boolean isStockCritico() { 
        return this.stock != null && this.stock <= 5; 
    }

    // --- GETTERS Y SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) {this.nombre = nombre; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    
    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }
}
