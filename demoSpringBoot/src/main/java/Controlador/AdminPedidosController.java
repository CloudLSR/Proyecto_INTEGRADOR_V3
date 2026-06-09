package Controlador;

import Modelo.Orden;
import Repositorio.OrdenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/pedidos")
@CrossOrigin(origins = "${cors.allowed-origins}")
@PreAuthorize("hasRole('ADMIN')")
public class AdminPedidosController {

    @Autowired
    private OrdenRepository ordenRepository;

    @GetMapping
    public ResponseEntity<List<Orden>> listarTodos() {
        List<Orden> ordenes = ordenRepository.findAll();
        ordenes.sort((a, b) -> {
            if (a.getFecha() == null) return 1;
            if (b.getFecha() == null) return -1;
            return b.getFecha().compareTo(a.getFecha());
        });
        return ResponseEntity.ok(ordenes);
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Orden>> listarPorEstado(@PathVariable String estado) {
        List<Orden> ordenes = ordenRepository.findByOrdEstado(estado);
        return ResponseEntity.ok(ordenes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detalle(@PathVariable Integer id) {
        Optional<Orden> opt = ordenRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(opt.get());
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<?> cambiarEstado(
            @PathVariable Integer id,
            @RequestBody Map<String, String> body) {

        String nuevoEstado = body.get("estado");
        if (nuevoEstado == null || nuevoEstado.isBlank()) {
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "El campo 'estado' es requerido"));
        }

        List<String> estadosValidos = List.of("Pendiente", "Preparando", "Enviado", "Entregado", "Cancelado");
        if (!estadosValidos.contains(nuevoEstado)) {
            return ResponseEntity.badRequest().body(Map.of(
                "mensaje", "Estado inválido. Valores permitidos: " + estadosValidos
            ));
        }

        Optional<Orden> opt = ordenRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Orden orden = opt.get();
        orden.setEstado(Orden.EstadoOrden.valueOf(nuevoEstado));
        ordenRepository.save(orden);

        return ResponseEntity.ok(Map.of(
            "mensaje",     "Estado actualizado correctamente",
            "ordId",       id,
            "estadoNuevo", nuevoEstado
        ));
    }
}