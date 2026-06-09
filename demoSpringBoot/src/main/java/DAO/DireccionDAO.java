package DAO;

import Modelo.Direccion;
import java.util.List;
import java.util.Optional;

/**
 * Interfaz DAO para Direccion.
 *
 * FIX COMPLETO: La versión original extendía JpaRepository directamente,
 * pero DireccionServiceImpl llama a métodos como guardar(), buscarPorId(),
 * listarPorUsuario(), buscarPrincipal() y eliminar() que no existen en
 * JpaRepository. Se reescribe como interfaz DAO pura (patrón consistente
 * con UsuarioDAO), y se crea DireccionDAOImpl que sí usa el repositorio.
 */
public interface DireccionDAO {
    Direccion guardar(Direccion direccion);
    Optional<Direccion> buscarPorId(Long id);
    List<Direccion> listarPorUsuario(Integer usuarioId);
    Optional<Direccion> buscarPrincipal(Integer usuarioId);
    void eliminar(Long id);
}