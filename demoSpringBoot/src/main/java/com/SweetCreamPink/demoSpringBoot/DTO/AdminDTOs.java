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
        private long totalPedidos;
        private long ordenesPendientes;
        private long ordenesPreparando;
        private long ordenesEnviadas;
        private long ordenesEntregadas;
        private long ordenesCanceladas;
        private BigDecimal ingresosMes;
        private long totalClientes;
        private long totalProductos;
        private long personalActivo;
        private List<Double> ventasSemana;
        private List<PedidoResumen> pedidosRecientes;
        private List<ProductoVendidoResumen> productosVendidos;

        public long getTotalOrdenesMes() { return totalOrdenesMes; }
        public void setTotalOrdenesMes(long v) { this.totalOrdenesMes = v; }
        public long getTotalPedidos() { return totalPedidos; }
        public void setTotalPedidos(long v) { this.totalPedidos = v; }
        public long getOrdenesPendientes() { return ordenesPendientes; }
        public void setOrdenesPendientes(long v) { this.ordenesPendientes = v; }
        public long getOrdenesPreparando() { return ordenesPreparando; }
        public void setOrdenesPreparando(long v) { this.ordenesPreparando = v; }
        public long getOrdenesEnviadas() { return ordenesEnviadas; }
        public void setOrdenesEnviadas(long v) { this.ordenesEnviadas = v; }
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
        public List<Double> getVentasSemana() { return ventasSemana; }
        public void setVentasSemana(List<Double> v) { this.ventasSemana = v; }
        public List<PedidoResumen> getPedidosRecientes() { return pedidosRecientes; }
        public void setPedidosRecientes(List<PedidoResumen> v) { this.pedidosRecientes = v; }
        public List<ProductoVendidoResumen> getProductosVendidos() { return productosVendidos; }
        public void setProductosVendidos(List<ProductoVendidoResumen> v) { this.productosVendidos = v; }
    }

    public static class PedidoResumen {
        private String id;
        private String nombre;
        private String tiempo;
        private String estado;
        private String bgBadge;
        private String colorBadge;

        public PedidoResumen(String id, String nombre, String tiempo, String estado,
                             String bgBadge, String colorBadge) {
            this.id = id; this.nombre = nombre; this.tiempo = tiempo;
            this.estado = estado; this.bgBadge = bgBadge; this.colorBadge = colorBadge;
        }

        public String getId() { return id; }
        public String getNombre() { return nombre; }
        public String getTiempo() { return tiempo; }
        public String getEstado() { return estado; }
        public String getBgBadge() { return bgBadge; }
        public String getColorBadge() { return colorBadge; }
    }

    public static class ProductoVendidoResumen {
        private int rank;
        private String imagenUrl;
        private String nombre;
        private String unidades;
        private String precio;

        public ProductoVendidoResumen(int rank, String imagenUrl, String nombre,
                                      String unidades, String precio) {
            this.rank = rank; this.imagenUrl = imagenUrl; this.nombre = nombre;
            this.unidades = unidades; this.precio = precio;
        }

        public int getRank() { return rank; }
        public String getImagenUrl() { return imagenUrl; }
        public String getNombre() { return nombre; }
        public String getUnidades() { return unidades; }
        public String getPrecio() { return precio; }
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