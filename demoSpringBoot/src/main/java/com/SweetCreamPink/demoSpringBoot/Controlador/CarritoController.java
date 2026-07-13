package com.SweetCreamPink.demoSpringBoot.Controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.SweetCreamPink.demoSpringBoot.Modelo.CarritoItem;
import com.SweetCreamPink.demoSpringBoot.Modelo.Producto;
import com.SweetCreamPink.demoSpringBoot.Repositorio.ProductoRepository;
import com.SweetCreamPink.demoSpringBoot.service.OfertaService;

import java.util.ArrayList;
import java.util.HashMap;
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
    private OfertaService ofertaService;
    
    private static List<CarritoItem> listaCarrito = new ArrayList<>();

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> obtenerCarrito() {
        List<Map<String, Object>> carritoConDescuentos = new ArrayList<>();
        for (CarritoItem item : listaCarrito) {
            Map<String, Object> itemMap = new HashMap<>();
            itemMap.put("id", item.getId());
            itemMap.put("producto", item.getProducto());
            itemMap.put("cantidad", item.getCantidad());
            itemMap.put("subtotal", item.getSubtotal());
            
            // Aplicar descuento si existe oferta vigente
            Double precioConDescuento = ofertaService.calcularPrecioConDescuento(
                item.getProducto().getPrecio(), 
                item.getProducto().getId()
            );
            itemMap.put("precioConDescuento", precioConDescuento);
            itemMap.put("tieneOferta", precioConDescuento != null);
            
            carritoConDescuentos.add(itemMap);
        }
        return ResponseEntity.ok(carritoConDescuentos);
    }

    @PostMapping("/actualizar-cantidad")
    public ResponseEntity<List<CarritoItem>> actualizarCantidad(
            @RequestParam Integer productoId,  
            @RequestParam Integer nuevaCantidad) {

        for (CarritoItem item : listaCarrito) {
            if (item.getProducto().getId().equals(productoId)) {
                item.setCantidad(nuevaCantidad);
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

            // Si ya existe en el carrito, incrementar cantidad
            for (CarritoItem item : listaCarrito) {
                if (item.getProducto().getId().equals(productoId)) {
                    item.setCantidad(item.getCantidad() + cantidad);
                    return ResponseEntity.ok(listaCarrito);
                }
            }

            // Si no existe, agregar nuevo item
            listaCarrito.add(new CarritoItem(producto, cantidad));
            
            // Devolver también información de descuento
            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("mensaje", "Producto agregado al carrito");
            respuesta.put("carrito", listaCarrito);
            
            Double precioConDescuento = ofertaService.calcularPrecioConDescuento(
                producto.getPrecio(), producto.getId()
            );
            respuesta.put("precioConDescuento", precioConDescuento);
            respuesta.put("tieneOferta", precioConDescuento != null);
            
            return ResponseEntity.ok(respuesta);

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
