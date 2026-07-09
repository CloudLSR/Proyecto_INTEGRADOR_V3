package com.SweetCreamPink.demoSpringBoot.Controlador;

import com.SweetCreamPink.demoSpringBoot.Modelo.Producto;
import com.SweetCreamPink.demoSpringBoot.Repositorio.ProductoRepository;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "${cors.allowed-origins}")
public class ProductoController {

    private static final Logger log = LoggerFactory.getLogger(ProductoController.class);

    private final ProductoRepository productoRepo;

    @Value("${uploads.directory}")
    private String directorioUploads;

    public ProductoController(ProductoRepository productoRepo) {
        this.productoRepo = productoRepo;
    }

    // ── PÚBLICOS ─────────────────────────────────────────────────────────────
    @GetMapping
    public ResponseEntity<List<Producto>> listar() {
        return ResponseEntity.ok(productoRepo.findByActivoTrue());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detalle(@PathVariable Integer id) {
        return productoRepo.findById(id)
                .filter(Producto::isActivo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Producto>> buscar(@RequestParam String q) {
        List<Producto> resultados = productoRepo.findByNombreContainingIgnoreCaseAndActivoTrue(q.trim());
        return ResponseEntity.ok(resultados);
    }

    @GetMapping("/categoria/{catId}")
    public ResponseEntity<List<Producto>> porCategoria(@PathVariable Integer catId) {
        return ResponseEntity.ok(productoRepo.findByCategoriaIdAndActivoTrue(catId));
    }

    // ── ADMIN ─────────────────────────────────────────────────────────────────
    @PostMapping("/guardar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> guardar(
            @RequestParam("nombre")      String nombre,
            @RequestParam("precio")      Double precio,
            @RequestParam("descripcion") String descripcion,
            @RequestParam(value = "archivo", required = false) MultipartFile archivo)
            throws IOException {

        Producto p = new Producto();
        p.setNombre(nombre);
        p.setPrecio(precio);
        p.setDescripcion(descripcion);

        if (archivo != null && !archivo.isEmpty()) {
            Path dirPath = Paths.get(directorioUploads);
            if (!Files.exists(dirPath)) {
                Files.createDirectories(dirPath);
            }
            String nombreArchivo = System.currentTimeMillis() + "_" + archivo.getOriginalFilename();
            Files.copy(archivo.getInputStream(), dirPath.resolve(nombreArchivo));
            p.setImagenUrl("/uploads/" + nombreArchivo);
        } else {
            p.setImagenUrl("/uploads/default.png");
        }

        Producto guardado = productoRepo.save(p);
        log.info("Producto '{}' guardado por admin", nombre);
        return ResponseEntity.ok(guardado);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> actualizar(@PathVariable Integer id,
                                        @RequestBody Producto datos) {
        return productoRepo.findById(id).map(p -> {
            if (datos.getNombre()      != null) p.setNombre(datos.getNombre());
            if (datos.getPrecio()      != null) p.setPrecio(datos.getPrecio());
            if (datos.getDescripcion() != null) p.setDescripcion(datos.getDescripcion());
            productoRepo.save(p);
            log.info("Producto #{} actualizado", id);
            return ResponseEntity.ok(p);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        if (!productoRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        productoRepo.deleteById(id);
        log.warn("Producto #{} eliminado por admin", id);
        return ResponseEntity.ok(Map.of("mensaje", "Producto eliminado correctamente."));
    }
}