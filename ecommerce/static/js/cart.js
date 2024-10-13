const Modal = document.getElementById('Modal')
const modalBody = document.querySelector('.modal-body')
const modalFooter = document.querySelector('.modal-footer')


function displayCart() {
    modalBody.innerHTML = ""; // Limpiar el contenido previo
    modalFooter.innerHTML = ""; // Limpiar el pie del modal previo
    let totalPrice = 0; // Inicializar el total del precio


    if (cart.length === 0) {
        modalBody.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    // Crear la tabla
    const table = document.createElement("table");
    table.classList.add("table", "table-striped");
    table.innerHTML = `
    <thead>
        <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Quitar</th>
            <th>Cantidad</th>
            <th>Agregar</th>
        </tr>
    </thead>
    <tbody></tbody>
`;

    const tableBody = table.querySelector("tbody");

    cart.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.img}" alt="${item.ProductName}" style="width: 50px; height: 50px;"></td>
            <td>${item.ProductName}</td>
            <td>$${item.price}</td>
            <td><button class='btn btn-danger btn-sm remove-item' data-index="${index}">-</button></td>
            <td>${item.quanty}</td>
            <td><button class='btn btn-success btn-sm add-item' data-index="${index}">+</button></td>
        `;
        tableBody.appendChild(row);

        // Calculamos el precio total de los productos
        totalPrice += item.price * item.quanty;
    });

    modalBody.appendChild(table); // Agregar la tabla al modal body
    // Mostrar el total en el pie del modal
    const totalElement = document.createElement("div");
    totalElement.className = "d-flex justify-content-between align-items-center";
    totalElement.innerHTML = `
        <span><strong>Total:</strong></span>
        <div><strong>$${totalPrice.toFixed(2)}</strong></div>
        <button type="button" id="button-checkout" class="btn btn-primary">Comprar</button>
    
    `;
    modalFooter.appendChild(totalElement);

    const mercadopago = new MercadoPago("TEST-15e4302f-53c5-4c60-bf9d-6f94ab4bf84e", {
        locale: "es-AR",
    });

    const checkoutButton = modalFooter.querySelector("#button-checkout");

    checkoutButton.addEventListener("click", function () {
        console.log("ëntre");
        
        const orderData = {
            quantity: 1,
            description: "compra en el e-commerce",
            price: totalPrice
        };

        fetch("http://localhost:8080/create_preference", {
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
                createCheckOutButton(preference.id);
            })
            .catch(function () {
                alert("error inesperado");
            });
    });

    function createCheckOutButton(preferenceId) {
        // Initialize the checkout
        const bricksBuilder = mercadopago.bricks();

        const renderComponent = async (bricksBuilder) => {
            //if (window.checkoutButton) window.checkoutButton.unmount();
            checkoutButton.innerText = "Pagar Ahora";
            await bricksBuilder.create(
                'wallet',
                'button-checkout', // class/id where the payment button will be displayed
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


    // Agregar eventos a los botones de eliminar
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            removeItemFromCart(index);
        });
    });

    // Agregar eventos a los botones de aumentar cantidad
    const addButtons = document.querySelectorAll('.add-item');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            addItemToCart(index);
        });
    });
}

function removeItemFromCart(index) {
    // Reducir la cantidad del producto
    if (cart[index].quanty > 1) {
        cart[index].quanty--;
    } else {
        // Si la cantidad es 1, eliminar el producto del carrito
        cart.splice(index, 1);
    }
    // Actualizar el modal después de eliminar o reducir la cantidad
    displayCart();
}

function addItemToCart(index) {
    // Aumentar la cantidad del producto
    cart[index].quanty++;
    // Actualizar el modal después de aumentar la cantidad
    displayCart();
}

// Agregar un evento para mostrar el carrito cuando se abra el modal
Modal.addEventListener('show.bs.modal', displayCart);

// Exportar funciones para que sean accesibles en otros módulos
export { addToCart, removeItemFromCart, getCart };