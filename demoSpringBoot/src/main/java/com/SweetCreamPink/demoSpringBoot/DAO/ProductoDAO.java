package com.SweetCreamPink.demoSpringBoot.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SweetCreamPink.demoSpringBoot.Modelo.Producto;

public interface ProductoDAO extends JpaRepository<Producto, Long> {
}