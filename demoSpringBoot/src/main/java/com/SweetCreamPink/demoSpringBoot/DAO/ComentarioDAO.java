package com.SweetCreamPink.demoSpringBoot.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SweetCreamPink.demoSpringBoot.Modelo.Comentario;

@Repository
public interface ComentarioDAO extends JpaRepository<Comentario, Long> {
    // Aquí Java hereda automáticamente métodos como findById, save, y findAll
}