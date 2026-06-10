package com.SweetCreamPink.demoSpringBoot.Modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Entidad Producto — un postre de la pastelería (ej: Cupcakes Especiales).
 * Pertenece a una Categoria y tiene N variantes (sabores/tamaños).
 */
@Entity
@Table(name = "producto")
@Getter
@Setter
@NoArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "proId")
    private Integer id;

    @Column(name = "proNombre", nullable = false, length = 50)
    private String nombre;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "catId_fk")
    private Categoria categoria;

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<ProductoVariante> variantes = new ArrayList<>();

    // ── Campos de la tabla 'productos' (catálogo con imagen) ────
    @Column(length = 255)
    private String descripcion;

    @Column
    private Double precio;

    @Column(name = "imagenUrl", length = 300)
    private String imagenUrl;
}