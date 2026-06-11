package com.SweetCreamPink.demoSpringBoot.Controlador;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SweetCreamPink.demoSpringBoot.Modelo.Usuario;
import com.SweetCreamPink.demoSpringBoot.Repositorio.UsuarioRepository;
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

    public UsuarioApiController(UsuarioRepository usuarioRepo,
                                PasswordEncoder passwordEncoder,
                                AuthService authService) {
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
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
            u.setContrasena(null);
            return ResponseEntity.ok(u);
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
    }
}
