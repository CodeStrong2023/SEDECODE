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


// Funcion para mostrar los productos en el HTML con Bootstrap
function displayProducts(products) {
    const shopContent = document.getElementById("shopContent")

    // Limpiamos el contenedor antes de agregar nuevos productos
    shopContent.innerHTML = '';

    // Creamos una variable para almacenar el HTML de los productos
    let htmlContent = '';

    // Iteramos sobre los productos para generar el HTML
    products.forEach(product => {
        htmlContent += `
            <div class="col-md-3 mt-5">
      <div class="card" style="width: 18rem;">
        <img src="${product.product_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.product_name}</h5>
          <p class="card-text">${product.product_price}$</p>
          <button class="btn btn-primary add-to-cart" 
                                data-name="${product.product_name}" 
                                data-price="${product.product_price}" 
                                data-url="${product.product_url}">
                            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
        `;
    });

    // Insertamos todo el HTML de una sola vez
    shopContent.innerHTML = htmlContent;

    // Agregar evento para botones "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    //console.log(addToCartButtons);  // Verifica si hay elementos seleccionados
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const productPrice = button.getAttribute('data-price');
            const productUrl = button.getAttribute('data-url');
    
            const product = {
                name: productName,
                price: productPrice,
                url: productUrl
            };
    
            // Llamar a la función para agregar al carrito
            addToCart(product);
        });
    });
}


// Función principal para obtener los productos y mostrarlos
async function main() {
    const products = await fetchProducts();
    displayProducts(products);
}

// Llamar a la función principal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', main);