package com.SweetCreamPink.demoSpringBoot.service;

import com.SweetCreamPink.demoSpringBoot.Modelo.Usuario;
/**
 * Gestión del perfil del usuario autenticado.
 */

public interface UsuarioService {
    Usuario obtenerPerfil(Integer usuarioId);
    Usuario actualizarPerfil(Integer usuarioId, String nombre, String apellido, String telefono);
}