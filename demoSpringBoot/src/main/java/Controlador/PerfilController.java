package Controlador;

import Modelo.Usuario;
import service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controlador de perfil del usuario autenticado.
 *
 * ENDPOINTS:
 *   GET  /api/perfil/{id}   → obtener datos del perfil
 *   PUT  /api/perfil/{id}   → actualizar nombre, apellido, teléfono
 */
@RestController
@RequestMapping("/api/perfil")
@CrossOrigin(origins = "${cors.allowed-origins}")
public class PerfilController {

    private final UsuarioService usuarioService;

    public PerfilController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPerfil(@PathVariable Integer id,
                                           @AuthenticationPrincipal UserDetails auth) {
        try {
            Usuario usuario = usuarioService.obtenerPerfil(id);
            usuario.setContrasena(null); // Nunca exponer la contraseña
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarPerfil(@PathVariable Integer id,
                                              @RequestBody Map<String, String> body) {
        try {
            Usuario actualizado = usuarioService.actualizarPerfil(
                    id,
                    body.get("nombre"),
                    body.get("apellido"),
                    body.get("telefono")
            );
            actualizado.setContrasena(null);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}