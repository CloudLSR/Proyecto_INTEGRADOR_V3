package com.SweetCreamPink.demoSpringBoot.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.SweetCreamPink.demoSpringBoot.Modelo.Comentario;
import com.SweetCreamPink.demoSpringBoot.Repositorio.ComentarioRepository;

@Service
public class ComentarioService {

    private final ComentarioRepository comentarioRepository;

    public ComentarioService(ComentarioRepository comentarioRepository) {
        this.comentarioRepository = comentarioRepository;
    }

    public Comentario crear(Integer usuarioId, Integer productoId,
                            String contenido, String nombre, Integer calificacion) {
        throw new UnsupportedOperationException("Implementar");
    }

    public List<Comentario> listarAprobados() {
        return comentarioRepository.findByAprobadoTrue();
    }

    public List<Comentario> listarAprobadosPorProducto(Integer productoId) {
        return comentarioRepository.findByProductoIdAndAprobadoTrue(productoId);
    }

    public List<Comentario> listarPendientes() {
        return comentarioRepository.findByAprobadoFalse();
    }

    public Comentario aprobar(Long comentarioId) {
        Comentario c = comentarioRepository.findById(comentarioId)
            .orElseThrow(() -> new RuntimeException("Comentario no encontrado"));
        c.setAprobado(true);
        return comentarioRepository.save(c);
    }

    public void eliminar(Long comentarioId) {
        comentarioRepository.deleteById(comentarioId);
    }
}