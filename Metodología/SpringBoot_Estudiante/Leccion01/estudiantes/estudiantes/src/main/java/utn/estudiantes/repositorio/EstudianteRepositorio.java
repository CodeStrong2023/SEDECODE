// metodos CRUD para interactuar con la tabla estudiante de la bd Mysql:
package utn.estudiantes.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import utn.estudiantes.modelo.Estudiantes2022;

public interface EstudianteRepositorio extends JpaRepository<Estudiantes2022,Integer> {
}
