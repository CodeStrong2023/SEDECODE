# Descripción de las Clases y Métodos en el Archivo JS

## Clase `Personaje`
La clase `Personaje` representa a cada personaje en el juego. Permite crear nuevos personajes mediante Programación Orientada a Objetos (POO).

### Constructor
El constructor recibe un objeto con las propiedades `id` y `nombre` para inicializar un personaje.

```javascript
constructor({ id, nombre }) {
    this.id = id;
    this.nombre = nombre;
}
```
### Método `generarBoton()`

Este método genera un botón HTML para representar el personaje. El botón utiliza el `id` del personaje y muestra su `nombre`.

```javascript
generarBoton() {
    const button = document.createElement('button');
    button.classList.add('personaje');
    button.id = this.id;
    button.textContent = this.nombre;
    return button;
}
```

## Clase `AvatarGame`

Esta clase gestiona el juego, incluyendo la creación de personajes, el manejo de ataques y la interacción del jugador.

El constructor inicializa el juego y crea personajes a partir de un array de datos. Además, define variables de estado del jugador y enemigo, como vidas y ataques.

```javascript
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
```
### Método `crearBotonesPersonajes()`

Genera los botones de los personajes en el DOM usando el método `generarBoton()` de la clase `Personaje`.

``` javascript
// Función para generar los botones de personajes dinámicamente
    crearBotonesPersonajes() {
        contenedorPersonajes.innerHTML = ''; // Limpiamos el contenedor
        this.personajes.forEach(personaje => {
            const botonPersonaje = personaje.generarBoton();
            botonPersonaje.addEventListener('click', () => this.seleccionarPersonaje(botonPersonaje));
            contenedorPersonajes.appendChild(botonPersonaje);
        });
    }
```
### Método `botonCreacionDePersonaje()`

Este método permite la creación de un nuevo personaje por parte del usuario. Toma el nombre del personaje ingresado, verifica si ya existe, y si no, lo crea y lo agrega a la lista de personajes.
```javascript
botonCreacionDePersonaje(e) {
        e.preventDefault(); // Evita la recarga de la página
        const nombrePersonaje = document.getElementById('nombre-personaje-creado').value.trim(); // Eliminar espacios en blanco
    
        // Verificar si el nombre ya existe
        const existeNombre = this.personajes.some(personaje => personaje.nombre.toLowerCase() === nombrePersonaje.toLowerCase());
    
        if (existeNombre) {
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
    }
```

## Métodos Relacionados con la Creación de Personajes
- `botonCreacionDePersonaje(e)`: Método principal que permite crear nuevos personajes.
- `mostrarCreacionDeFormDePersonaje()`: Muestra el formulario para crear un personaje nuevo.
