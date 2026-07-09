package com.SweetCreamPink.demoSpringBoot.service;

import com.SweetCreamPink.demoSpringBoot.DAO.OrdenDAO;
import com.SweetCreamPink.demoSpringBoot.DAO.UsuarioDAO;
import com.SweetCreamPink.demoSpringBoot.Modelo.*;
import com.SweetCreamPink.demoSpringBoot.Modelo.Orden.MetodoPagoOrden;
import com.SweetCreamPink.demoSpringBoot.Repositorio.ProductoRepository;
import com.SweetCreamPink.demoSpringBoot.service.OrdenService;
import com.google.common.base.Preconditions;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class OrdenServiceImpl implements OrdenService {

    private static final Logger log = LoggerFactory.getLogger(OrdenServiceImpl.class);

    private final OrdenDAO          ordenDAO;
    private final UsuarioDAO        usuarioDAO;
    private final ProductoRepository productoRepo;

    public OrdenServiceImpl(OrdenDAO ordenDAO,
                            UsuarioDAO usuarioDAO,
                            ProductoRepository productoRepo) {
        this.ordenDAO    = ordenDAO;
        this.usuarioDAO  = usuarioDAO;
        this.productoRepo = productoRepo;
    }

    // ── CREAR ORDEN ──────────────────────────────────────────────────────────
    @Override
    public Orden crearOrden(Integer usuarioId, String direccionEntrega,
                            MetodoPagoOrden metodoPago,
                            Orden.TipoEntrega tipoEntrega,
                            List<Map<String, Object>> detalles) {

        Preconditions.checkNotNull(usuarioId, "El ID de usuario es requerido");
        Preconditions.checkArgument(detalles != null && !detalles.isEmpty(),
                "La orden debe tener al menos un producto");

        Usuario usuario = usuarioDAO.buscarPorId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Orden orden = new Orden();
        orden.setUsuario(usuario);
        orden.setDireccionEntrega(direccionEntrega);
        orden.setMetodoPago(metodoPago);
        orden.setTipoEntrega(tipoEntrega != null ? tipoEntrega : Orden.TipoEntrega.Recojo);

        List<DetalleOrden> lineas = new ArrayList<>();
        double totalOrden = 0.0;

        for (Map<String, Object> item : detalles) {
            Integer productoId  = (Integer) item.get("productoId");
            Integer cantidad    = (Integer) item.get("cantidad");
            Double  precio      = Double.parseDouble(item.get("precio").toString());

            DetalleOrden detalle = new DetalleOrden();
            detalle.setOrden(orden);
            detalle.setCantidad(cantidad);
            detalle.setPrecio(precio);
            detalle.calcularSubtotal(); // llama @PrePersist manualmente

            // Asociar producto si viene el ID
            if (productoId != null) {
                productoRepo.findById(productoId).ifPresent(detalle::setProducto);
            }

            totalOrden += detalle.getSubTotal() != null ? detalle.getSubTotal() : 0;
            lineas.add(detalle);
        }

        orden.setDetalles(lineas);
        orden.setTotal(totalOrden);

        Orden guardada = ordenDAO.guardar(orden);
        log.info("Orden #{} creada para usuarioId: {} — Total: S/.{}", guardada.getId(), usuarioId, totalOrden);
        return guardada;
    }

    // ── HISTORIAL ────────────────────────────────────────────────────────────
    @Override
    public List<Orden> historial(Integer usuarioId) {
        log.debug("Consultando historial de usuarioId: {}", usuarioId);
        return ordenDAO.historialPorUsuario(usuarioId);
    }

    @Override
    public Orden buscarPorId(Integer ordenId) {
        return ordenDAO.buscarPorId(ordenId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
    }

    // ── EXPORTAR A EXCEL (Apache POI) ────────────────────────────────────────
    @Override
    public ByteArrayOutputStream exportarHistorialExcel(Integer usuarioId) {
        List<Orden> ordenes = historial(usuarioId);

        try (Workbook wb = new XSSFWorkbook()) {
            Sheet hoja = wb.createSheet("Historial de Pedidos");

            // ── Estilo de encabezado ─────────────────────────────────────
            CellStyle estiloHeader = wb.createCellStyle();
            Font fuenteHeader = wb.createFont();
            fuenteHeader.setBold(true);
            fuenteHeader.setColor(IndexedColors.WHITE.getIndex());
            estiloHeader.setFont(fuenteHeader);
            estiloHeader.setFillForegroundColor(IndexedColors.ROSE.getIndex());
            estiloHeader.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            estiloHeader.setAlignment(HorizontalAlignment.CENTER);

            // ── Fila de encabezados ─────────────────────────────────────
            Row header = hoja.createRow(0);
            String[] columnas = {"# Orden", "Fecha", "Producto", "Variante",
                                 "Cantidad", "Precio Unit.", "Subtotal",
                                 "Total Orden", "Estado", "Método Pago"};
            for (int i = 0; i < columnas.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columnas[i]);
                cell.setCellStyle(estiloHeader);
                hoja.setColumnWidth(i, 4500);
            }

            // ── Filas de datos ──────────────────────────────────────────
            int fila = 1;
            DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

            for (Orden orden : ordenes) {
                for (DetalleOrden detalle : orden.getDetalles()) {
                    Row row = hoja.createRow(fila++);
                    row.createCell(0).setCellValue(orden.getId());
                    row.createCell(1).setCellValue(
                            orden.getFecha() != null ? orden.getFecha().format(fmt) : "");
                    row.createCell(2).setCellValue(
                            detalle.getProducto() != null ? detalle.getProducto().getNombre() : "");
                    row.createCell(3).setCellValue(
                            detalle.getVariante() != null ? detalle.getVariante().getNombre() : "");
                    row.createCell(4).setCellValue(detalle.getCantidad());
                    row.createCell(5).setCellValue(detalle.getPrecio());
                    row.createCell(6).setCellValue(detalle.getSubTotal());
                    row.createCell(7).setCellValue(orden.getTotal());
                    row.createCell(8).setCellValue(
                            orden.getEstado() != null ? orden.getEstado().name() : "");
                    row.createCell(9).setCellValue(
                            orden.getMetodoPago() != null ? orden.getMetodoPago().name() : "");
                }
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            wb.write(out);
            log.info("Excel de historial generado para usuarioId: {}", usuarioId);
            return out;

        } catch (IOException e) {
            log.error("Error generando Excel para usuarioId: {}", usuarioId, e);
            throw new RuntimeException("Error generando el archivo Excel");
        }
    }
}