package com.SweetCreamPink.demoSpringBoot.Controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.SweetCreamPink.demoSpringBoot.Modelo.HorarioPersonal;
import com.SweetCreamPink.demoSpringBoot.Modelo.Personal;
import com.SweetCreamPink.demoSpringBoot.Repositorio.HorarioPersonalRepository;
import com.SweetCreamPink.demoSpringBoot.Repositorio.PersonalRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Gestión de Personal (empleados) para el administrador.
 *
 * PERSONAL:
 *  GET    /api/admin/personal              → listar todos
 *  GET    /api/admin/personal/{id}         → ver uno
 *  POST   /api/admin/personal              → agregar empleado
 *  PUT    /api/admin/personal/{id}         → editar empleado (nombre, rol, estado, etc.)
 *  DELETE /api/admin/personal/{id}         → eliminar empleado
 *  PUT    /api/admin/personal/{id}/estado  → activar/desactivar
 *
 * HORARIOS:
 *  GET    /api/admin/personal/{id}/horarios          → ver horarios del empleado
 *  POST   /api/admin/personal/{id}/horarios          → agregar turno
 *  DELETE /api/admin/personal/horarios/{horId}       → eliminar turno específico
 *  PUT    /api/admin/personal/horarios/{horId}        → editar turno específico
 */
@RestController
@RequestMapping("/api/admin/personal")
@CrossOrigin(origins = "${cors.allowed-origins}")
@PreAuthorize("hasRole('ADMIN')")
public class AdminPersonalController {

    @Autowired private PersonalRepository        personalRepository;
    @Autowired private HorarioPersonalRepository horarioRepository;

    // ════════════════════════════ PERSONAL ════════════════════════════════════

    @GetMapping
    public ResponseEntity<List<Personal>> listarTodos() {
        return ResponseEntity.ok(personalRepository.findAll());
    }

    @GetMapping("/activos")
    public ResponseEntity<List<Personal>> listarActivos() {
        return ResponseEntity.ok(personalRepository.findByPerEstado(Personal.EstadoPersonal.Activo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtener(@PathVariable Integer id) {
        Optional<Personal> opt = personalRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(opt.get());
    }

    @PostMapping
    public ResponseEntity<?> agregar(@RequestBody Personal personal) {
        // Validaciones básicas
        if (personal.getPerNombre() == null || personal.getPerNombre().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("mensaje", "El nombre es requerido"));
        }
        if (personal.getPerCorreo() == null || personal.getPerCorreo().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("mensaje", "El correo es requerido"));
        }
        if (personalRepository.existsByPerCorreo(personal.getPerCorreo())) {
            return ResponseEntity.badRequest().body(Map.of("mensaje", "Ya existe un empleado con ese correo"));
        }
        if (personal.getPerFechaIngreso() == null) {
            personal.setPerFechaIngreso(LocalDate.now());
        }
        Personal guardado = personalRepository.save(personal);
        return ResponseEntity.ok(Map.of("mensaje", "Empleado registrado correctamente", "personal", guardado));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Integer id, @RequestBody Personal datos) {
        Optional<Personal> opt = personalRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Personal p = opt.get();
        if (datos.getPerNombre()    != null) p.setPerNombre(datos.getPerNombre());
        if (datos.getPerApellido()  != null) p.setPerApellido(datos.getPerApellido());
        if (datos.getPerTelefono()  != null) p.setPerTelefono(datos.getPerTelefono());
        if (datos.getPerRol()       != null) p.setPerRol(datos.getPerRol());
        if (datos.getPerEstado()    != null) p.setPerEstado(datos.getPerEstado());

        // Solo actualiza correo si no está en uso por otro empleado
        if (datos.getPerCorreo() != null && !datos.getPerCorreo().equals(p.getPerCorreo())) {
            if (personalRepository.existsByPerCorreo(datos.getPerCorreo())) {
                return ResponseEntity.badRequest().body(Map.of("mensaje", "Ese correo ya está en uso"));
            }
            p.setPerCorreo(datos.getPerCorreo());
        }

        Personal guardado = personalRepository.save(p);
        return ResponseEntity.ok(Map.of("mensaje", "Empleado actualizado", "personal", guardado));
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<?> cambiarEstado(@PathVariable Integer id,
                                           @RequestBody Map<String, String> body) {
        String estadoStr = body.get("estado");
        Optional<Personal> opt = personalRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        try {
            Personal.EstadoPersonal estado = Personal.EstadoPersonal.valueOf(estadoStr);
            opt.get().setPerEstado(estado);
            personalRepository.save(opt.get());
            return ResponseEntity.ok(Map.of("mensaje", "Estado actualizado a: " + estadoStr));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "Estado inválido. Use: Activo | Inactivo"));
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        if (!personalRepository.existsById(id)) return ResponseEntity.notFound().build();
        personalRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("mensaje", "Empleado eliminado correctamente"));
    }

    // ════════════════════════════ HORARIOS ════════════════════════════════════

    @GetMapping("/{id}/horarios")
    public ResponseEntity<?> obtenerHorarios(@PathVariable Integer id) {
        if (!personalRepository.existsById(id)) return ResponseEntity.notFound().build();
        List<HorarioPersonal> horarios = horarioRepository.findByPersonal_PerId(id);
        return ResponseEntity.ok(horarios);
    }

    @PostMapping("/{id}/horarios")
    public ResponseEntity<?> agregarHorario(@PathVariable Integer id,
                                            @RequestBody HorarioPersonal horario) {
        Optional<Personal> opt = personalRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        horario.setPersonal(opt.get());
        HorarioPersonal guardado = horarioRepository.save(horario);
        return ResponseEntity.ok(Map.of("mensaje", "Horario agregado", "horario", guardado));
    }

    @PutMapping("/horarios/{horId}")
    public ResponseEntity<?> editarHorario(@PathVariable Integer horId,
                                           @RequestBody HorarioPersonal datos) {
        Optional<HorarioPersonal> opt = horarioRepository.findById(horId);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        HorarioPersonal h = opt.get();
        if (datos.getHorDia()     != null) h.setHorDia(datos.getHorDia());
        if (datos.getHorEntrada() != null) h.setHorEntrada(datos.getHorEntrada());
        if (datos.getHorSalida()  != null) h.setHorSalida(datos.getHorSalida());

        return ResponseEntity.ok(Map.of("mensaje", "Horario actualizado", "horario", horarioRepository.save(h)));
    }

    @DeleteMapping("/horarios/{horId}")
    public ResponseEntity<?> eliminarHorario(@PathVariable Integer horId) {
        if (!horarioRepository.existsById(horId)) return ResponseEntity.notFound().build();
        horarioRepository.deleteById(horId);
        return ResponseEntity.ok(Map.of("mensaje", "Horario eliminado"));
    }
}