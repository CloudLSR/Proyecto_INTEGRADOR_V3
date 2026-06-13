package com.SweetCreamPink.demoSpringBoot.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SweetCreamPink.demoSpringBoot.Modelo.MetodoPago;

import java.util.List;

public interface MetodoPagoDAO extends JpaRepository<MetodoPago, Long> {
    List<MetodoPago> findByUsuarioId(Long usuId);
}