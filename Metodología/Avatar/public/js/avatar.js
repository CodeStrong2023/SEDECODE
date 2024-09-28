// Clase Personaje que recibirá un objeto para construir el personaje
class Personaje {
    constructor({ id, nombre }) {
        this.id = id;
        this.nombre = nombre;
    }

    // Método para generar el botón del personaje
    generarBoton() {
        const button = document.createElement('button');
        button.classList.add('personaje');
        button.id = this.id; // Asignamos el ID dinámico
        button.textContent = this.nombre; // Texto del botón será el nombre
        return button;
    }
}

// Clase AvatarGame que maneja los personajes y selección
class AvatarGame {
    constructor(personajesData) {
        this.personajes = personajesData.map(personajeIndividual => new Personaje(personajeIndividual)); // Creamos personajes dinámicos
        this.crearBotonesPersonajes();
        this.ataqueJugador = null;
        this.ataqueEnemigo = null;
        this.vidasJugador = 3;
        this.vidasEnemigo = 3;
        this.vidaActual = 100; // Vida actual del jugador
        this.vidaActualEnemigo = 100; // Vida actual del enemigo
        this.iniciarJuego();
    }

    // Función para generar los botones de personajes dinámicamente
    crearBotonesPersonajes() {
        const contenedorPersonajes = document.getElementById('contenedor-personajes');
        contenedorPersonajes.innerHTML = ''; // Limpiamos el contenedor
        this.personajes.forEach(personaje => {
            const botonPersonaje = personaje.generarBoton();
            botonPersonaje.addEventListener('click', () => this.seleccionarPersonaje(botonPersonaje));
            contenedorPersonajes.appendChild(botonPersonaje);
        });
    }

