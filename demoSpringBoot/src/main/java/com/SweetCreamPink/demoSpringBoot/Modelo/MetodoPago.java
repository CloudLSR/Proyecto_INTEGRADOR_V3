package com.SweetCreamPink.demoSpringBoot.Modelo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entidad MetodoPago — guarda los métodos de pago del usuario.
 * Tipos soportados: VISA, BANCO, YAPE.
 *
 * NOTA DE SEGURIDAD: Nunca guardar número de tarjeta completo.
 * Solo se almacena los últimos 4 dígitos (para Visa) o el
 * número de celular (para Yape).
 *
 * Tabla nueva: usuario_metodo_pago
 */
@Entity
@Table(name = "usuario_metodo_pago")
@Getter
@Setter
@NoArgsConstructor
public class MetodoPago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuId_fk", nullable = false)
    private Usuario usuario;

    @NotNull(message = "El tipo de pago es obligatorio")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoPago tipo;

    /** Alias o apodo: "Mi Visa Personal", "Yape Principal" */
    @NotBlank(message = "El alias es obligatorio")
    @Column(length = 80)
    private String alias;

    /**
     * Para VISA: últimos 4 dígitos ("**** **** **** 4321").
     * Para YAPE / BANCO: número de celular o cuenta (últimos 4 dígitos).
     */
    @Column(length = 10)
    private String ultimosDigitos;

    /** Nombre del titular impreso en la tarjeta (solo para VISA) */
    @Column(length = 100)
    private String titular;

    /** Nombre del banco (BCP, Interbank, BBVA...) — para BANCO y VISA */
    @Column(length = 80)
    private String banco;

    @Column(nullable = false)
    private boolean esPrincipal = false;

    public enum TipoPago {
        VISA, BANCO, YAPE
    }
}