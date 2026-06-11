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

//* solo contiene estado del usuario.
//* para agregar permisos se extiende via Rol, sin modificar esta clase.
//* Lombok @Getter/@Setter genera todos los getters/setters automáticamente.
//* Lombok @NoArgsConstructor genera el constructor vacío que JPA necesita.

@Entity
@Table(name = "usuario")
@Getter @Setter @NoArgsConstructor
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

    @NotBlank @Email
    @Column(name = "usuCorreo", nullable = false, unique = true, length = 150)
    private String correo;

    //* siempre almacenada con BCrypt. nunca en texto plano.
    //* los servicios que guardan o comparan contraseñas usan PasswordEncoder.
    @NotBlank
    @Column(name = "usuContrasena", nullable = false)
    private String contrasena;

    @Size(max = 20)
    @Column(name = "usuTelefono", length = 20)
    private String telefono;

    //* */ FK al rol → tabla `rol`
    //* los IDs 1 y 2 están hardcodeados en AuthServiceImpl y UsuarioApiController.
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "rolId_fk")
    private Rol rol;

    //* campos para el flujo "Olvidé mi contraseña"
    //* resetToken se genera en AuthServiceImpl.solicitarRecuperacion()
    //* resetTokenExpiry expira a los 15 minutos
    @Column(name = "resetToken", length = 200)
    private String resetToken;

    @Column(name = "resetTokenExpiry")
    private LocalDateTime resetTokenExpiry;

    //* una cuenta puede tener múltiples direcciones de envío → tabla usuario_direccion
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Direccion> direcciones = new ArrayList<>();

    //* una cuenta puede tener múltiples métodos de pago → tabla usuario_metodo_pago
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MetodoPago> metodosPago = new ArrayList<>();

    //* historial de compras del cliente → tabla orden
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Orden> ordenes = new ArrayList<>();
}