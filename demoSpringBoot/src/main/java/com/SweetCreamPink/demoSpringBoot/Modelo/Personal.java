package com.SweetCreamPink.demoSpringBoot.Modelo;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "personal")
public class Personal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer perId;

    @Column(nullable = false, length = 100)
    private String perNombre;

    @Column(nullable = false, length = 100)
    private String perApellido;

    @Column(nullable = false, unique = true, length = 150)
    private String perCorreo;

    @Column(length = 20)
    private String perTelefono;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RolPersonal perRol = RolPersonal.Atencion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoPersonal perEstado = EstadoPersonal.Activo;

    @Column
    private LocalDate perFechaIngreso;

    @OneToMany(mappedBy = "personal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HorarioPersonal> horarios;

    // --- Enums internos ---
    public enum RolPersonal { Administrador, Repostero, Repartidor, Atencion, Caja }
    public enum EstadoPersonal { Activo, Inactivo }

    // --- Getters y Setters ---
    public Integer getPerId() { return perId; }
    public void setPerId(Integer perId) { this.perId = perId; }

    public String getPerNombre() { return perNombre; }
    public void setPerNombre(String perNombre) { this.perNombre = perNombre; }

    public String getPerApellido() { return perApellido; }
    public void setPerApellido(String perApellido) { this.perApellido = perApellido; }

    public String getPerCorreo() { return perCorreo; }
    public void setPerCorreo(String perCorreo) { this.perCorreo = perCorreo; }

    public String getPerTelefono() { return perTelefono; }
    public void setPerTelefono(String perTelefono) { this.perTelefono = perTelefono; }

    public RolPersonal getPerRol() { return perRol; }
    public void setPerRol(RolPersonal perRol) { this.perRol = perRol; }

    public EstadoPersonal getPerEstado() { return perEstado; }
    public void setPerEstado(EstadoPersonal perEstado) { this.perEstado = perEstado; }

    public LocalDate getPerFechaIngreso() { return perFechaIngreso; }
    public void setPerFechaIngreso(LocalDate perFechaIngreso) { this.perFechaIngreso = perFechaIngreso; }

    public List<HorarioPersonal> getHorarios() { return horarios; }
    public void setHorarios(List<HorarioPersonal> horarios) { this.horarios = horarios; }
}