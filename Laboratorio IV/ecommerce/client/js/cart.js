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
        <span><strong>$${totalPrice.toFixed(2)}</strong></span>
    `;
    modalFooter.appendChild(totalElement);

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