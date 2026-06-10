package com.SweetCreamPink.demoSpringBoot.Modelo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Entidad Comentario — reseña de un cliente sobre un producto.
 * Requiere aprobación del admin antes de ser pública.
 */
@Entity
@Table(name = "comentarios")
@Getter
@Setter
@NoArgsConstructor
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuId_fk")
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proId_fk")
    private Producto producto;

    @NotBlank(message = "El contenido no puede estar vacío")
    @Column(nullable = false, length = 500)
    private String contenido;

    @Column(length = 100)
    private String nombre;

    /** 1-5 estrellas */
    @Column
    private Integer calificacion;

    @Column(nullable = false)
    private boolean aprobado = false;

    @Column
    private LocalDateTime fechaCreacion = LocalDateTime.now();
}