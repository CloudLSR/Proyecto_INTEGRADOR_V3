package Controlador;

import Modelo.Orden;
import Repositorio.OrdenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/ventas")
@CrossOrigin(origins = "${cors.allowed-origins}")
@PreAuthorize("hasRole('ADMIN')")
public class AdminVentasController {

    @Autowired
    private OrdenRepository ordenRepository;

    @GetMapping("/mes")
    public ResponseEntity<?> ventasMes() {
        YearMonth mes = YearMonth.now();
        LocalDateTime inicio = mes.atDay(1).atStartOfDay();
        LocalDateTime fin    = mes.atEndOfMonth().atTime(23, 59, 59);
        return ResponseEntity.ok(construirResumen(inicio, fin, "mes"));
    }

    @GetMapping("/semana")
    public ResponseEntity<?> ventasSemana() {
        LocalDateTime ahora  = LocalDateTime.now();
        int diasDesdeLunes   = ahora.getDayOfWeek().getValue() - 1;
        LocalDateTime inicio = ahora.minusDays(diasDesdeLunes).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime fin    = inicio.plusDays(6).withHour(23).withMinute(59).withSecond(59);
        return ResponseEntity.ok(construirResumen(inicio, fin, "semana"));
    }

    @GetMapping("/anio")
    public ResponseEntity<?> ventasAnio() {
        int anio = LocalDateTime.now().getYear();
        LocalDateTime inicio = LocalDateTime.of(anio, 1, 1, 0, 0, 0);
        LocalDateTime fin    = LocalDateTime.of(anio, 12, 31, 23, 59, 59);
        return ResponseEntity.ok(construirResumen(inicio, fin, "año"));
    }

    @GetMapping("/todas")
    public ResponseEntity<List<Orden>> todasLasVentas() {
        List<Orden> ordenes = ordenRepository.findAll();
        ordenes.sort((a, b) -> {
            if (a.getFecha() == null) return 1;
            if (b.getFecha() == null) return -1;
            return b.getFecha().compareTo(a.getFecha());
        });
        return ResponseEntity.ok(ordenes);
    }

    @GetMapping("/rango")
    public ResponseEntity<?> ventasRango(
            @RequestParam String desde,
            @RequestParam String hasta) {
        try {
            DateTimeFormatter fmt = DateTimeFormatter.ISO_LOCAL_DATE;
            LocalDateTime inicio  = java.time.LocalDate.parse(desde, fmt).atStartOfDay();
            LocalDateTime fin     = java.time.LocalDate.parse(hasta, fmt).atTime(23, 59, 59);
            return ResponseEntity.ok(construirResumen(inicio, fin, "rango " + desde + " → " + hasta));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "Formato de fecha inválido. Use: YYYY-MM-DD"));
        }
    }

    private Map<String, Object> construirResumen(LocalDateTime inicio, LocalDateTime fin, String tipo) {
        List<Orden> ordenes = ordenRepository.findByOrdFechaBetween(inicio, fin);

        List<Orden> validas = ordenes.stream()
            .filter(o -> Orden.EstadoOrden.Cancelado != o.getEstado())
            .collect(Collectors.toList());

        BigDecimal total = validas.stream()
            .map(o -> BigDecimal.valueOf(o.getTotal() != null ? o.getTotal() : 0.0))
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        DateTimeFormatter diaFmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Map<String, Double> porDia = new LinkedHashMap<>();
        for (Orden o : validas) {
            if (o.getFecha() != null) {
                String dia = o.getFecha().format(diaFmt);
                porDia.merge(dia, o.getTotal() != null ? o.getTotal() : 0.0, Double::sum);
            }
        }

        Map<String, Object> resultado = new LinkedHashMap<>();
        resultado.put("tipo",              tipo);
        resultado.put("desde",             inicio.toLocalDate().toString());
        resultado.put("hasta",             fin.toLocalDate().toString());
        resultado.put("totalOrdenes",      ordenes.size());
        resultado.put("ordenesValidas",    validas.size());
        resultado.put("ordenesCanceladas", ordenes.size() - validas.size());
        resultado.put("totalIngresos",     total);
        resultado.put("ventasPorDia",      porDia);
        resultado.put("ordenes",           ordenes);

        return resultado;
    }
}