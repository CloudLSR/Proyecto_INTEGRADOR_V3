package com.SweetCreamPink.demoSpringBoot.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SweetCreamPink.demoSpringBoot.Modelo.Pedido;
import com.SweetCreamPink.demoSpringBoot.Modelo.Usuario;

import java.util.List;

public interface PedidoDAO extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuario(Usuario usuario);
    List<Pedido> findByUsuarioAndEstado(Usuario usuario, String estado);
}