    iniciarJuego() {
        const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
        sectionSeleccionarAtaque.style.display = 'none';
        const botonPersonajeJugador = document.getElementById('boton-personaje');
        botonPersonajeJugador.addEventListener('click', () => this.seleccionarPersonajeJugador());
        const sectionReiniciar = document.getElementById('reiniciar');
        sectionReiniciar.style.display = "none";
        const mensajes = document.getElementById('mensajes');
        mensajes.style.display = "none"; // Inicialmente oculto

        document.getElementById("reglas-del-juego").style.display = "none";

        document.getElementById('boton-reglas').addEventListener('click', () => this.mostrarReglas());
        document.getElementById('boton-jugar').style.display = 'none';
        document.getElementById('seleccionar-personaje').style.display = 'block';

        document.getElementById('boton-punio').addEventListener('click', () => this.ataque('Punio'));
        document.getElementById('boton-patada').addEventListener('click', () => this.ataque('Patada'));
        document.getElementById('boton-barrida').addEventListener('click', () => this.ataque('Barrida'));
        document.getElementById('boton-reiniciar').addEventListener('click', () => this.reiniciarJuego());

        // Agrega el evento para el botón de detalle de pelea
        const botonDetallePelea = document.getElementById('boton-detalle-pelea');
        botonDetallePelea.addEventListener('click', () => this.detallePelea())

        //crear un nuevo personaje 
        const botonCreacionDePersonaje = document.getElementById('boton-crear-personaje');
        botonCreacionDePersonaje.addEventListener('click', () => this.detallePelea())


        //crear un nuevo personaje 
        const botonMostrarOcultarFormulario = document.getElementById('boton-crear-personaje');
        botonMostrarOcultarFormulario.addEventListener('click', () => this.mostrarCreacionDeFormDePersonaje())
        //ocultar formulario de creacion de personaje
        const visibilityDeFormularioPersonaje = document.getElementById('form-creacion-de-personaje');
        visibilityDeFormularioPersonaje.style.display = 'none'

        const botonSubmitCreacionDePersonaje = document.getElementById('boton-crea-un-personaje');
        botonSubmitCreacionDePersonaje.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el formulario se envíe
            this.botonCreacionDePersonaje(e);
        });
        
    }
    botonCreacionDePersonaje(e) {
        e.preventDefault(); // Evita la recarga de la página
        const nombrePersonaje = document.getElementById('nombre-personaje-creado').value.trim(); // Eliminar espacios en blanco
    
        // Verificar si el nombre ya existe
        const existeNombre = this.personajes.some(personaje => personaje.nombre.toLowerCase() === nombrePersonaje.toLowerCase());
    
        if (existeNombre) {
           // console.log('El nombre del personaje ya existe. Elige otro nombre.');
            alert('El nombre del personaje ya existe. Elige otro nombre.'); // Mensaje de alerta al usuario
            return; // Salir de la función si el nombre ya existe
        }
    
        // Generar un ID único para el nuevo personaje
        const idPersonaje = `personaje${this.personajes.length + 1}`;
    
        // Crear una nueva instancia de Personaje
        const nuevoPersonaje = new Personaje({ id: idPersonaje, nombre: nombrePersonaje });
    
        // Agregar el nuevo personaje al array de personajes
        this.personajes.push(nuevoPersonaje);
    
        // Crear un botón para el nuevo personaje y agregarlo al contenedor
        const contenedorPersonajes = document.getElementById('contenedor-personajes');
        const botonPersonaje = nuevoPersonaje.generarBoton();
        botonPersonaje.addEventListener('click', () => this.seleccionarPersonaje(botonPersonaje));
        contenedorPersonajes.appendChild(botonPersonaje);
    
        //console.log('Nombre del personaje agregado:', nombrePersonaje);
        //console.log('Personajes actuales:', this.personajes);
    }

    // Nueva función para mostrar/ocultar el detalle de la pelea
    detallePelea() {
        //console.log("Botón de detalle de pelea presionado"); // Verifica si se llama
        const mensajes = document.getElementById('mensajes');
        const botonDetallePelea = document.getElementById('boton-detalle-pelea');

        if (mensajes.style.display === "block") {
            mensajes.style.display = "none"; // Oculta los mensajes
            botonDetallePelea.innerText = 'Ver Detalle Pelea';
        } else {
            mensajes.style.display = "block";
           // console.log("ëntra?");
            botonDetallePelea.innerText = 'Ocultar Detalle Pelea';

        }
        window.scrollTo(0, document.body.scrollHeight); // Desplaza la vista hacia abajo
    }

    mostrarCreacionDeFormDePersonaje() {
        const visibilityDeFormularioPersonaje = document.getElementById('form-creacion-de-personaje');
        visibilityDeFormularioPersonaje.style.display = 'flex'
    }

    mostrarReglas() {
        document.getElementById("reglas-del-juego").style.display = "block";
        document.getElementById('boton-jugar').style.display = 'block';
        document.getElementById('boton-reglas').style.display = 'none';
        const visibilityDeFormularioPersonaje = document.getElementById('form-creacion-de-personaje');
        visibilityDeFormularioPersonaje.style.display = 'none'
        document.getElementById('seleccionar-personaje').style.display = 'none';
        document.getElementById('boton-jugar').addEventListener('click', () => this.seleccionarPersonajeJugador());
        window.scrollTo(0, document.body.scrollHeight);
    }

    seleccionarPersonaje(boton) {
        // Limpiar la selección anterior
        const botones = document.querySelectorAll('.personaje');
        botones.forEach(b => b.classList.remove('selected')); // Remover la clase 'selected' de todos los botones

        // Agregar la clase 'selected' al botón actual
        boton.classList.add('selected');
    }

    seleccionarPersonajeJugador() {
        const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
        sectionSeleccionarAtaque.style.display = 'block'; // Mostramos la sección de ataque
        document.getElementById('boton-reglas').style.display = 'none';
        const sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje');
        sectionSeleccionarPersonaje.style.display = 'none'; // Ocultamos la selección de personaje
        const spanPersonajeJugador = document.getElementById('personaje-jugador');
        const personajeSeleccionado = document.querySelector('.personaje.selected');
        document.getElementById("reglas-del-juego").style.display = "none";
        document.getElementById('boton-reglas').style.display = 'none';
        const visibilityDeFormularioPersonaje = document.getElementById('form-creacion-de-personaje');
        visibilityDeFormularioPersonaje.style.display = 'none'

        if (personajeSeleccionado) {
            spanPersonajeJugador.innerHTML = personajeSeleccionado.textContent; // Asigna el texto del botón seleccionado
        } else {
            // Mostrar un mensaje temporal en la pantalla si no se ha seleccionado un personaje
            let mensajeError = document.createElement("p");
            mensajeError.innerHTML = 'Selecciona un personaje';
            mensajeError.style.color = "red";
            sectionSeleccionarPersonaje.appendChild(mensajeError);

            // Eliminar el mensaje de error después de 2 segundos
            setTimeout(() => {
                sectionSeleccionarPersonaje.removeChild(mensajeError);
            }, 2000);
            return;
        }
        this.seleccionarPersonajeEnemigo();
    }

    seleccionarPersonajeEnemigo() { //Esta función va dentro de seleccionarPersonajeJugador() al final
        let personajeAleatorio = this.aleatorio(1, 4); // A continuación creamos las variables para cada personaje
        let spanPersonajeEnemigo = document.getElementById('personaje-enemigo');

        // Comenzamos con la lógica
        if (personajeAleatorio === 1) {
            spanPersonajeEnemigo.innerHTML = 'Zuko';
        } else if (personajeAleatorio === 2) {
            spanPersonajeEnemigo.innerHTML = 'Katara';
        } else if (personajeAleatorio === 3) {
            spanPersonajeEnemigo.innerHTML = 'Aang';
        } else {
            spanPersonajeEnemigo.innerHTML = 'Toph';
        }
    }

    ataque(ataque) { // Modificamos la variable global ataqueJugador
        this.ataqueJugador = ataque;
        this.ataqueAleatorioEnemigo();
    }

    
    ataqueAleatorioEnemigo() { // Ahora ocupando la variable global nueva le decimos el ataque y necesitamos la función aleatorio
        const ataqueAleatorio = this.aleatorio(1, 3);
        this.ataqueEnemigo = ['Punio', 'Patada', 'Barrida'][ataqueAleatorio - 1];
        this.combate();
    }

    combate() {
        let spanVidasJugador = document.getElementById('vidas-jugador');
        let spanVidasEnemigo = document.getElementById('vidas-enemigo');

        // COMBATE
        if (this.ataqueEnemigo === this.ataqueJugador) {
            this.crearMensaje("EMPATE");
        } else if (this.ataqueJugador === 'Punio' && this.ataqueEnemigo === 'Barrida') {
            this.bajarVida("E");
            this.crearMensaje("GANASTE");
            this.vidasEnemigo--;
            spanVidasEnemigo.innerHTML = this.vidasEnemigo;
        } else if (this.ataqueJugador === 'Patada' && this.ataqueEnemigo === 'Punio') {
            this.bajarVida("E");
            this.crearMensaje("GANASTE");
            this.vidasEnemigo--;
            spanVidasEnemigo.innerHTML = this.vidasEnemigo;
        } else if (this.ataqueJugador === 'Barrida' && this.ataqueEnemigo === 'Patada') {
            this.bajarVida("E");
            this.crearMensaje("GANASTE");
            this.vidasEnemigo--;
            spanVidasEnemigo.innerHTML = this.vidasEnemigo;
        } else {
            this.bajarVida("Y");
            this.crearMensaje("PERDISTE");
            this.vidasJugador--;
            spanVidasJugador.innerHTML = this.vidasJugador;
        }

        // Revisar vidas
        this.revisarVidas();
    }

    revisarVidas() {
        if (this.vidasEnemigo === 0) {
            this.crearMensajeFinal("¡Felicidades, ganaste!");
        } else if (this.vidasJugador === 0) {
            this.crearMensajeFinal("¡Perdiste!");
        }
    }

    crearMensaje(resultado) {
        let parrafo = document.createElement('p');
        parrafo.innerHTML = `Tu personaje atacó con ${this.ataqueJugador}, el personaje del enemigo atacó con ${this.ataqueEnemigo}. ${resultado}`;
        const mensajes = document.getElementById('mensajes'); // Asegúrate de que esto esté aquí
        mensajes.appendChild(parrafo);
    }

    crearMensajeFinal(mensaje) {
        const mensajes = document.getElementById('mensajes');
        mensajes.innerHTML += `<p>${mensaje}</p>`;
        document.getElementById('reiniciar').style.display = 'block'; // Mostrar botón de reiniciar
        document.querySelectorAll('button').forEach(boton => boton.disabled = true); // Deshabilitar botones de ataque
        document.getElementById('boton-detalle-pelea').disabled = false; // Para habilitar el botón boton-reiniciar
        document.getElementById('boton-reiniciar').disabled = false;
    }

    reiniciarJuego() {
        location.reload(); // Reinicia el juego
    }


    bajarVida(p) {
        if (p === "Y") {
            if (this.vidaActual > 0) {
                this.vidaActual -= 33;
                if (this.vidaActual < 0) this.vidaActual = 0;
                document.getElementById("barraVida").style.width = this.vidaActual + "%"; // Actualiza la barra de vida del jugador
            }
        } else {
            if (this.vidaActualEnemigo > 0) {
                this.vidaActualEnemigo -= 33;
                if (this.vidaActualEnemigo < 0) this.vidaActualEnemigo = 0;
                document.getElementById("barraVidaEnemigo").style.width = this.vidaActualEnemigo + "%"; // Actualiza la barra de vida del enemigo
            }
        }
    }

    aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min; // Función para generar un número aleatorio entre min y max
    }
}

// Datos de personajes 
const personajesData = [
    { id: 'personaje1', nombre: 'Zuko' },
    { id: 'personaje2', nombre: 'Katara' },
    { id: 'personaje3', nombre: 'Aang' },
    { id: 'personaje4', nombre: 'Toph' },
];

// Inicializar el juego
const juego = new AvatarGame(personajesData);
