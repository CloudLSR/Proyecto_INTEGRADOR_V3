package Controlador;

import Modelo.Orden;
import Modelo.Orden.MetodoPagoOrden;
import service.OrdenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;

/**
 * Controlador de órdenes (pedidos).
 *
 * ENDPOINTS:
 *   POST /api/ordenes/usuario/{usuarioId}            → crear nuevo pedido
 *   GET  /api/ordenes/usuario/{usuarioId}/historial  → historial completo
 *   GET  /api/ordenes/usuario/{usuarioId}/exportar   → descargar Excel con historial
 *   GET  /api/ordenes/{id}                           → detalle de una orden
 */
@RestController
@RequestMapping("/api/ordenes")
@CrossOrigin(origins = "${cors.allowed-origins}")
public class OrdenController {

    private static final Logger log = LoggerFactory.getLogger(OrdenController.class);

    private final OrdenService service;

    public OrdenController(OrdenService service) {
        this.service = service;
    }

    // ── CREAR ORDEN ──────────────────────────────────────────────────────────
    @PostMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> crearOrden(@PathVariable Integer usuarioId,
                                        @RequestBody Map<String, Object> body) {
        try {
            MetodoPagoOrden metodoPago = MetodoPagoOrden.valueOf(
                    (String) body.get("metodoPago"));

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> detalles =
                    (List<Map<String, Object>>) body.get("detalles");

            Orden orden = service.crearOrden(
                    usuarioId,
                    (String) body.get("direccionEntrega"),
                    metodoPago,
                    detalles
            );
            return ResponseEntity.ok(orden);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error",
                            "Método de pago inválido. Use: Efectivo, Transferencia, Tarjeta o Yape"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ── HISTORIAL ────────────────────────────────────────────────────────────
    @GetMapping("/usuario/{usuarioId}/historial")
    public ResponseEntity<List<Orden>> historial(@PathVariable Integer usuarioId) {
        return ResponseEntity.ok(service.historial(usuarioId));
    }

    // ── DETALLE DE UNA ORDEN ─────────────────────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<?> detalle(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(service.buscarPorId(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ── EXPORTAR HISTORIAL A EXCEL ───────────────────────────────────────────
    /**
     * Genera y descarga un archivo .xlsx con todo el historial de pedidos
     * del cliente. Usa Apache POI en la capa de servicio.
     */
    @GetMapping("/usuario/{usuarioId}/exportar")
    public ResponseEntity<byte[]> exportarExcel(@PathVariable Integer usuarioId) {
        try {
            ByteArrayOutputStream out = service.exportarHistorialExcel(usuarioId);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            headers.setContentDispositionFormData("attachment",
                    "historial-pedidos-" + usuarioId + ".xlsx");

            log.info("Exportando historial Excel para usuarioId: {}", usuarioId);
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(out.toByteArray());

        } catch (RuntimeException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}