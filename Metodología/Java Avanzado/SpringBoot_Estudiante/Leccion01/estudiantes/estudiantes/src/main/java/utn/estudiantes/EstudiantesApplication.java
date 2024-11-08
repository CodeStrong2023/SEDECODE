package utn.estudiantes;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import utn.estudiantes.modelo.Estudiantes2022;
import utn.estudiantes.servicio.EstudianteServicio;

import java.util.List;
import java.util.Scanner;

@SpringBootApplication
// ejecutar la aplicacion por consola
public class EstudiantesApplication implements CommandLineRunner {
	@Autowired
	private EstudianteServicio estudianteServicio;
	// impresion de log por consola
	private static final Logger logger =
			LoggerFactory.getLogger(EstudiantesApplication.class);

	// salto de linea como nl
	String nl = System.lineSeparator();

	public static void main(String[] args) {
		logger.info("Iniciando la aplicación...");
		//Levantar la fabrica de Spring
		SpringApplication.run(EstudiantesApplication.class, args);
		logger.info("Aplicación finalizada!");
	}

	@Override
	public void run(String... args) throws Exception {
		logger.info(nl+"Ejecutando el metodo run de Spring..."+nl);
		var salir = false;
		var consola = new Scanner(System.in);
		while(!salir){
			mostrarMenu();
			salir = ejecutarOpciones(consola);
			logger.info(nl);
		} // fin ciclo while

	}
	private void mostrarMenu(){
		//logger.info(nl);
		logger.info(""" 
				******* Sistema de Estudiantes *******
				1. Listar Estudiantes
				2. Buscar Estudiante
				3. Agregar Estudiante
				4. Modificar Estudiante
				5. Eliminar Estudiante
				6. Salir
				Elija una opcion:""");
	}

	private boolean ejecutarOpciones(Scanner consola) {
		//var opcion = Integer.parseInt(consola.nextLine());
		//se agrega una validación para asegurar de que la entrada del usuario sea un número antes de intentar convertirla
		String input = consola.nextLine();
		int opcion;

		try {
			opcion = Integer.parseInt(input);
		} catch (NumberFormatException e) {
			logger.info("Entrada no válida. Por favor, ingrese un número.");
			return false;
		}

		var salir = false;

		switch (opcion) {
			case 1 -> {// Listar estudiantes
				logger.info(nl+"Listado de estudiantes: "+nl);
				List<Estudiantes2022> estudiantes = estudianteServicio.listarEstudiantes();
				estudiantes.forEach((estudiante -> logger.info(estudiante.toString() + nl)));
			}
			case 2 -> {// Buscar estudiante por id
				logger.info("Digite el id estudiante a buscar: ");
				var idEstudiante = Integer.parseInt(consola.nextLine());
				Estudiantes2022 estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
				if (estudiante != null) {
					logger.info("Estudiante encontrado: " + estudiante +nl);
				} else {
					logger.info("Estudiante NO encontrado: " + idEstudiante +nl);
				}
			}
			case 3 -> {// Agregar estudiante
				logger.info("Agregar estudiante: "+nl);
				logger.info("Nombre: ");
				var nombre = consola.nextLine();
				logger.info("Apellido: ");
				var apellido = consola.nextLine();
				logger.info("Telefono: ");
				var telefono = consola.nextLine();
				logger.info("Email: ");
				var email = consola.nextLine();

				// Crear el objeto estudiante sin el id
				var estudiante = new Estudiantes2022();
				estudiante.setNombre(nombre);
				estudiante.setApellido(apellido);
				estudiante.setTelefono(telefono);
				estudiante.setEmail(email);

				// Llamar al servicio para agregar el estudiante
				estudianteServicio.guardarEstudiante(estudiante);
				logger.info("Estudiante agregado: " +estudiante +nl);
			}

			case 4 -> {
				// Modificar estudiante
				logger.info("Modificar estudiante: "+nl);
				logger.info("Ingrese el id estudiante: ");
				var idEstudiante = Integer.parseInt(consola.nextLine());

				// Buscamos el estudiante a modificar
				Estudiantes2022 estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
				if (estudiante != null) {
					logger.info("Nombre: ");
					var nombre = consola.nextLine();
					logger.info("Apellido: ");
					var apellido = consola.nextLine();
					logger.info("Telefono: ");
					var telefono = consola.nextLine();
					logger.info("Email: ");
					var email = consola.nextLine();

					// Actualizar los datos del estudiante
					estudiante.setNombre(nombre);
					estudiante.setApellido(apellido);
					estudiante.setTelefono(telefono);
					estudiante.setEmail(email);

					// Llamar al servicio para actualizar el estudiante
					estudianteServicio.guardarEstudiante(estudiante);
					logger.info("Estudiante modificado: "+estudiante+nl);
				} else {
					logger.info("Estudiante NO encontrado con el id: "+idEstudiante+nl);
				}
			}
			case 5 -> {// Eliminar estudiante
				logger.info("Eliminar estudiante: "+nl);
				logger.info("Digite el id estudiante: ");
				var idEstudiante = Integer.parseInt(consola.nextLine());

				// Buscamos el id estudiante a eliminar
				var estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
				if (estudiante != null) {
					estudianteServicio.eliminarEstudiante(estudiante);
					logger.info("Estudiante eliminado: " + estudiante + nl);
				} else {
					logger.info("Estudiante NO encontrado con id: " +idEstudiante + nl);
				}
			}
			case 6 -> {// Salir
				logger.info("Hasta pronto!"+nl+nl);
				salir = true;
			}
			default -> logger.info("Opción no válida"+ opcion+nl);


		}// Fin switch

		return salir;
	}// Fin metodo ejecutarOpciones
} // Fin clase EstudiantesApplication