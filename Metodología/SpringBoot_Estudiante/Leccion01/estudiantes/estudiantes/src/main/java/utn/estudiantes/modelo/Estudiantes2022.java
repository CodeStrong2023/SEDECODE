package utn.estudiantes.modelo;

// importaciones
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

// Notaciones
@Entity
// boilerplate - Codigo repetitivo (de la libreria lombok)
@Data // metodos get/set
@NoArgsConstructor // constructor vacio, sin argumentos
@AllArgsConstructor // constructor con todos los argumentos
@ToString

// Creamos la clase Entidad Estudiante que apunta a la tabla de la bd
public class Estudiantes2022 {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY) //es para llaves primarias autoincremental
    private Integer idestudiantes2022;
    private String nombre;
    private String apellido;
    private String telefono;
    private String email;

}
