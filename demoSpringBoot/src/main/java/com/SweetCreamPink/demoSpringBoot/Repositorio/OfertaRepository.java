package com.SweetCreamPink.demoSpringBoot.Repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.SweetCreamPink.demoSpringBoot.Modelo.Oferta;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OfertaRepository extends JpaRepository<Oferta, Integer> {

    List<Oferta> findByOferActivaTrue();

    /** Ofertas vigentes hoy */
    @Query("SELECT o FROM Oferta o WHERE o.oferActiva = true " +
           "AND o.oferFechaInicio <= :hoy AND o.oferFechaFin >= :hoy")
    List<Oferta> findVigentes(@Param("hoy") LocalDate hoy);

    // FIX: el campo @Id en Producto.java se llama "id" (no "proId")
    // aunque la columna en BD se llame proId
    @Query("SELECT o FROM Oferta o WHERE o.producto.id = :proId")
    List<Oferta> findByProductoId(@Param("proId") Integer proId);
}