let cart = []

// Función para agregar productos al carrito
function addToCart(product){
    // Obtenemos el carrito actual del localStorage (si existe)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Agregamos el nuevo producto al carrito
    cart.push(product);

    // Guardamos el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // mostramos un mensaje de éxito
    console.log(`${product.name} agregado al carrito`);
}

// Asignar la función a la ventana global
window.addToCart = addToCart;  // Esto hace que la función sea accesible globalmente