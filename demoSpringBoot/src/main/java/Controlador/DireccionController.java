package Controlador;

import Modelo.Direccion;
import service.DireccionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controlador de direcciones de envío.
 *
 * ENDPOINTS:
 *   GET    /api/direcciones/usuario/{usuarioId}       → listar mis direcciones
 *   POST   /api/direcciones/usuario/{usuarioId}       → agregar dirección
 *   PUT    /api/direcciones/{id}/usuario/{usuarioId}  → editar dirección
 *   DELETE /api/direcciones/{id}/usuario/{usuarioId}  → eliminar dirección
 */
@RestController
@RequestMapping("/api/direcciones")
@CrossOrigin(origins = "${cors.allowed-origins}")
public class DireccionController {

    private final DireccionService service;

    public DireccionController(DireccionService service) {
        this.service = service;
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Direccion>> listar(@PathVariable Integer usuarioId) {
        return ResponseEntity.ok(service.listar(usuarioId));
    }

    @PostMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> agregar(@PathVariable Integer usuarioId,
                                     @RequestBody Map<String, Object> body) {
        try {
            Direccion nueva = service.agregar(
                    usuarioId,
                    (String)  body.get("direccion"),
                    (String)  body.get("distrito"),
                    (String)  body.get("ciudad"),
                    (String)  body.get("codigoPostal"),
                    (String)  body.get("referencia"),
                    Boolean.TRUE.equals(body.get("esPrincipal"))
            );
            return ResponseEntity.ok(nueva);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}/usuario/{usuarioId}")
    public ResponseEntity<?> actualizar(@PathVariable Long id,
                                        @PathVariable Integer usuarioId,
                                        @RequestBody Map<String, Object> body) {
        try {
            Direccion actualizada = service.actualizar(
                    id, usuarioId,
                    (String) body.get("direccion"),
                    (String) body.get("distrito"),
                    (String) body.get("ciudad"),
                    (String) body.get("codigoPostal"),
                    (String) body.get("referencia"),
                    Boolean.TRUE.equals(body.get("esPrincipal"))
            );
            return ResponseEntity.ok(actualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}/usuario/{usuarioId}")
    public ResponseEntity<?> eliminar(@PathVariable Long id,
                                      @PathVariable Integer usuarioId) {
        try {
            service.eliminar(id, usuarioId);
            return ResponseEntity.ok(Map.of("mensaje", "Dirección eliminada correctamente."));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}