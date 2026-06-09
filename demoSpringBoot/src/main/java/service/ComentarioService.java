package service;

import Modelo.Comentario;
import java.util.List;

/**
 * Gestión de comentarios / reseñas de productos.
 * Los comentarios requieren aprobación del Admin antes de ser visibles.
 */
public interface ComentarioService {
    Comentario crear(Integer usuarioId, Integer productoId,
                     String contenido, String nombre, Integer calificacion);
    List<Comentario> listarAprobados();
    List<Comentario> listarAprobadosPorProducto(Integer productoId);
    List<Comentario> listarPendientes();  // solo Admin
    Comentario aprobar(Long comentarioId);
    void eliminar(Long comentarioId);
}