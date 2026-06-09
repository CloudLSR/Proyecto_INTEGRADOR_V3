package Controlador;

import Modelo.MetodoPago;
import Modelo.MetodoPago.TipoPago;
import service.MetodoPagoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controlador de métodos de pago guardados.
 *
 * ENDPOINTS:
 *   GET    /api/metodos-pago/usuario/{usuarioId}       → listar métodos
 *   POST   /api/metodos-pago/usuario/{usuarioId}       → agregar método
 *   DELETE /api/metodos-pago/{id}/usuario/{usuarioId}  → eliminar método
 *
 * Tipos aceptados en el campo "tipo": VISA, BANCO, YAPE
 */
@RestController
@RequestMapping("/api/metodos-pago")
@CrossOrigin(origins = "${cors.allowed-origins}")
public class MetodoPagoController {

    private final MetodoPagoService service;

    public MetodoPagoController(MetodoPagoService service) {
        this.service = service;
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<MetodoPago>> listar(@PathVariable Integer usuarioId) {
        return ResponseEntity.ok(service.listar(usuarioId));
    }

    @PostMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> agregar(@PathVariable Integer usuarioId,
                                     @RequestBody Map<String, Object> body) {
        try {
            TipoPago tipo = TipoPago.valueOf((String) body.get("tipo"));
            MetodoPago nuevo = service.agregar(
                    usuarioId, tipo,
                    (String) body.get("alias"),
                    (String) body.get("ultimosDigitos"),
                    (String) body.get("titular"),
                    (String) body.get("banco"),
                    Boolean.TRUE.equals(body.get("esPrincipal"))
            );
            return ResponseEntity.ok(nuevo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Tipo inválido. Use: VISA, BANCO o YAPE"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}/usuario/{usuarioId}")
    public ResponseEntity<?> eliminar(@PathVariable Long id,
                                      @PathVariable Integer usuarioId) {
        try {
            service.eliminar(id, usuarioId);
            return ResponseEntity.ok(Map.of("mensaje", "Método de pago eliminado."));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}