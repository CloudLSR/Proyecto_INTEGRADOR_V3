package service;

import Modelo.Orden;
import Modelo.Orden.MetodoPagoOrden;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;

public interface OrdenService {

    /** Crea una nueva orden con sus detalles */
    Orden crearOrden(Integer usuarioId, String direccionEntrega,
                     MetodoPagoOrden metodoPago,
                     List<Map<String, Object>> detalles);

    /** Historial completo del cliente */
    List<Orden> historial(Integer usuarioId);

    /** Exporta el historial del cliente a Excel (Apache POI) */
    ByteArrayOutputStream exportarHistorialExcel(Integer usuarioId);

    Orden buscarPorId(Integer ordenId);
}