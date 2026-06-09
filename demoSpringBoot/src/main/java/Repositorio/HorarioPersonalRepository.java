package Repositorio;

import Modelo.HorarioPersonal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HorarioPersonalRepository extends JpaRepository<HorarioPersonal, Integer> {
    List<HorarioPersonal> findByPersonal_PerId(Integer perId);
    void deleteByPersonal_PerId(Integer perId);
}