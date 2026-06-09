package Controlador;

import Modelo.Producto;
import Repositorio.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Gestión de Productos para el administrador.
 *
 * GET    /api/admin/productos           → listar todos
 * GET    /api/admin/productos/{id}      → obtener uno
 * POST   /api/admin/productos           → crear nuevo
 * PUT    /api/admin/productos/{id}      → editar existente
 * DELETE /api/admin/productos/{id}      → eliminar
 *
 * Nota: El modelo Producto ya existe en el proyecto.
 * Este controlador usa la misma entidad pero con protección ADMIN.
 */
@RestController
@RequestMapping("/api/admin/productos")
@CrossOrigin(origins = "${cors.allowed-origins}")
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductosController {

    @Autowired
    private ProductoRepository productoRepository;

    // ── Listar todos los productos ────────────────────────────────────────────
    @GetMapping
    public ResponseEntity<List<Producto>> listarTodos() {
        return ResponseEntity.ok(productoRepository.findAll());
    }

    // ── Obtener producto por ID ───────────────────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<?> obtener(@PathVariable Integer id) {
        Optional<Producto> opt = productoRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(opt.get());
    }

    // ── Crear nuevo producto ──────────────────────────────────────────────────
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Producto producto) {
        if (producto.getProNombre() == null || producto.getProNombre().isBlank()) {
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "El nombre del producto es requerido"));
        }
        Producto guardado = productoRepository.save(producto);
        return ResponseEntity.ok(Map.of(
            "mensaje",  "Producto creado exitosamente",
            "producto", guardado
        ));
    }

    // ── Editar producto ───────────────────────────────────────────────────────
    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Integer id,
                                    @RequestBody Producto datosNuevos) {
        Optional<Producto> opt = productoRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Producto producto = opt.get();

        if (datosNuevos.getProNombre() != null) {
            producto.setProNombre(datosNuevos.getProNombre());
        }
        // Actualiza la categoría si viene en el body
        if (datosNuevos.getCategoria() != null) {
            producto.setCategoria(datosNuevos.getCategoria());
        }

        Producto guardado = productoRepository.save(producto);
        return ResponseEntity.ok(Map.of(
            "mensaje",  "Producto actualizado correctamente",
            "producto", guardado
        ));
    }

    // ── Eliminar producto ─────────────────────────────────────────────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        if (!productoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        productoRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("mensaje", "Producto eliminado correctamente"));
    }
}