package service;

import Modelo.Direccion;
import java.util.List;

public interface DireccionService {
    Direccion agregar(Integer usuarioId, String direccion, String distrito,
                      String ciudad, String codigoPostal, String referencia, boolean esPrincipal);
    List<Direccion> listar(Integer usuarioId);
    Direccion actualizar(Long direccionId, Integer usuarioId, String direccion,
                         String distrito, String ciudad, String codigoPostal,
                         String referencia, boolean esPrincipal);
    void eliminar(Long direccionId, Integer usuarioId);
}