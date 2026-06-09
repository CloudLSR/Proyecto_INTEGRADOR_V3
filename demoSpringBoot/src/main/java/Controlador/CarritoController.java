package Controlador;

import Modelo.CarritoItem;
import Modelo.Producto;
import Repositorio.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "${cors.allowed-origins}") // FIX 1: usar variable de configuración, no hardcodear "*"
public class CarritoController {

    @Autowired
    private ProductoRepository productoRepository; // FIX 2: inyectar repositorio real en lugar de datos hardcodeados

    // FIX 3: el carrito en memoria debe ser por sesión/usuario; como solución simple se mantiene
    // pero ya NO se inicializa con datos hardcodeados (usaban constructor de Producto inexistente)
    private static List<CarritoItem> listaCarrito = new ArrayList<>();

    // FIX 4: se elimina el bloque static { ... } porque usaba
    //   new Producto(1L, "nombre", "desc", 48.00, "url")
    // pero Producto solo tiene constructor vacío (@NoArgsConstructor de Lombok)
    // y su campo id es Integer, no Long.

    @GetMapping
    public ResponseEntity<List<CarritoItem>> obtenerCarrito() {
        return ResponseEntity.ok(listaCarrito);
    }

    // FIX 5: actualizar también el subtotal después de cambiar la cantidad
    @PostMapping("/actualizar-cantidad")
    public ResponseEntity<List<CarritoItem>> actualizarCantidad(
            @RequestParam Integer productoId,   // FIX 6: id de Producto es Integer, no Long
            @RequestParam Integer nuevaCantidad) {

        for (CarritoItem item : listaCarrito) {
            if (item.getProducto().getId().equals(productoId)) {
                item.setCantidad(nuevaCantidad); // setCantidad ya llama calcularSubtotal() internamente
                break;
            }
        }
        return ResponseEntity.ok(listaCarrito);
    }

    // FIX 7: PathVariable también debe ser Integer para coincidir con Producto.id
    @DeleteMapping("/eliminar/{productoId}")
    public ResponseEntity<List<CarritoItem>> eliminarItem(@PathVariable Integer productoId) {
        listaCarrito.removeIf(item -> item.getProducto().getId().equals(productoId));
        return ResponseEntity.ok(listaCarrito);
    }

    // FIX 8: endpoint para agregar un producto al carrito (faltaba completamente)
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

            // Si ya existe en el carrito, incrementar cantidad
            for (CarritoItem item : listaCarrito) {
                if (item.getProducto().getId().equals(productoId)) {
                    item.setCantidad(item.getCantidad() + cantidad);
                    return ResponseEntity.ok(listaCarrito);
                }
            }

            // Si no existe, agregar nuevo item
            listaCarrito.add(new CarritoItem(producto, cantidad));
            return ResponseEntity.ok(listaCarrito);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/pagar")
    public ResponseEntity<String> procesarPago(@RequestBody String datosPago) {
        // FIX 9: limpiar el carrito después de confirmar el pago
        listaCarrito.clear();
        return ResponseEntity.ok("¡Pedido recibido con éxito en Sweet Cream Rose Backend!");
    }
}