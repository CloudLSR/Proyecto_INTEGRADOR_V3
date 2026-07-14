package com.SweetCreamPink.demoSpringBoot.Modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * representa un pedido completo del cliente.
 * cada orden tiene N detalles (productos + cantidades).
 * sirve como historial de compras en el perfil del usuario.
 */
@Entity
@Table(name = "orden")
@Getter
@Setter
@NoArgsConstructor
public class Orden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ordId")
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuId_fk")
    private Usuario usuario;

    @Column(name = "ordFecha")
    private LocalDateTime fecha = LocalDateTime.now();

    @Column(name = "ordTotal")
    private Double total = 0.0;  //? se recalcula en OrdenServiceImpl al crear la orden

    // NUEVO (aditivo, no afecta el cálculo de "total" de arriba) Costo de envío elegido en el checkout (Carrito.js). Se guarda aparte porque "total" solo representa la suma de los productos.
    @Column(name = "ordCostoEnvio")
    private Double costoEnvio = 0.0;

    // Código único para que el cliente haga seguimiento de su pedido (se genera automáticamente en OrdenServiceImpl.crearOrden, formato "SRC-{año}-{id con 4 dígitos}").
    @Column(name = "ordCodigoSeguimiento", length = 40, unique = true)
    private String codigoSeguimiento;

    @Column(name = "ordDireccionEntrega", columnDefinition = "TEXT")
    private String direccionEntrega;

    @Enumerated(EnumType.STRING)
    @Column(name = "ordMetodoPago", length = 30)
    private MetodoPagoOrden metodoPago;

    @Enumerated(EnumType.STRING)
    @Column(name = "ordTipoEntrega", length = 20)
    private TipoEntrega tipoEntrega = TipoEntrega.Recojo;

    //* el admin cambia el estado desde AdminPedidosController
    @Enumerated(EnumType.STRING)
    @Column(name = "ordEstado", length = 20)
    private EstadoOrden estado = EstadoOrden.Pendiente;

    @OneToMany(mappedBy = "orden", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<DetalleOrden> detalles = new ArrayList<>();

    public enum MetodoPagoOrden {
        Efectivo, Transferencia, Tarjeta, Yape
    }

    public enum TipoEntrega {
        Delivery, Recojo, ConsumoLocal
    }

    public enum EstadoOrden {
        Pendiente, Preparando, Enviado, Entregado, Cancelado
    }
}