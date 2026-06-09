package service;

import DAO.UsuarioDAO;
import Modelo.Rol;
import Modelo.Usuario;
import Repositorio.UsuarioRepository;
import Security.JwtUtil;
import service.AuthService;
import com.google.common.base.Preconditions;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Implementación del servicio de autenticación.
 *
 * Librerías de apoyo:
 *  - Google Guava → Preconditions para validaciones legibles
 *  - Apache Commons Lang → StringUtils para manejo de strings
 *  - Logback → registro de eventos de seguridad
 */
@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final UsuarioDAO     usuarioDAO;
    private final PasswordEncoder encoder;
    private final JwtUtil         jwtUtil;
    private final JavaMailSender  mailSender;
    private final UsuarioRepository usuarioRepo;

    public AuthServiceImpl(UsuarioDAO usuarioDAO,
                           PasswordEncoder encoder,
                           JwtUtil jwtUtil,
                           JavaMailSender mailSender,
                           UsuarioRepository usuarioRepo) {
        this.usuarioDAO  = usuarioDAO;
        this.encoder     = encoder;
        this.jwtUtil     = jwtUtil;
        this.mailSender  = mailSender;
        this.usuarioRepo = usuarioRepo;
    }

    // ── REGISTRO ────────────────────────────────────────────────────────────
    @Override
    public Usuario registrar(String nombre, String apellido, String correo,
                             String contrasena, String telefono) {

        // Google Guava Preconditions — validación expresiva
        Preconditions.checkArgument(StringUtils.isNotBlank(correo),
                "El correo no puede estar vacío");
        Preconditions.checkArgument(StringUtils.isNotBlank(contrasena),
                "La contraseña no puede estar vacía");
        Preconditions.checkArgument(!usuarioDAO.existePorCorreo(correo),
                "Ya existe una cuenta con ese correo");

        Rol rolCliente = new Rol();
        rolCliente.setId(2); // 2 = Cliente (ya existe en BD)

        Usuario nuevo = new Usuario();
        nuevo.setNombre(nombre);
        nuevo.setApellido(apellido);
        nuevo.setCorreo(correo.toLowerCase().trim());
        nuevo.setContrasena(encoder.encode(contrasena)); // BCrypt
        nuevo.setTelefono(telefono);
        nuevo.setRol(rolCliente);

        Usuario guardado = usuarioDAO.guardar(nuevo);
        log.info("Nuevo usuario registrado: {}", correo);
        return guardado;
    }

    // ── LOGIN ────────────────────────────────────────────────────────────────
    @Override
    public String login(String correo, String contrasena) {
        Preconditions.checkArgument(StringUtils.isNotBlank(correo), "Correo requerido");
        Preconditions.checkArgument(StringUtils.isNotBlank(contrasena), "Contraseña requerida");

        Usuario usuario = usuarioDAO.buscarPorCorreo(correo.toLowerCase().trim())
                .orElseThrow(() -> {
                    log.warn("Intento de login con correo inexistente: {}", correo);
                    return new RuntimeException("Credenciales incorrectas");
                });

        if (!encoder.matches(contrasena, usuario.getContrasena())) {
            log.warn("Contraseña incorrecta para: {}", correo);
            throw new RuntimeException("Credenciales incorrectas");
        }

        String rol = usuario.getRol() != null ? usuario.getRol().getDescripcion() : "CLIENTE";
        String token = jwtUtil.generarToken(usuario.getCorreo(), rol);
        log.info("Login exitoso: {} ({})", correo, rol);
        return token;
    }

    // ── OLVIDÉ MI CONTRASEÑA ────────────────────────────────────────────────
    @Override
    public void solicitarRecuperacion(String correo) {
        // Por seguridad: no revelar si el correo existe o no
        usuarioDAO.buscarPorCorreo(correo.toLowerCase().trim()).ifPresent(usuario -> {

            // Generar token único (UUID) y guardar con expiración de 15 minutos
            String token = UUID.randomUUID().toString();
            usuario.setResetToken(token);
            usuario.setResetTokenExpiry(LocalDateTime.now().plusMinutes(15));
            usuarioDAO.guardar(usuario);

            // Enviar correo con el enlace de restablecimiento
            enviarCorreoRecuperacion(correo, token);
            log.info("Correo de recuperación enviado a: {}", correo);
        });
    }

    // ── RESTABLECER CONTRASEÑA ──────────────────────────────────────────────
    @Override
    public void restablecerContrasena(String token, String nuevaContrasena) {
        Preconditions.checkArgument(StringUtils.isNotBlank(token), "Token requerido");
        Preconditions.checkArgument(
                StringUtils.isNotBlank(nuevaContrasena) && nuevaContrasena.length() >= 6,
                "La nueva contraseña debe tener al menos 6 caracteres");

        Usuario usuario = usuarioDAO.buscarPorResetToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido o ya utilizado"));

        // Verificar que el token no haya expirado
        if (usuario.getResetTokenExpiry() == null ||
                LocalDateTime.now().isAfter(usuario.getResetTokenExpiry())) {
            throw new RuntimeException("El enlace de recuperación ha expirado. Solicita uno nuevo.");
        }

        // Actualizar contraseña y limpiar token
        usuario.setContrasena(encoder.encode(nuevaContrasena));
        usuario.setResetToken(null);
        usuario.setResetTokenExpiry(null);
        usuarioDAO.guardar(usuario);

        log.info("Contraseña restablecida exitosamente para: {}", usuario.getCorreo());
    }

    // ── Método privado: envío de email ──────────────────────────────────────
    private void enviarCorreoRecuperacion(String destinatario, String token) {
        // El link apunta al frontend con el token como parámetro
        String link = "http://localhost:3000/restablecer-contrasena?token=" + token;

        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(destinatario);
        mensaje.setSubject("🎂 SweetCreamPink — Recuperación de contraseña");
        mensaje.setText(
            "Hola,\n\n" +
            "Recibimos una solicitud para restablecer tu contraseña.\n\n" +
            "Haz clic en el siguiente enlace (válido por 15 minutos):\n" +
            link + "\n\n" +
            "Si no solicitaste este cambio, puedes ignorar este correo.\n\n" +
            "Con cariño,\nEl equipo de SweetCreamPink 🌸"
        );
        mailSender.send(mensaje);
    }
}