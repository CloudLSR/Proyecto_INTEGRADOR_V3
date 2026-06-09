package Repositorio;

import Modelo.Orden;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OrdenRepository extends JpaRepository<Orden, Integer> {

    // Usado en Dashboard, Ventas y Reportes
    List<Orden> findByOrdFechaBetween(LocalDateTime inicio, LocalDateTime fin);

    // Usado en AdminPedidosController
    List<Orden> findByOrdEstado(String estado);

    // Usado en OrdenDAOImpl — referencia campo Java 'fecha' y relación 'usuario.id'
    List<Orden> findByUsuario_IdOrderByFechaDesc(Integer usuarioId);
}