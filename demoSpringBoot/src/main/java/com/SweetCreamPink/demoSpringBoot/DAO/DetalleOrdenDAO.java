package com.SweetCreamPink.demoSpringBoot.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SweetCreamPink.demoSpringBoot.Modelo.DetalleOrden;

@Repository
public interface DetalleOrdenDAO extends JpaRepository<DetalleOrden, Integer> {
}