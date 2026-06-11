package com.SweetCreamPink.demoSpringBoot.Controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.SweetCreamPink.demoSpringBoot.Modelo.Producto;
import com.SweetCreamPink.demoSpringBoot.Repositorio.ProductoRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/productos")
@CrossOrigin(origins = "${cors.allowed-origins}")
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductosController {

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping
    public ResponseEntity<List<Producto>> listarTodos() {
        return ResponseEntity.ok(productoRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtener(@PathVariable Integer id) {
        Optional<Producto> opt = productoRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(opt.get());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Producto producto) {
        // getNombre() en lugar de getProNombre()
        if (producto.getNombre() == null || producto.getNombre().isBlank()) {
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "El nombre del producto es requerido"));
        }
        Producto guardado = productoRepository.save(producto);
        return ResponseEntity.ok(Map.of(
            "mensaje",  "Producto creado exitosamente",
            "producto", guardado
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Integer id,
                                    @RequestBody Producto datosNuevos) {
        Optional<Producto> opt = productoRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Producto producto = opt.get();

        // getNombre() / setNombre() en lugar de getProNombre() / setProNombre()
        if (datosNuevos.getNombre() != null) {
            producto.setNombre(datosNuevos.getNombre());
        }
        if (datosNuevos.getCategoria() != null) {
            producto.setCategoria(datosNuevos.getCategoria());
        }

        Producto guardado = productoRepository.save(producto);
        return ResponseEntity.ok(Map.of(
            "mensaje",  "Producto actualizado correctamente",
            "producto", guardado
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        if (!productoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        productoRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("mensaje", "Producto eliminado correctamente"));
    }
}