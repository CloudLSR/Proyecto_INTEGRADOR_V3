package com.SweetCreamPink.demoSpringBoot.Repositorio;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.SweetCreamPink.demoSpringBoot.Modelo.Comentario;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    List<Comentario> findByAprobadoTrue();
    List<Comentario> findByAprobadoFalse();
    List<Comentario> findByProductoIdAndAprobadoTrue(Integer productoId);
}