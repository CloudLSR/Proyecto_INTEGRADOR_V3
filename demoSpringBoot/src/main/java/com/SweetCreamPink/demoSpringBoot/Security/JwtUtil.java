package com.SweetCreamPink.demoSpringBoot.Security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * Utilidad JWT — genera, parsea y valida tokens.
 *
 * Principio SRP: esta clase SOLO gestiona lógica JWT.
 * Usa Logback para registrar intentos inválidos.
 */
@Component
public class JwtUtil {

    private static final Logger log = LoggerFactory.getLogger(JwtUtil.class);

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expirationMs;

    @Value("${jwt.reset-expiration}")
    private long resetExpirationMs;

    private Key getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    /** Genera token de autenticación (login) */
    public String generarToken(String correo, String rol) {
        return Jwts.builder()
                .setSubject(correo)
                .claim("rol", rol)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /** Genera token de recuperación de contraseña (expira en 15 min) */
    public String generarTokenReset(String correo) {
        return Jwts.builder()
                .setSubject(correo)
                .claim("tipo", "RESET")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + resetExpirationMs))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /** Extrae el correo (subject) del token */
    public String extraerCorreo(String token) {
        return parsear(token).getBody().getSubject();
    }

    /** Verifica si el token es válido y no expiró */
    public boolean esValido(String token) {
        try {
            parsear(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.warn("Token JWT expirado: {}", e.getMessage());
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("Token JWT inválido: {}", e.getMessage());
        }
        return false;
    }

    private Jws<Claims> parsear(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token);
    }
}