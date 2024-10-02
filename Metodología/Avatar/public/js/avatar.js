// variables globales
const mensajesAcumulados = []; // Para almacenar todos los mensajes de la pelea
const sectionReiniciar = document.getElementById('reiniciar');
const botonPersonajeJugador = document.getElementById('boton-personaje');

const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const mensajes = document.getElementById('mensajes');
const botonDetallePelea = document.getElementById('boton-detalle-pelea');
const visibilityDeFormularioPersonaje = document.getElementById('form-creacion-de-personaje');
const contenedorPersonajes = document.getElementById('contenedor-personajes');



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
        contenedorPersonajes.innerHTML = ''; // Limpiamos el contenedor
        this.personajes.forEach(personaje => {
            const botonPersonaje = personaje.generarBoton();
            botonPersonaje.addEventListener('click', () => this.seleccionarPersonaje(botonPersonaje));
            contenedorPersonajes.appendChild(botonPersonaje);
        });
    }

    iniciarJuego() {
        
        sectionSeleccionarAtaque.style.display = 'none';
        botonPersonajeJugador.addEventListener('click', () => this.seleccionarPersonajeJugador());
        sectionReiniciar.style.display = "none";
        //mensajes.style.display = "none"; // Inicialmente oculto

        document.getElementById("reglas-del-juego").style.display = "none";
        document.getElementById('boton-reglas').addEventListener('click', () => this.mostrarReglas());
        document.getElementById('boton-jugar').style.display = 'none';
        document.getElementById('seleccionar-personaje').style.display = 'block';
        document.getElementById('boton-punio').addEventListener('click', () => this.ataque('Punio'));
        document.getElementById('boton-patada').addEventListener('click', () => this.ataque('Patada'));
        document.getElementById('boton-barrida').addEventListener('click', () => this.ataque('Barrida'));
        document.getElementById('boton-reiniciar').addEventListener('click', () => this.reiniciarJuego());

        // Agrega el evento para el botón de detalle de pelea
        botonDetallePelea.addEventListener('click', () => this.detallePelea())

        //crear un nuevo personaje 
        const botonCreacionDePersonaje = document.getElementById('boton-crear-personaje');
        botonCreacionDePersonaje.addEventListener('click', () => this.detallePelea())

        //crear un nuevo personaje 
        const botonMostrarOcultarFormulario = document.getElementById('boton-crear-personaje');
        botonMostrarOcultarFormulario.addEventListener('click', () => this.mostrarCreacionDeFormDePersonaje())
        //ocultar formulario de creacion de personaje
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
        
        const botonPersonaje = nuevoPersonaje.generarBoton();
        botonPersonaje.addEventListener('click', () => this.seleccionarPersonaje(botonPersonaje));
        contenedorPersonajes.appendChild(botonPersonaje);
    
        //console.log('Nombre del personaje agregado:', nombrePersonaje);
        //console.log('Personajes actuales:', this.personajes);
    }

   detallePelea() {
           
        // Verifica si el estilo de display es 'none' o no está definido (inicialmente vacío)
        if (mensajes.style.display === "none" || mensajes.style.display === "") {
            // Mostrar todos los mensajes acumulados
            mensajes.style.display = "block";
            botonDetallePelea.innerText = 'Ocultar Detalle Pelea';
    
            // Mostrar todos los mensajes acumulados
            mensajes.innerHTML = mensajesAcumulados.map(mensaje => `<p>${mensaje}</p>`).join('');
    
            // Desplazar hacia el final del contenedor de mensajes
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            // Oculta los mensajes
            mensajes.style.display = "none";
            botonDetallePelea.innerText = 'Ver Detalle Pelea';
        }
    }
    
    

    mostrarCreacionDeFormDePersonaje() {
        visibilityDeFormularioPersonaje.style.display = 'flex'
    }

    mostrarReglas() {
        document.getElementById("reglas-del-juego").style.display = "block";
        document.getElementById('boton-jugar').style.display = 'block';
        document.getElementById('boton-reglas').style.display = 'none';
        visibilityDeFormularioPersonaje.style.display = 'none'
        document.getElementById('seleccionar-personaje').style.display = 'none';
        document.getElementById('boton-jugar').addEventListener('click', () => this.reiniciarJuego()); 
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
        
        sectionSeleccionarAtaque.style.display = 'block'; // Mostramos la sección de ataque
        document.getElementById('boton-reglas').style.display = 'none';
        const sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje');
        sectionSeleccionarPersonaje.style.display = 'none'; // Ocultamos la selección de personaje
        const spanPersonajeJugador = document.getElementById('personaje-jugador');
        const personajeSeleccionado = document.querySelector('.personaje.selected');
        document.getElementById("reglas-del-juego").style.display = "none";
        document.getElementById('boton-reglas').style.display = 'none';
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

    // Con este codigo los mensajes se acumulan!
    //crearMensaje(resultado) {
    //    let parrafo = document.createElement('p');
    //    parrafo.innerHTML = `Tu personaje atacó con ${this.ataqueJugador}, el personaje del enemigo atacó con ${this.ataqueEnemigo}. ${resultado}`;
    //    const mensajes = document.getElementById('mensajes'); // Asegúrate de que esto esté aquí
    //    mensajes.appendChild(parrafo);
    //}



    crearMensaje(resultado) {
        const mensaje = `Tu personaje atacó con ${this.ataqueJugador}, el personaje del enemigo atacó con ${this.ataqueEnemigo}. ${resultado}`;
        
        // Almacenar el mensaje en el array de mensajes acumulados
        mensajesAcumulados.push(mensaje);
        
        // Mostrar solo el último mensaje mientras se juega
        
        mensajes.innerHTML = `<p>${mensaje}</p>`;
    }



    crearMensajeFinal(mensajeFinal) {
        
        
        // Crear el elemento del mensaje final y agregarlo antes del resto de mensajes
        const parrafoFinal = document.createElement('p');
        //mensajes.innerHTML += `<p>${mensaje}</p>`;
        // Resaltar el mensaje final añadiendo la clase 'resaltado'
        parrafoFinal.innerHTML += `<p class="resaltado">${mensajeFinal}</p>`;
        
        // Insertar el mensaje final al inicio del contenedor de mensajes
        mensajes.prepend(parrafoFinal);
    
        // Mostrar el botón de reiniciar y deshabilitar los botones de ataque
        document.getElementById('reiniciar').style.display = 'block'; // Mostrar botón de reiniciar
        document.querySelectorAll('button').forEach(boton => boton.disabled = true); // Deshabilitar todos los botones
        document.getElementById('boton-detalle-pelea').disabled = false; // Dejar habilitado el botón de detalle de pelea
        document.getElementById('boton-reiniciar').disabled = false; // Habilitar el botón de reiniciar
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
