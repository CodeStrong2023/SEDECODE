package utn.tienda_libros;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;
import utn.tienda_libros.vista.LibroFrom;

import java.awt.EventQueue;

@SpringBootApplication
public class TiendaLibrosApplication {

	public static void main(String[] args) {
		//SpringApplication.run(TiendaLibrosApplication.class, args);
		ConfigurableApplicationContext contextoSpring =
				new SpringApplicationBuilder(TiendaLibrosApplication.class)
						.headless(false)
						.web(WebApplicationType.NONE) // no es una aplicacion web
						.run(args);

		//Ejecutamos el código para cargar el formulario
		// Metodo lambda
		EventQueue.invokeLater(() -> {
			//Obtenemos el objeto from a traves del spring
			LibroFrom libroFrom = contextoSpring.getBean(LibroFrom.class);
			libroFrom.setVisible(true);
		});

	} // cierra public static void

}
