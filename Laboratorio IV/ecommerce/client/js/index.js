const cart = [];

document.addEventListener("DOMContentLoaded", async () => {
    const shopContent = document.getElementById("shopContent");

    // Función para obtener productos desde la API
    async function fetchApiGetAllProduct() {
        try {
            const response = await fetch("http://localhost:8080/api/productos");
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
    const productos = await fetchApiGetAllProduct();

    // Verificar que productos no esté vacío
    if (productos.length > 0) {
        productos.forEach((product) => {
            const content = document.createElement("div");
            content.classList.add("col-md-4");
            content.innerHTML = `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${product.product_url}" class="img-fluid rounded-start" alt="${product.product_name}" />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${product.product_name}</h5>
                                <p class="card-text">
                                    ${product.product_price}$
                                </p>
                                <p class="card-text">
                                    <small class="text-muted">${new Date(product.updated_at).toLocaleString()}</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            shopContent.append(content);

            const buyButton = document.createElement("button");
            buyButton.innerText = "Comprar";
            buyButton.classList.add("btn", "btn-primary");
            buyButton.style.marginTop = "10px";
            content.querySelector('.card-body').append(buyButton);

            // Evento de compra
            buyButton.addEventListener("click", () => {
                addToCart(product);
            });
        });
    } else {
        console.log("No se encontraron productos.");
    }

    // Función para agregar productos al carrito
    function addToCart(product) {
        // Verificar si el producto ya está en el carrito
        const productInCart = cart.find((item) => item.id === product.sk_product);
        console.log(productInCart);
        if (productInCart) {
            // Si ya está en el carrito, aumentar la cantidad
            productInCart.quanty++;
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `El ${product.product_name} se incremento a ${productInCart.quanty}!`,
                showConfirmButton: false,
                timer: 1200
              });
    
        } else {
            // Si no está, agregar al carrito con cantidad inicial de 1
            cart.push({
                id: product.sk_product,
                ProductName: product.product_name,
                price: product.product_price,
                quanty: 1, // Inicia en 1 al agregar por primera vez
                img: product.product_url
            });

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `El ${product.product_name} fue agregado al carrito!`,
                showConfirmButton: false,
                timer: 1200
              });
        }

        console.log("cart", cart); // Mostrar el carrito actualizado para depuración
    }
});

