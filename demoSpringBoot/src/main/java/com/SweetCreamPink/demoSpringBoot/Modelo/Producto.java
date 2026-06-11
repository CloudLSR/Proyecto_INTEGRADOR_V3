package com.SweetCreamPink.demoSpringBoot.Modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Entidad Producto — un postre de la pastelería
 * Pertenece a una Categoria y tiene N variantes
 */
@Entity
@Table(name = "producto")
@Getter
@Setter
@NoArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "proId") //? el campo se llama "id" aunque la columna sea "proId".
    private Integer id; 

    @Column(name = "proNombre", nullable = false, length = 50)
    private String nombre;

    //* FetchType.EAGER: la categoría siempre se carga junto al producto (necesario para el front)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "catId_fk")
    private Categoria categoria;

    // cascade ALL: si se borra un producto, se borran sus variantes también
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<ProductoVariante> variantes = new ArrayList<>();

    @Column(length = 255)
    private String descripcion;

    @Column
    private Double precio;

    @Column(name = "imagenUrl", length = 300)
    private String imagenUrl;
}