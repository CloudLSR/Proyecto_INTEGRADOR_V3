package com.SweetCreamPink.demoSpringBoot.Modelo;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidad Usuario — almacena toda la información del cliente:
 * datos personales, contraseña encriptada, rol, historial de
 * direcciones y métodos de pago.
 *
 * Principio SOLID aplicado:
 *   SRP — solo contiene estado del usuario.
 *   OCP — extensible mediante Rol sin modificar esta clase.
 */
@Entity
@Table(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuId")
    private Integer id;

    @NotBlank(message = "El nombre es obligatorio")
    @Column(name = "usuNombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "usuApellido", length = 100)
    private String apellido;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "Formato de correo inválido")
    @Column(name = "usuCorreo", nullable = false, unique = true, length = 150)
    private String correo;

    /** Siempre almacenada con BCrypt — NUNCA en texto plano */
    @NotBlank(message = "La contraseña es obligatoria")
    @Column(name = "usuContrasena", nullable = false)
    private String contrasena;

    @Size(max = 20, message = "Teléfono máximo 20 caracteres")
    @Column(name = "usuTelefono", length = 20)
    private String telefono;

    /** FK al rol (1=Admin, 2=Cliente) */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "rolId_fk")
    private Rol rol;

    // ── Campos de recuperación de contraseña ────────────────────
    @Column(name = "resetToken", length = 200)
    private String resetToken;

    @Column(name = "resetTokenExpiry")
    private LocalDateTime resetTokenExpiry;

    // ── Relaciones ───────────────────────────────────────────────

    /** Una cuenta puede tener múltiples direcciones de envío */
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Direccion> direcciones = new ArrayList<>();

    /** Una cuenta puede tener múltiples métodos de pago guardados */
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MetodoPago> metodosPago = new ArrayList<>();

    /** Historial de órdenes del cliente */
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Orden> ordenes = new ArrayList<>();
}