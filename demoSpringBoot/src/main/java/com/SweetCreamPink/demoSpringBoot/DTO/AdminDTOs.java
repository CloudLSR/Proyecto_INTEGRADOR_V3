package com.SweetCreamPink.demoSpringBoot.DTO;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTOs exclusivos del panel de administrador.
 */
public class AdminDTOs {

    // ── Login de segundo factor (pin/código admin) ────────────────────────────
    public static class AdminPinRequest {
        private String correo;
        private String pin;

        public String getCorreo() { return correo; }
        public void setCorreo(String correo) { this.correo = correo; }
        public String getPin() { return pin; }
        public void setPin(String pin) { this.pin = pin; }
    }

    // ── Dashboard resumen ─────────────────────────────────────────────────────
    public static class DashboardResumen {
        private long totalOrdenesMes;
        private long ordenesPendientes;
        private long ordenesPreparando;
        private long ordenesEntregadas;
        private long ordenesCanceladas;
        private BigDecimal ingresosMes;
        private long totalClientes;
        private long totalProductos;
        private long personalActivo;

        public long getTotalOrdenesMes() { return totalOrdenesMes; }
        public void setTotalOrdenesMes(long v) { this.totalOrdenesMes = v; }
        public long getOrdenesPendientes() { return ordenesPendientes; }
        public void setOrdenesPendientes(long v) { this.ordenesPendientes = v; }
        public long getOrdenesPreparando() { return ordenesPreparando; }
        public void setOrdenesPreparando(long v) { this.ordenesPreparando = v; }
        public long getOrdenesEntregadas() { return ordenesEntregadas; }
        public void setOrdenesEntregadas(long v) { this.ordenesEntregadas = v; }
        public long getOrdenesCanceladas() { return ordenesCanceladas; }
        public void setOrdenesCanceladas(long v) { this.ordenesCanceladas = v; }
        public BigDecimal getIngresosMes() { return ingresosMes; }
        public void setIngresosMes(BigDecimal v) { this.ingresosMes = v; }
        public long getTotalClientes() { return totalClientes; }
        public void setTotalClientes(long v) { this.totalClientes = v; }
        public long getTotalProductos() { return totalProductos; }
        public void setTotalProductos(long v) { this.totalProductos = v; }
        public long getPersonalActivo() { return personalActivo; }
        public void setPersonalActivo(long v) { this.personalActivo = v; }
    }

    // ── Reporte de ventas por período ─────────────────────────────────────────
    public static class VentaResumen {
        private String periodo;
        private long cantidadOrdenes;
        private BigDecimal totalVentas;

        public VentaResumen() {}
        public VentaResumen(String periodo, long cantidadOrdenes, BigDecimal totalVentas) {
            this.periodo = periodo;
            this.cantidadOrdenes = cantidadOrdenes;
            this.totalVentas = totalVentas;
        }

        public String getPeriodo() { return periodo; }
        public long getCantidadOrdenes() { return cantidadOrdenes; }
        public BigDecimal getTotalVentas() { return totalVentas; }
    }

    // ── Producto top ventas ───────────────────────────────────────────────────
    public static class ProductoTop {
        private String nombreProducto;
        private long cantidadVendida;
        private BigDecimal totalGenerado;

        public ProductoTop(String nombreProducto, long cantidadVendida, BigDecimal totalGenerado) {
            this.nombreProducto = nombreProducto;
            this.cantidadVendida = cantidadVendida;
            this.totalGenerado = totalGenerado;
        }

        public String getNombreProducto() { return nombreProducto; }
        public long getCantidadVendida() { return cantidadVendida; }
        public BigDecimal getTotalGenerado() { return totalGenerado; }
    }

    // ── Reporte completo ──────────────────────────────────────────────────────
    public static class ReporteCompleto {
        private List<VentaResumen> ventasPorPeriodo;
        private List<ProductoTop> topProductos;
        private BigDecimal totalGeneral;
        private long totalOrdenes;

        public List<VentaResumen> getVentasPorPeriodo() { return ventasPorPeriodo; }
        public void setVentasPorPeriodo(List<VentaResumen> v) { this.ventasPorPeriodo = v; }
        public List<ProductoTop> getTopProductos() { return topProductos; }
        public void setTopProductos(List<ProductoTop> v) { this.topProductos = v; }
        public BigDecimal getTotalGeneral() { return totalGeneral; }
        public void setTotalGeneral(BigDecimal v) { this.totalGeneral = v; }
        public long getTotalOrdenes() { return totalOrdenes; }
        public void setTotalOrdenes(long v) { this.totalOrdenes = v; }
    }
}