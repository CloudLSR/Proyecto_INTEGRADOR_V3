package com.SweetCreamPink.demoSpringBoot.Controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.SweetCreamPink.demoSpringBoot.Modelo.Rol;
import com.SweetCreamPink.demoSpringBoot.Modelo.Usuario;
import com.SweetCreamPink.demoSpringBoot.Repositorio.UsuarioRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "${cors.allowed-origins}")
public class UsuarioApiController {

    @Autowired
    private UsuarioRepository usuarioRepo;

    // FIX: inyectar PasswordEncoder en vez de comparar contraseñas en texto plano
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        try {
            if (usuarioRepo.findByCorreo(usuario.getCorreo()).isPresent()) {
                return ResponseEntity.badRequest().body("El correo ya está registrado");
            }
            // FIX: setRolId(2) no existe en la entidad Usuario → usar setRol() con objeto Rol
            Rol rolCliente = new Rol();
            rolCliente.setId(2);
            usuario.setRol(rolCliente);

            // FIX: hashear contraseña antes de guardar
            usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));

            Usuario guardado = usuarioRepo.save(usuario);
            guardado.setContrasena(null); // nunca devolver la contraseña
            return ResponseEntity.ok(guardado);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario loginData) {
        Optional<Usuario> userOpt = usuarioRepo.findByCorreo(loginData.getCorreo());

        // FIX 1: getPassword() no existe → usar getContrasena()
        // FIX 2: nunca comparar con .equals() en texto plano, usar BCrypt matches()
        if (userOpt.isPresent() &&
                passwordEncoder.matches(loginData.getContrasena(), userOpt.get().getContrasena())) {
            Usuario u = userOpt.get();
            u.setContrasena(null); // no devolver la contraseña al cliente
            return ResponseEntity.ok(u);
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
    }
}