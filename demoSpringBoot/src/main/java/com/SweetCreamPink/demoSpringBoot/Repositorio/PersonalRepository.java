// ── PersonalRepository.java ──────────────────────────────────────────────────
package com.SweetCreamPink.demoSpringBoot.Repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SweetCreamPink.demoSpringBoot.Modelo.Personal;

import java.util.List;

@Repository
public interface PersonalRepository extends JpaRepository<Personal, Integer> {
    List<Personal> findByPerEstado(Personal.EstadoPersonal estado);
    boolean existsByPerCorreo(String correo);
}