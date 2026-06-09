package Repositorio;

import Modelo.Oferta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface OfertaRepository extends JpaRepository<Oferta, Integer> {

    List<Oferta> findByOferActivaTrue();

    /** Ofertas vigentes hoy */
    @Query("SELECT o FROM Oferta o WHERE o.oferActiva = true " +
           "AND o.oferFechaInicio <= :hoy AND o.oferFechaFin >= :hoy")
    List<Oferta> findVigentes(LocalDate hoy);

    List<Oferta> findByProducto_ProId(Integer proId);
}