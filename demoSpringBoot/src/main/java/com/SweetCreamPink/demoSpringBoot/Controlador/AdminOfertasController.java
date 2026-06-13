package com.SweetCreamPink.demoSpringBoot.Controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.SweetCreamPink.demoSpringBoot.Modelo.Oferta;
import com.SweetCreamPink.demoSpringBoot.Modelo.Producto;
import com.SweetCreamPink.demoSpringBoot.Repositorio.OfertaRepository;
import com.SweetCreamPink.demoSpringBoot.Repositorio.ProductoRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "${cors.allowed-origins}")
public class AdminOfertasController {

    @Autowired private OfertaRepository   ofertaRepository;
    @Autowired private ProductoRepository productoRepository;

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
        if (oferta.getOferTitulo() == null || oferta.getOferTitulo().isBlank())
            return ResponseEntity.badRequest().body(Map.of("mensaje", "El título es requerido"));
        if (oferta.getOferDescuento() == null)
            return ResponseEntity.badRequest().body(Map.of("mensaje", "El descuento es requerido"));
        if (oferta.getOferFechaInicio() == null || oferta.getOferFechaFin() == null)
            return ResponseEntity.badRequest().body(Map.of("mensaje", "Las fechas son requeridas"));
        if (oferta.getOferFechaFin().isBefore(oferta.getOferFechaInicio()))
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "La fecha de fin no puede ser anterior a la de inicio"));

        // Producto.id se llama getId() porque Lombok usa el campo 'id'
        if (oferta.getProducto() != null && oferta.getProducto().getId() != null) {
            Optional<Producto> prodOpt = productoRepository.findById(oferta.getProducto().getId());
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

        // getId() en lugar de getProId()
        if (datos.getProducto() != null && datos.getProducto().getId() != null) {
            productoRepository.findById(datos.getProducto().getId()).ifPresent(o::setProducto);
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

    @GetMapping("/api/ofertas/vigentes")
    public ResponseEntity<List<Oferta>> ofertasVigentesPublico() {
        return ResponseEntity.ok(ofertaRepository.findVigentes(LocalDate.now()));
    }
}