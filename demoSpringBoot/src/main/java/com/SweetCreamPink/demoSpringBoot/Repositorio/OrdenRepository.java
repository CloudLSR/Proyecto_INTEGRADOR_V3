package com.SweetCreamPink.demoSpringBoot.Repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SweetCreamPink.demoSpringBoot.Modelo.Orden;

import java.time.LocalDateTime;
import java.util.List;

public interface OrdenRepository extends JpaRepository<Orden, Integer> {

    List<Orden> findByFechaBetween(LocalDateTime inicio, LocalDateTime fin);

    List<Orden> findByEstado(Orden.EstadoOrden estado);

    List<Orden> findByUsuario_IdOrderByFechaDesc(Integer usuarioId);
}