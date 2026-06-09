package service;

import Modelo.MetodoPago;
import Modelo.MetodoPago.TipoPago;
import java.util.List;

public interface MetodoPagoService {
    MetodoPago agregar(Integer usuarioId, TipoPago tipo, String alias,
                       String ultimosDigitos, String titular, String banco, boolean esPrincipal);
    List<MetodoPago> listar(Integer usuarioId);
    void eliminar(Long metodoId, Integer usuarioId);
}