package DAO;

import Modelo.Usuario;

import java.util.List;
import java.util.Optional;

/**
 * Interfaz DAO para Usuario.
 * Aplica principio de Inversión de Dependencias (DIP) de SOLID:
 * los servicios dependen de esta abstracción, no de la implementación concreta.
 */
public interface UsuarioDAO {
    Usuario guardar(Usuario usuario);
    Optional<Usuario> buscarPorId(Integer id);
    Optional<Usuario> buscarPorCorreo(String correo);
    Optional<Usuario> buscarPorResetToken(String token);
    List<Usuario> listarTodos();
    void eliminar(Integer id);
    boolean existePorCorreo(String correo);
}