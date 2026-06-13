package com.SweetCreamPink.demoSpringBoot.Controlador;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.SweetCreamPink.demoSpringBoot.Modelo.Usuario;
import com.SweetCreamPink.demoSpringBoot.Repositorio.UsuarioRepository;
import com.SweetCreamPink.demoSpringBoot.Seguridad.JwtUtil;
import com.SweetCreamPink.demoSpringBoot.service.AuthService;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "${cors.allowed-origins}")
public class UsuarioApiController {

    private final UsuarioRepository usuarioRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public UsuarioApiController(UsuarioRepository usuarioRepo,
                                PasswordEncoder passwordEncoder,
                                AuthService authService,
                                JwtUtil jwtUtil) {
        this.usuarioRepo     = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
        this.authService     = authService;
        this.jwtUtil         = jwtUtil;
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarUsuario(@RequestBody Map<String, String> body) {
        try {
            Usuario guardado = authService.registrar(
                    body.get("nombre"),
                    body.get("apellido"),
                    body.get("correo"),
                    body.get("contrasena"),
                    body.get("telefono")
            );
            guardado.setContrasena(null);
            return ResponseEntity.ok(guardado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario loginData) {
        Optional<Usuario> userOpt = usuarioRepo.findByCorreo(loginData.getCorreo());

        if (userOpt.isPresent() &&
                passwordEncoder.matches(loginData.getContrasena(), userOpt.get().getContrasena())) {
            Usuario u = userOpt.get();
            String token = jwtUtil.generarToken(
                u.getCorreo(),
                u.getRol() != null ? u.getRol().getDescripcion().toUpperCase() : "CLIENTE"
            );
            u.setContrasena(null);
            return ResponseEntity.ok(Map.of(
                "token", token,
                "usuario", u
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Credenciales incorrectas"));
        }
    }

    @GetMapping("/perfil")
    public ResponseEntity<?> obtenerPerfil(@RequestHeader("Authorization") String authHeader) {
        try {
            String token  = authHeader.replace("Bearer ", "");
            String correo = jwtUtil.extraerCorreo(token);

            Usuario u = usuarioRepo.findByCorreo(correo)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            u.setContrasena(null);
            return ResponseEntity.ok(u);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Token inválido"));
        }
    }

    @PutMapping("/perfil")
    public ResponseEntity<?> actualizarPerfil(@RequestHeader("Authorization") String authHeader,
                                               @RequestBody Map<String, String> body) {
        try {
            String token  = authHeader.replace("Bearer ", "");
            String correo = jwtUtil.extraerCorreo(token);

            Usuario u = usuarioRepo.findByCorreo(correo)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            if (body.containsKey("nombre")   && !body.get("nombre").isBlank())
                u.setNombre(body.get("nombre"));
            if (body.containsKey("apellido") && !body.get("apellido").isBlank())
                u.setApellido(body.get("apellido"));
            if (body.containsKey("telefono"))
                u.setTelefono(body.get("telefono"));

            usuarioRepo.save(u);
            u.setContrasena(null);
            return ResponseEntity.ok(u);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }
}