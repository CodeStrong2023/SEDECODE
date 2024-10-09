// Función para obtener productos desde la API
async function fetchProducts() {
    try {
        const response = await fetch("http://127.0.0.1:5000/productos");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();  // Convertir la respuesta en JSON
        console.log(data);
        
        return data;
    } catch (error) {
        console.log("Error fetching products:", error);
        return []; // Devolver un array vacío en caso de error
    }
}

// Llamar la función y esperar los productos
const productos = await fetchProducts()

// Funcion para mostrar los productos en el HTML con Bootstrap
