package com.SweetCreamPink.demoSpringBoot.Modelo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entidad Direccion — un usuario puede registrar N direcciones de envío.
 * Cada dirección pertenece exclusivamente a ese usuario (clave foránea).
 *
 * Tabla nueva: usuario_direccion
 */
@Entity
@Table(name = "usuario_direccion")
@Getter
@Setter
@NoArgsConstructor
public class Direccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuId_fk", nullable = false)
    private Usuario usuario;

    @NotBlank(message = "La dirección no puede estar vacía")
    @Column(nullable = false, length = 255)
    private String direccion;

    @Column(length = 100)
    private String distrito;

    @Column(length = 100)
    private String ciudad;

    @Column(length = 20)
    private String codigoPostal;

    /** Marca si es la dirección predeterminada del usuario */
    @Column(nullable = false)
    private boolean esPrincipal = false;

    @Column(length = 100)
    private String referencia;
}