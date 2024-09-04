let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3 //Sabemos en el estado en comienzan estas variables
let vidasEnemigo = 3

function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'
    let botonPersonajeJugador = document.getElementById('boton-personaje');
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);
    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = "none"
	let mensajes = document.getElementById('mensajes')
    mensajes.style.display = "none"

    document.getElementById("reglas-del-juego").style.display = "none";

    document.getElementById('boton-reglas').addEventListener('click', mostrarReglas);
   
    document.getElementById('boton-jugar').style.display = 'none';
    document.getElementById('seleccionar-personaje').style.display = 'block';

    let botonPunio = document.getElementById('boton-punio') //Ahora creamos un escuchador de eventos
    botonPunio.addEventListener('click', ataquePunio)
    let botonPatada = document.getElementById('boton-patada')
    botonPatada.addEventListener('click', ataquePatada)
    let botonBarrida = document.getElementById('boton-barrida')
    botonBarrida.addEventListener('click', ataqueBarrida)
    //creamos una nueva variable
    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function mostrarReglas() {
    document.getElementById("reglas-del-juego").style.display = "block";
    document.getElementById('boton-jugar').style.display = 'block';
    document.getElementById('boton-reglas').style.display = 'none';
    document.getElementById('seleccionar-personaje').style.display = 'none';
    document.getElementById('boton-jugar').addEventListener('click', seleccionarPersonajeJugador);
	window.scrollTo(0, document.body.scrollHeight);
}

function seleccionarPersonajeJugador() {
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'block'; // Mostramos la sección de ataque
    document.getElementById('boton-reglas').style.display = 'none';
    let sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje');
    sectionSeleccionarPersonaje.style.display = 'none'; // Ocultamos la selección de personaje
   
    let spanPersonajeJugador = document.getElementById('personaje-jugador');
    let personajeSeleccionado = document.querySelector('.personaje.selected');

    document.getElementById("reglas-del-juego").style.display = "none";
    document.getElementById('boton-reglas').style.display = 'none';

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
        reiniciarJuego();
        return;
    }

    seleccionarPersonajeEnemigo();
}
document.querySelectorAll('.personaje').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.personaje').forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
    });
});



function seleccinarPersonajeEnemigo() { //Esta función va dentro de seleccionarPersonajeJugador() al final
    let personajeAleatorio = aleatorio(1, 4) //A continuación creamos las variables para cada personaje
    let spanPersonajeEnemigo = document.getElementById('personaje-enemigo')

    //comenzamos con la lógica
    if (personajeAleatorio == 1) {
        spanPersonajeEnemigo.innerHTML = 'Zuko'
    } else if (personajeAleatorio == 2) {
        spanPersonajeEnemigo.innerHTML = 'Katara'
    } else if (personajeAleatorio == 3) {
        spanPersonajeEnemigo.innerHTML = 'Aang'
    } else {
        spanPersonajeEnemigo.innerHTML = 'Toph'
    }
}

function ataquePunio() { //Modificamos la variable global ataqueJugador
    ataqueJugador = 'Punio'
    ataqueAleatorioEnemigo()
}

function ataquePatada() { //Modificamos la variable global ataqueJugador
    ataqueJugador = 'Patada'
    ataqueAleatorioEnemigo()
}

function ataqueBarrida() { //Modificamos la variable global ataqueJugador
    ataqueJugador = 'Barrida'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {//Ahora ocupando la variable global nueva le decimos el ataque y necesitamos la función aleatorio
    let ataqueAleatorio = aleatorio(1, 3)

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'Punio'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'Patada'
    } else {
        ataqueEnemigo = 'Barrida'
    }
    combate()
}

function combate() {
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')

    //COMBATE
    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if (ataqueJugador == 'Punio' && ataqueEnemigo == 'Barrida') {
		bajarVida("E")
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'Patada' && ataqueEnemigo == 'Punio') {
		bajarVida("E")
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'Barrida' && ataqueEnemigo == 'Patada') {
		bajarVida("E")
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo		
    } else {
		bajarVida("Y")
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador		
    }
    //Revisar vidas
    revisarVidas()
}

function revisarVidas(){
    if(vidasEnemigo == 0){
        //Ganamos
        crearMensajeFinal("FELICITACIONES!!! HAS GANADO 🤩🥳🎉")
    } else if(vidasJugador == 0){
        //Perdimos
        crearMensajeFinal("QUE PENA, HAS PERDIDO 😢😭😭😭")
    }
}

function crearMensajeFinal(resultado) {
    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = "block"

    let sectionMensaje = document.getElementById('mensajes')
    let parrafo = document.createElement('p')

    parrafo.innerHTML = resultado

    sectionMensaje.appendChild(parrafo)
    let botonPunio = document.getElementById('boton-punio') //Ahora creamos un escuchador de eventos
    botonPunio.disabled = true
    let botonPatada = document.getElementById('boton-patada')
    botonPatada.disabled = true
    let botonBarrida = document.getElementById('boton-barrida')
    botonBarrida.disabled = true
}

function crearMensaje(resultado) {
    let sectionMensaje = document.getElementById('mensajes')
    let parrafo = document.createElement('p')

    parrafo.innerHTML = 'Tu personaje atacó con ' + ataqueJugador + ', el personaje del enemigo atacó con ' + ataqueEnemigo + ' ' + resultado

    sectionMensaje.appendChild(parrafo)
}



function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let vidaActual = 100;
let vidaActualEnemigo = 100;

function bajarVida(p) {
	if (p == "Y") {
		if (vidaActual > 0) {
			vidaActual -= 33;
			if (vidaActual < 0) vidaActual = 0;
			document.getElementById("barraVida").style.width = vidaActual + "%";
		}		
	} else {
		if (vidaActualEnemigo > 0) {
			vidaActualEnemigo -= 33;
			if (vidaActualEnemigo < 0) vidaActualEnemigo = 0;
			document.getElementById("barraVidaEnemigo").style.width = vidaActualEnemigo + "%";
		}
	}
}

function detallePelea(){
	let mensajes = document.getElementById('mensajes')
	let botonDetallePelea = document.getElementById('boton-detalle-pelea')
	
	if (mensajes.style.display == "block") {
		mensajes.style.display = "none"
		botonDetallePelea.innerText = 'Ver Detalle Pelea';
		
	} else{
		mensajes.style.display = "block"
		botonDetallePelea.innerText = 'Ocultar Detalle Pelea';
	}    
	window.scrollTo(0, document.body.scrollHeight);
}


window.addEventListener('load', iniciarJuego)