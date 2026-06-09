package Modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidad Orden — representa un pedido completo del cliente.
 * Cada orden tiene N detalles (productos + cantidades).
 * Sirve como historial de compras en el perfil del usuario.
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuId_fk")
    private Usuario usuario;

    @Column(name = "ordFecha")
    private LocalDateTime fecha = LocalDateTime.now();

    @Column(name = "ordTotal")
    private Double total = 0.0;

    @Column(name = "ordDireccionEntrega", columnDefinition = "TEXT")
    private String direccionEntrega;

    @Enumerated(EnumType.STRING)
    @Column(name = "ordMetodoPago", length = 30)
    private MetodoPagoOrden metodoPago;

    @Enumerated(EnumType.STRING)
    @Column(name = "ordEstado", length = 20)
    private EstadoOrden estado = EstadoOrden.Pendiente;

    @OneToMany(mappedBy = "orden", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleOrden> detalles = new ArrayList<>();

    public enum MetodoPagoOrden {
        Efectivo, Transferencia, Tarjeta, Yape
    }

    public enum EstadoOrden {
        Pendiente, Preparando, Enviado, Entregado, Cancelado
    }
}