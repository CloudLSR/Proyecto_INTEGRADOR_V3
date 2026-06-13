package com.SweetCreamPink.demoSpringBoot.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SweetCreamPink.demoSpringBoot.Modelo.CarritoItem;
import com.SweetCreamPink.demoSpringBoot.Modelo.Producto;
import com.SweetCreamPink.demoSpringBoot.Modelo.ProductoVariante;
import com.SweetCreamPink.demoSpringBoot.Modelo.Usuario;

import java.util.List;
import java.util.Optional;

public interface CarritoDAO extends JpaRepository<CarritoItem, Long> {
    List<CarritoItem> findByUsuario(Usuario usuario);
    Optional<CarritoItem> findByUsuarioAndProductoAndVariante(Usuario usuario, Producto producto, ProductoVariante variante);
    void deleteByUsuario(Usuario usuario);
}