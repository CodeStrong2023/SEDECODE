let cart = [];

let totalPrice = 0;
// Configura el SDK de MercadoPago

const mercadopago = new MercadoPago("TEST-15e4302f-53c5-4c60-bf9d-6f94ab4bf84e", {
    locale: "es-AR",
});


/*
// Agregar el botón de pagar al modal
const payButton = document.createElement('button');
payButton.classList.add('btn', 'btn-primary');
payButton.innerText = 'Pagar con MercadoPago';
payButton.addEventListener('click', payWithMercadoPago);
modalBody.appendChild(payButton);
*/
// Función para agregar productos al carrito
function addToCart(product) {
    // Obtenemos el carrito actual del localStorage (si existe)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificamos si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, incrementamos su cantidad
        cart[existingProductIndex].quanty = (cart[existingProductIndex].quanty || 1) + 1;
    } else {
        // Si no está en el carrito, lo agregamos con cantidad 1
        product.quanty = 1;
        cart.push(product);
    }

    // Guardamos el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // mostramos un mensaje de éxito
    console.log(`${product.name} agregado al carrito`);
}

// Asignar la función a la ventana global
window.addToCart = addToCart;  // Esto hace que la función sea accesible globalmente

// Función para aumentar la cantidad de un producto
function incrementItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quanty += 1; // Incrementamos la cantidad
    localStorage.setItem('cart', JSON.stringify(cart)); // Actualizamos el localStorage
    displayCart(); // Refrescamos el contenido del carrito
}

// Función para disminuir la cantidad de un producto o eliminarlo si es menor a 1
function decrementItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart[index].quanty > 1) {
        cart[index].quanty -= 1; // Decrementamos la cantidad
    } else {
        // Si la cantidad es 1 o menor, eliminamos el producto del carrito
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Actualizamos el localStorage
    displayCart(); // Refrescamos el contenido del carrito
}
// Función para mostrar el contenido del carrito
function displayCart() {
    resetCheckoutButton()
    // Obtenemos el carrito actual del localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Seleccionamos el contenedor en el modal donde se mostrarán los productos
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = ''; // Limpiamos el contenedor antes de agregar nuevos elementos

    // Verificamos si el carrito está vacío
    if (cart.length === 0) {
        modalBody.innerHTML = '<p>El carrito está vacío.</p>';
        return; // Salimos de la función si el carrito está vacío
    }

    // Reiniciamos el total del precio a 0
    let totalPrice = 0;

    // Creamos la tabla
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    // Agregamos encabezados a la tabla
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Quitar</th>
            <th>Cantidad</th>
            <th>Agregar</th>
        </tr>
    `;
    table.appendChild(thead);

    // Creamos el cuerpo de la tabla
    const tbody = document.createElement('tbody');

    // Iterar sobre los productos en el carrito y agregar filas a la tabla
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.url}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td><button class='btn btn-danger btn-sm remove-item' data-index="${index}">-</button></td>
            <td>${item.quanty}</td>
            <td><button class='btn btn-success btn-sm add-item' data-index="${index}">+</button></td>
        `;
        tbody.appendChild(row);
        // Calculamos el precio total de los productos
        totalPrice += item.price * item.quanty;
    });

    table.appendChild(tbody);
    modalBody.appendChild(table);

    // Crear un párrafo para mostrar el total del precio
    const totalPriceElement = document.createElement('p');
    totalPriceElement.textContent = `Total: $${totalPrice}`;

    // Agregar el total al modal o a donde necesites en el HTML
    modalBody.appendChild(totalPriceElement);


    const checkoutButton = document.getElementById("button-checkout")

    checkoutButton.addEventListener("click", function () {
        console.log("ëntre");

        const orderData = {
            quantity: 1,
            description: "E-commerce:",
            price: totalPrice
        };

        fetch("http://127.0.0.1:5000/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (preference) {
                console.log(preference)
                createCheckOutButton(preference.id);
            })
            .catch(function () {
                alert("error inesperado");
            });
    });


    // Función para restablecer el estado del botón "Pagar Ahora"
    function resetCheckoutButton() {
        const checkoutButton = document.getElementById("button-checkout");
        checkoutButton.innerText = "Pagar con MercadoPago"; // Texto inicial
        // Remover cualquier evento anterior para evitar duplicados
        const newCheckoutButton = checkoutButton.cloneNode(true);
        checkoutButton.parentNode.replaceChild(newCheckoutButton, checkoutButton);
    }

    // Evento para mostrar los productos en el carrito cuando se abre el modal
    const cartModal = document.getElementById('Modal');
    cartModal.addEventListener('shown.bs.modal', function () {
        resetCheckoutButton();  // Reseteamos el botón al abrir el carrito
        displayCart();  // Mostramos el carrito
    });


    function createCheckOutButton(preferenceId) {
        const bricksBuilder = mercadopago.bricks();
    
        const renderComponent = async (bricksBuilder) => {
            const checkoutButton = document.getElementById("button-checkout");
            checkoutButton.innerText = "Pagar Ahora";  // Cambiamos el texto solo al hacer clic
            await bricksBuilder.create(
                'wallet',
                'button-checkout', 
                {
                    initialization: {
                        preferenceId: preferenceId
                    },
                    callbacks: {
                        onError: (error) => console.error(error),
                        onReady: () => { }
                    }
                }
            );
        };
    
        window.checkoutButton = renderComponent(bricksBuilder);
    }



    // Agregamos eventos a los botones "+" y "-"
    document.querySelectorAll('.add-item').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            resetCheckoutButton()
            incrementItem(index);
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            resetCheckoutButton() 
            decrementItem(index);
        });
    });
}

// Evento para mostrar los productos en el carrito cuando se abre el modal
const cartModal = document.getElementById('Modal');
cartModal.addEventListener('shown.bs.modal', displayCart);
