package DAO;

import Modelo.Orden;

import java.util.List;
import java.util.Optional;

/** DAO para historial de pedidos. */
public interface OrdenDAO {
    Orden guardar(Orden orden);
    Optional<Orden> buscarPorId(Integer id);
    List<Orden> historialPorUsuario(Integer usuarioId);
    List<Orden> listarTodas();
}