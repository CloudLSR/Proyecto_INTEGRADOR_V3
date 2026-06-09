package Repositorio;

import Modelo.Orden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio Orden — base del historial de pedidos del cliente.
 */
@Repository
public interface OrdenRepository extends JpaRepository<Orden, Integer> {
    /** Historial de un usuario ordenado del más reciente al más antiguo */
    List<Orden> findByUsuarioIdOrderByFechaDesc(Integer usuarioId);
}