package com.SweetCreamPink.demoSpringBoot.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.SweetCreamPink.demoSpringBoot.DAO.UsuarioDAO;
import com.SweetCreamPink.demoSpringBoot.Modelo.Rol;
import com.SweetCreamPink.demoSpringBoot.Modelo.Usuario;
import com.SweetCreamPink.demoSpringBoot.Repositorio.UsuarioRepository;
import com.SweetCreamPink.demoSpringBoot.Seguridad.JwtUtil;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final UsuarioDAO      usuarioDAO;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil         jwtUtil;
    private final UsuarioRepository usuarioRepository;

    public AuthServiceImpl(UsuarioDAO usuarioDAO,
                           PasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil,
                           UsuarioRepository usuarioRepository) {
        this.usuarioDAO        = usuarioDAO;
        this.passwordEncoder   = passwordEncoder;
        this.jwtUtil           = jwtUtil;
        this.usuarioRepository = usuarioRepository;
    }

    // ── REGISTRO ─────────────────────────────────────────────────────────────
    @Override
    public Usuario registrar(String nombre, String apellido,
                             String correo, String contrasena, String telefono) {

        if (nombre == null || nombre.isBlank())
            throw new IllegalArgumentException("El nombre es obligatorio");
        if (correo == null || correo.isBlank())
            throw new IllegalArgumentException("El correo es obligatorio");
        if (contrasena == null || contrasena.length() < 6)
            throw new IllegalArgumentException("La contraseña debe tener al menos 6 caracteres");
        if (usuarioDAO.existePorCorreo(correo))
            throw new IllegalArgumentException("Ya existe una cuenta con ese correo");

        Usuario u = new Usuario();
        u.setNombre(nombre);
        u.setApellido(apellido);
        u.setCorreo(correo);
        u.setTelefono(telefono);
        u.setContrasena(passwordEncoder.encode(contrasena));

        Rol rolCliente = new Rol();
        rolCliente.setId(2);
        u.setRol(rolCliente);

        Usuario guardado = usuarioDAO.guardar(u);
        log.info("Nuevo usuario registrado: {}", correo);
        return guardado;
    }

    // ── LOGIN ─────────────────────────────────────────────────────────────────
    @Override
    public String login(String correo, String contrasena) {
        Usuario u = usuarioDAO.buscarPorCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Credenciales incorrectas"));

        if (!passwordEncoder.matches(contrasena, u.getContrasena()))
            throw new RuntimeException("Credenciales incorrectas");

        String rolNombre = (u.getRol() != null)
                ? u.getRol().getDescripcion().toUpperCase()
                : "CLIENTE";

        String token = jwtUtil.generarToken(u.getCorreo(), rolNombre);
        log.info("Login exitoso para: {} con rol {}", correo, rolNombre);
        return token;
    }

    // ── RECUPERACIÓN DE CONTRASEÑA ────────────────────────────────────────────
    @Override
    public void solicitarRecuperacion(String correo) {
        Optional<Usuario> opt = usuarioDAO.buscarPorCorreo(correo);
        if (opt.isEmpty()) {
            log.info("Solicitud de recuperación para correo inexistente: {}", correo);
            return;
        }

        Usuario u = opt.get();
        String token = jwtUtil.generarTokenReset(correo);
        u.setResetToken(token);
        u.setResetTokenExpiry(LocalDateTime.now().plusMinutes(15));
        usuarioDAO.guardar(u);

        log.info("Token de recuperación para {}: {}", correo, token);
    }

    @Override
    public void restablecerContrasena(String token, String nuevaContrasena) {
        if (token == null || token.isBlank())
            throw new RuntimeException("Token inválido");
        if (nuevaContrasena == null || nuevaContrasena.length() < 6)
            throw new RuntimeException("La nueva contraseña debe tener al menos 6 caracteres");

        Usuario u = usuarioRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido o expirado"));

        if (u.getResetTokenExpiry() == null || u.getResetTokenExpiry().isBefore(LocalDateTime.now()))
            throw new RuntimeException("El token ha expirado. Solicita uno nuevo.");

        u.setContrasena(passwordEncoder.encode(nuevaContrasena));
        u.setResetToken(null);
        u.setResetTokenExpiry(null);
        usuarioDAO.guardar(u);
        log.info("Contraseña restablecida para: {}", u.getCorreo());
    }
}