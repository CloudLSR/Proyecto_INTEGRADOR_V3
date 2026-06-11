// ════════════════════════════════════════════════════
// ARCHIVO: UsuarioRepository.java
// CARPETA: src/main/java/com/SweetCreamPink/demoSpringBoot/repositorio/
// ════════════════════════════════════════════════════
package com.SweetCreamPink.demoSpringBoot.Repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SweetCreamPink.demoSpringBoot.Modelo.Usuario;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByCorreo(String correo);
    boolean existsByCorreo(String correo);
    Optional<Usuario> findByResetToken(String token);
}