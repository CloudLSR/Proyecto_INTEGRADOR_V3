package Controlador;

import Modelo.Oferta;
import Modelo.Producto;
import Repositorio.OfertaRepository;
import Repositorio.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Gestión de Ofertas para el administrador.
 *
 * GET    /api/admin/ofertas             → listar todas
 * GET    /api/admin/ofertas/activas     → listar vigentes (activas y con fecha válida)
 * GET    /api/admin/ofertas/{id}        → obtener una
 * POST   /api/admin/ofertas             → crear oferta
 * PUT    /api/admin/ofertas/{id}        → editar oferta
 * DELETE /api/admin/ofertas/{id}        → eliminar oferta
 * PUT    /api/admin/ofertas/{id}/toggle → activar/desactivar
 *
 * Acceso público (clientes del frontend):
 * GET    /api/ofertas/vigentes          → ver ofertas activas (sin token)
 */
@RestController
@CrossOrigin(origins = "${cors.allowed-origins}")
public class AdminOfertasController {

    @Autowired private OfertaRepository   ofertaRepository;
    @Autowired private ProductoRepository productoRepository;

    // ══════════════════ ENDPOINTS ADMIN (requieren ADMIN) ═════════════════════

    @GetMapping("/api/admin/ofertas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Oferta>> listarTodas() {
        return ResponseEntity.ok(ofertaRepository.findAll());
    }

    @GetMapping("/api/admin/ofertas/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> obtener(@PathVariable Integer id) {
        Optional<Oferta> opt = ofertaRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(opt.get());
    }

    @PostMapping("/api/admin/ofertas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> crear(@RequestBody Oferta oferta) {
        // Validaciones
        if (oferta.getOferTitulo() == null || oferta.getOferTitulo().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("mensaje", "El título es requerido"));
        }
        if (oferta.getOferDescuento() == null) {
            return ResponseEntity.badRequest().body(Map.of("mensaje", "El descuento es requerido"));
        }
        if (oferta.getOferFechaInicio() == null || oferta.getOferFechaFin() == null) {
            return ResponseEntity.badRequest().body(Map.of("mensaje", "Las fechas son requeridas"));
        }
        if (oferta.getOferFechaFin().isBefore(oferta.getOferFechaInicio())) {
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "La fecha de fin no puede ser anterior a la de inicio"));
        }

        // Vincular producto si viene en el body
        if (oferta.getProducto() != null && oferta.getProducto().getProId() != null) {
            Optional<Producto> prodOpt = productoRepository.findById(oferta.getProducto().getProId());
            prodOpt.ifPresent(oferta::setProducto);
        }

        Oferta guardada = ofertaRepository.save(oferta);
        return ResponseEntity.ok(Map.of("mensaje", "Oferta creada correctamente", "oferta", guardada));
    }

    @PutMapping("/api/admin/ofertas/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> editar(@PathVariable Integer id, @RequestBody Oferta datos) {
        Optional<Oferta> opt = ofertaRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Oferta o = opt.get();
        if (datos.getOferTitulo()      != null) o.setOferTitulo(datos.getOferTitulo());
        if (datos.getOferDescripcion() != null) o.setOferDescripcion(datos.getOferDescripcion());
        if (datos.getOferDescuento()   != null) o.setOferDescuento(datos.getOferDescuento());
        if (datos.getOferFechaInicio() != null) o.setOferFechaInicio(datos.getOferFechaInicio());
        if (datos.getOferFechaFin()    != null) o.setOferFechaFin(datos.getOferFechaFin());
        if (datos.getOferActiva()      != null) o.setOferActiva(datos.getOferActiva());

        if (datos.getProducto() != null && datos.getProducto().getProId() != null) {
            productoRepository.findById(datos.getProducto().getProId()).ifPresent(o::setProducto);
        }

        return ResponseEntity.ok(Map.of("mensaje", "Oferta actualizada", "oferta", ofertaRepository.save(o)));
    }

    @PutMapping("/api/admin/ofertas/{id}/toggle")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> toggleActiva(@PathVariable Integer id) {
        Optional<Oferta> opt = ofertaRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        Oferta o = opt.get();
        o.setOferActiva(!o.getOferActiva());
        ofertaRepository.save(o);
        return ResponseEntity.ok(Map.of(
            "mensaje", o.getOferActiva() ? "Oferta activada" : "Oferta desactivada",
            "activa",  o.getOferActiva()
        ));
    }

    @DeleteMapping("/api/admin/ofertas/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        if (!ofertaRepository.existsById(id)) return ResponseEntity.notFound().build();
        ofertaRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("mensaje", "Oferta eliminada correctamente"));
    }

    // ══════════════════ ENDPOINT PÚBLICO (para el frontend de clientes) ════════

    @GetMapping("/api/ofertas/vigentes")
    public ResponseEntity<List<Oferta>> ofertasVigentesPublico() {
        return ResponseEntity.ok(ofertaRepository.findVigentes(LocalDate.now()));
    }
}