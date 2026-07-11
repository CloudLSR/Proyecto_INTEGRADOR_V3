package com.SweetCreamPink.demoSpringBoot.Controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.SweetCreamPink.demoSpringBoot.Modelo.CarritoItem;
import com.SweetCreamPink.demoSpringBoot.Modelo.Producto;
import com.SweetCreamPink.demoSpringBoot.Repositorio.OfertaRepository;
import com.SweetCreamPink.demoSpringBoot.Repositorio.ProductoRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "${cors.allowed-origins}") 
public class CarritoController {

    @Autowired
    private ProductoRepository productoRepository; 

    @Autowired
    private OfertaRepository ofertaRepository;

    private static List<CarritoItem> listaCarrito = new ArrayList<>();

    @GetMapping
    public ResponseEntity<List<CarritoItem>> obtenerCarrito() {
        return ResponseEntity.ok(listaCarrito);
    }

    @PostMapping("/actualizar-cantidad")
    public ResponseEntity<List<CarritoItem>> actualizarCantidad(
            @RequestParam Integer productoId,  
            @RequestParam Integer nuevaCantidad) {

        for (CarritoItem item : listaCarrito) {
            if (item.getProducto().getId().equals(productoId)) {
                item.setCantidad(nuevaCantidad); // setCantidad ya llama calcularSubtotal() internamente
                break;
            }
        }
        return ResponseEntity.ok(listaCarrito);
    }

    @DeleteMapping("/eliminar/{productoId}")
    public ResponseEntity<List<CarritoItem>> eliminarItem(@PathVariable Integer productoId) {
        listaCarrito.removeIf(item -> item.getProducto().getId().equals(productoId));
        return ResponseEntity.ok(listaCarrito);
    }

    @PostMapping("/agregar")
    public ResponseEntity<?> agregarItem(@RequestBody Map<String, Object> body) {
        try {
            Integer productoId = (Integer) body.get("productoId");
            Integer cantidad   = body.get("cantidad") != null ? (Integer) body.get("cantidad") : 1;

            if (productoId == null) {
                return ResponseEntity.badRequest().body("productoId es requerido");
            }

            Optional<Producto> productoOpt = productoRepository.findById(productoId);
            if (productoOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Producto no encontrado");
            }

            Producto producto = productoOpt.get();
            Double precioOriginalProducto = producto.getPrecio();
            Double descuentoAplicado = null;

            // Si el producto tiene una oferta vigente, aplicamos el descuento al precio
            // (solo en este objeto en memoria; nunca se guarda de vuelta en la BD,
            // por eso Productos.js sigue mostrando el precio normal de lista)
            Optional<com.SweetCreamPink.demoSpringBoot.Modelo.Oferta> ofertaOpt =
                    ofertaRepository.findVigentePorProducto(productoId, LocalDate.now());
            if (ofertaOpt.isPresent()) {
                double descuentoPct = ofertaOpt.get().getOferDescuento().doubleValue();
                double precioConDescuento = producto.getPrecio() * (1 - descuentoPct / 100.0);
                producto.setPrecio(precioConDescuento);
                descuentoAplicado = descuentoPct;
            }

            // Si ya existe en el carrito, incrementar cantidad
            for (CarritoItem item : listaCarrito) {
                if (item.getProducto().getId().equals(productoId)) {
                    item.setCantidad(item.getCantidad() + cantidad);
                    return ResponseEntity.ok(listaCarrito);
                }
            }

            // Si no existe, agregar nuevo item (ya con el precio con descuento si aplicaba)
            CarritoItem nuevoItem = new CarritoItem(producto, cantidad);
            if (descuentoAplicado != null) {
                nuevoItem.setPrecioOriginal(precioOriginalProducto);
                nuevoItem.setDescuentoAplicado(descuentoAplicado);
            }
            listaCarrito.add(nuevoItem);
            return ResponseEntity.ok(listaCarrito);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/pagar")
    public ResponseEntity<String> procesarPago(@RequestBody String datosPago) {
        listaCarrito.clear();
        return ResponseEntity.ok("¡Pedido recibido con éxito en Sweet Cream Rose Backend!");
    }
}