package com.SweetCreamPink.demoSpringBoot.service;

import com.SweetCreamPink.demoSpringBoot.Modelo.Usuario;

/**
 * Contrato del servicio de autenticación.
 * Cubre registro, login, olvido de contraseña y restablecimiento.
 */
public interface AuthService {

    /** Registra un nuevo usuario (cliente). Lanza excepción si el correo ya existe. */
    Usuario registrar(String nombre, String apellido, String correo,
                      String contrasena, String telefono);

    /**
     * Valida credenciales y devuelve el token JWT.
     * @throws RuntimeException si las credenciales son incorrectas.
     */
    String login(String correo, String contrasena);

    /**
     * Genera un token de recuperación y lo envía al correo.
     * No revela si el correo existe o no (seguridad contra enumeración).
     */
    void solicitarRecuperacion(String correo);

    /**
     * Cambia la contraseña usando el token de recuperación recibido por email.
     * @throws RuntimeException si el token es inválido o expiró.
     */
    void restablecerContrasena(String token, String nuevaContrasena);
}