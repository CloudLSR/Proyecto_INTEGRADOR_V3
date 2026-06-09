package Repositorio;

import Modelo.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    /** Solo comentarios aprobados, visibles al público */
    List<Comentario> findByAprobadoTrue();
    /** Comentarios de un producto específico ya aprobados */
    List<Comentario> findByProductoIdAndAprobadoTrue(Integer productoId);
    /** Todos los comentarios pendientes para revisión del admin */
    List<Comentario> findByAprobadoFalse();
}