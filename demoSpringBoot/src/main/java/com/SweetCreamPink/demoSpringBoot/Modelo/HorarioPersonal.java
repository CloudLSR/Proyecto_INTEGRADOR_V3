package com.SweetCreamPink.demoSpringBoot.Modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "horario_personal")
public class HorarioPersonal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer horId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "perId_fk", nullable = false)
    @JsonIgnore
    private Personal personal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DiaSemana horDia;

    @Column(nullable = false)
    private LocalTime horEntrada;

    @Column(nullable = false)
    private LocalTime horSalida;

    public enum DiaSemana {
        Lunes, Martes, Miercoles, Jueves, Viernes, Sabado, Domingo
    }

    // --- Getters y Setters ---
    public Integer getHorId() { return horId; }
    public void setHorId(Integer horId) { this.horId = horId; }

    public Personal getPersonal() { return personal; }
    public void setPersonal(Personal personal) { this.personal = personal; }

    public DiaSemana getHorDia() { return horDia; }
    public void setHorDia(DiaSemana horDia) { this.horDia = horDia; }

    public LocalTime getHorEntrada() { return horEntrada; }
    public void setHorEntrada(LocalTime horEntrada) { this.horEntrada = horEntrada; }

    public LocalTime getHorSalida() { return horSalida; }
    public void setHorSalida(LocalTime horSalida) { this.horSalida = horSalida; }
}