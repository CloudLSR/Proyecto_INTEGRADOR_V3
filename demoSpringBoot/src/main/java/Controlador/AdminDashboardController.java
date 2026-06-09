package Controlador;

import DTO.AdminDTOs;
import Modelo.Orden;
import Modelo.Personal;
import Repositorio.OrdenRepository;
import Repositorio.PersonalRepository;
import Repositorio.ProductoRepository;
import Repositorio.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin(origins = "${cors.allowed-origins}")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {

    @Autowired private OrdenRepository    ordenRepository;
    @Autowired private UsuarioRepository  usuarioRepository;
    @Autowired private ProductoRepository productoRepository;
    @Autowired private PersonalRepository personalRepository;

    @GetMapping
    public ResponseEntity<AdminDTOs.DashboardResumen> getDashboard() {
        AdminDTOs.DashboardResumen resumen = new AdminDTOs.DashboardResumen();

        YearMonth mesActual = YearMonth.now();
        LocalDateTime inicio = mesActual.atDay(1).atStartOfDay();
        LocalDateTime fin    = mesActual.atEndOfMonth().atTime(23, 59, 59);

        List<Orden> ordenesMes = ordenRepository.findByOrdFechaBetween(inicio, fin);

        resumen.setTotalOrdenesMes(ordenesMes.size());

        resumen.setOrdenesPendientes(
            ordenesMes.stream()
                .filter(o -> Orden.EstadoOrden.Pendiente == o.getEstado()).count());
        resumen.setOrdenesPreparando(
            ordenesMes.stream()
                .filter(o -> Orden.EstadoOrden.Preparando == o.getEstado()).count());
        resumen.setOrdenesEntregadas(
            ordenesMes.stream()
                .filter(o -> Orden.EstadoOrden.Entregado == o.getEstado()).count());
        resumen.setOrdenesCanceladas(
            ordenesMes.stream()
                .filter(o -> Orden.EstadoOrden.Cancelado == o.getEstado()).count());

        BigDecimal ingresos = ordenesMes.stream()
            .filter(o -> Orden.EstadoOrden.Cancelado != o.getEstado())
            .map(o -> BigDecimal.valueOf(o.getTotal() != null ? o.getTotal() : 0.0))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        resumen.setIngresosMes(ingresos);

        resumen.setTotalClientes(usuarioRepository.count());
        resumen.setTotalProductos(productoRepository.count());
        resumen.setPersonalActivo(
            personalRepository.findByPerEstado(Personal.EstadoPersonal.Activo).size());

        return ResponseEntity.ok(resumen);
    }
}