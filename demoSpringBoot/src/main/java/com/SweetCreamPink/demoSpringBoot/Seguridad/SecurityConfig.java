package com.SweetCreamPink.demoSpringBoot.Seguridad;

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

import java.util.Arrays;
import java.util.List;

//* SOLID — SRP: solo configura la seguridad
//*SOLID — DIP: depende de JwtAuthFilter y CustomUserDetailsService por inyección.

@Configuration
@EnableWebSecurity
@EnableMethodSecurity  //? activa @PreAuthorize en los controladores
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final CustomUserDetailsService userDetailsService;

    //? los orígenes CORS vienen de application.properties (cors.allowed-origins).
    @Value("${cors.allowed-origins}")
    private String allowedOriginsRaw;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter,
                          CustomUserDetailsService userDetailsService) {
        this.jwtAuthFilter   = jwtAuthFilter;
        this.userDetailsService = userDetailsService;
    }

    //*Bean BCrypt — se inyecta en todos los servicios que manejan contraseñas.
    //! solo debe estar declarado AQUÍ. Si lo declaras en otro @Configuration o
    //! en un controlador, Spring lanzará "ConflictingBeanDefinitionException".
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
            .csrf(csrf -> csrf.disable())           //* JWT (JSON Web Token) ya protege contra CSRF
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //* sin sesión → JWT
            .authorizeHttpRequests(auth -> auth

                //! preflight OPTIONS — los navegadores (React) envían esto antes de cada POST.
                //! si no está al principio, Spring lo bloquea antes de llegar aquí.
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                //! rutas de autenticación — siempre públicas
                .requestMatchers("/api/auth/**").permitAll()

                //! si cambias uploads.directory en application.properties, también cambia esto.
                .requestMatchers("/uploads/**", "/assets/**").permitAll()

                //! endpoints POST públicos específicos (registro, login, admin auth)
                .requestMatchers(HttpMethod.POST,
                        "/api/auth/registro",
                        "/api/auth/login",
                        "/api/auth/olvide-contrasena",
                        "/api/auth/restablecer-contrasena",
                        "/api/admin/auth/verificar-admin",
                        "/api/admin/auth/pin"
                ).permitAll()

                //! endpoints GET públicos (catálogo de productos, comentarios aprobados, ofertas vigentes)
                .requestMatchers(HttpMethod.GET,
                        "/api/productos/**",
                        "/api/comentarios/aprobados/**",
                        "/api/ofertas/vigentes"
                ).permitAll()

                //! todo /api/admin/** y operaciones de escritura sobre productos → solo ADMIN
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/productos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST,   "/api/productos/guardar").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT,    "/api/productos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT,    "/api/comentarios/*/aprobar").hasRole("ADMIN")

                //! rutas privadas del cliente (requieren JWT con rol CLIENTE o ADMIN)
                .requestMatchers("/api/perfil/**").hasAnyRole("CLIENTE", "ADMIN")
                .requestMatchers("/api/direcciones/**").hasAnyRole("CLIENTE", "ADMIN")
                .requestMatchers("/api/metodos-pago/**").hasAnyRole("CLIENTE", "ADMIN")
                .requestMatchers("/api/ordenes/**").hasAnyRole("CLIENTE", "ADMIN")
                .requestMatchers("/api/carrito/**").hasAnyRole("CLIENTE", "ADMIN")
                .requestMatchers("/api/configuracion/**").hasAnyRole("CLIENTE", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/comentarios/**").hasAnyRole("CLIENTE", "ADMIN")

                //! cualquier otra ruta no listada arriba: requiere autenticación
                .anyRequest().authenticated()
            )
            //* el filtro JWT se ejecuta ANTES del filtro estándar de usuario/contraseña.
            //* si el token es válido, Spring ya sabe quién es el usuario sin tocar la BD de sesiones.
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        List<String> origenes = Arrays.asList(allowedOriginsRaw.split(","));
        config.setAllowedOrigins(origenes);

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        //* exponer el header Authorization para que React pueda leer y guardar el JWT
        config.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}