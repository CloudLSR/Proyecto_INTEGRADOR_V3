package Modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entidad DetalleOrden — una línea del pedido:
 * qué producto/variante, cuántos y a qué precio.
 */
@Entity
@Table(name = "detalles_orden")
@Getter
@Setter
@NoArgsConstructor
public class DetalleOrden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "detoId")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ordId_fk")
    private Orden orden;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "proId_fk")
    private Producto producto;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "varId_fk")
    private ProductoVariante variante;

    @Column(name = "detoCantidad")
    private Integer cantidad;

    @Column(name = "detoPrecio")
    private Double precio;

    @Column(name = "detoSubTotal")
    private Double subTotal;

    /** Calcula el subtotal antes de persistir */
    @PrePersist
    @PreUpdate
    public void calcularSubtotal() {
        if (cantidad != null && precio != null) {
            this.subTotal = cantidad * precio;
        }
    }
}