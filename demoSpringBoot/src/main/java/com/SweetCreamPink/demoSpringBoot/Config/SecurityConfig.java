package com.SweetCreamPink.demoSpringBoot.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.SweetCreamPink.demoSpringBoot.Security.CustomUserDetailsService;
import com.SweetCreamPink.demoSpringBoot.Security.JwtAuthFilter;

import java.util.Arrays;
import java.util.List;

/**
 * SecurityConfig — configuración de Spring Security.
 * * CORRECCIONES APLICADAS EN ESTA VERSIÓN:
 * 1. Reorganización estricta del orden de filtros (Públicos arriba, Restrictivos abajo)
 * para evitar el error 403 Forbidden en registros y logins.
 * 2. Permitir explícitamente peticiones HttpMethod.OPTIONS en todo el servidor para evitar fallos de CORS Preflight.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final CustomUserDetailsService userDetailsService;

    @Value("${cors.allowed-origins}")
    private String allowedOriginsRaw;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter,
                          CustomUserDetailsService userDetailsService) {
        this.jwtAuthFilter   = jwtAuthFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth

                // 1. PERMITIR PREFLIGHT OPTIONS GLOBALMENTE (Esencial para navegadores y React)
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // 2. RUTAS PÚBLICAS GENERALES (Sin importar el método HTTP)
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/uploads/**", "/assets/**").permitAll()

                // 3. RUTAS PÚBLICAS ESPECÍFICAS DE TIPO POST (Registro, Login, Endpoints de Admin Públicos)
                .requestMatchers(HttpMethod.POST,
                        "/api/auth/registro",
                        "/api/auth/login",
                        "/api/auth/olvide-contrasena",
                        "/api/auth/restablecer-contrasena",
                        "/api/admin/auth/verificar-admin",
                        "/api/admin/auth/pin"
                ).permitAll()

                // 4. RUTAS PÚBLICAS ESPECÍFICAS DE TIPO GET
                .requestMatchers(HttpMethod.GET,
                        "/api/productos/**",
                        "/api/comentarios/aprobados/**",
                        "/api/ofertas/vigentes"
                ).permitAll()

                // 5. RUTAS PRIVADAS - SOLO PARA ROL ADMIN
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/productos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST,   "/api/productos/guardar").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT,    "/api/productos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT,    "/api/comentarios/*/aprobar").hasRole("ADMIN")

                // 6. RUTAS PRIVADAS - PARA ROLES CLIENTE o ADMIN AUTENTICADOS
                .requestMatchers("/api/perfil/**").hasAnyRole("CLIENTE", "ADMIN")
                .requestMatchers("/api/direcciones/**").hasAnyRole("CLIENTE", "ADMIN")
                .requestMatchers("/api/metodos-pago/**").hasAnyRole("CLIENTE", "ADMIN")
                .requestMatchers("/api/ordenes/**").hasAnyRole("CLIENTE", "ADMIN")
                .requestMatchers("/api/carrito/**").hasAnyRole("CLIENTE", "ADMIN")
                .requestMatchers("/api/configuracion/**").hasAnyRole("CLIENTE", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/comentarios/**").hasAnyRole("CLIENTE", "ADMIN")

                // CUALQUIER OTRA RUTA NO ESPECIFICADA ARRIBA REQUIERE AUTENTICACIÓN
                .anyRequest().authenticated()
            )
            // Filtro JWT antes del filtro de usuario/contraseña estándar
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Mapear los orígenes permitidos desde application.properties
        List<String> origenes = Arrays.asList(allowedOriginsRaw.split(","));
        config.setAllowedOrigins(origenes);

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        
        // Exponer la cabecera de Autorización para que React pueda guardar el JWT Token
        config.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}