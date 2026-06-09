package Controlador;

import DTO.AdminDTOs;
import Modelo.Usuario;
import Repositorio.UsuarioRepository;
import Security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/auth")
@CrossOrigin(origins = "${cors.allowed-origins}")
public class AdminAuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    @Value("${admin.pin:SweetCream2024!}")
    private String adminPin;

    @PostMapping("/verificar-admin")
    public ResponseEntity<?> verificarAdmin(@RequestBody Map<String, String> body) {
        String correo = body.get("correo");
        String contrasena = body.get("contrasena");

        Optional<Usuario> usuOpt = usuarioRepository.findByCorreo(correo);
        if (usuOpt.isEmpty())
            return ResponseEntity.status(401).body(Map.of("mensaje", "Credenciales incorrectas"));

        Usuario u = usuOpt.get();

        if (!passwordEncoder.matches(contrasena, u.getContrasena()))
            return ResponseEntity.status(401).body(Map.of("mensaje", "Credenciales incorrectas"));

        if (u.getRol() == null || u.getRol().getId() != 1)
            return ResponseEntity.status(403).body(Map.of("mensaje", "Acceso denegado: no eres administrador"));

        return ResponseEntity.ok(Map.of(
                "paso", 2,
                "correo", correo,
                "mensaje", "Credenciales correctas. Ingresa el código PIN de administrador."));
    }

    @PostMapping("/pin")
    public ResponseEntity<?> validarPin(@RequestBody AdminDTOs.AdminPinRequest request) {
        String correo = request.getCorreo();
        String pin = request.getPin();

        Optional<Usuario> usuOpt = usuarioRepository.findByCorreo(correo);
        if (usuOpt.isEmpty())
            return ResponseEntity.status(401).body(Map.of("mensaje", "Sesión inválida"));

        Usuario u = usuOpt.get();

        if (u.getRol() == null || u.getRol().getId() != 1)
            return ResponseEntity.status(403).body(Map.of("mensaje", "Acceso denegado"));

        if (!adminPin.equals(pin))
            return ResponseEntity.status(401).body(Map.of("mensaje", "Código PIN incorrecto"));

        String token = jwtUtil.generarToken(u.getCorreo(), "ADMIN");

        return ResponseEntity.ok(Map.of(
                "token", token,
                "nombre", u.getNombre() != null ? u.getNombre() : "Admin",
                "correo", u.getCorreo(),
                "rol", "ADMIN",
                "mensaje", "Bienvenido al panel de administrador"));
    }
}