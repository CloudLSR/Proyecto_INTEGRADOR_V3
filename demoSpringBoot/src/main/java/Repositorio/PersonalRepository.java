// ── PersonalRepository.java ──────────────────────────────────────────────────
package Repositorio;

import Modelo.Personal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PersonalRepository extends JpaRepository<Personal, Integer> {
    List<Personal> findByPerEstado(Personal.EstadoPersonal estado);
    boolean existsByPerCorreo(String correo);
}