const Modal = document.getElementById('Modal')
const modalBody = document.querySelector('.modal-body')
const modalFooter = document.querySelector('.modal-footer')


function displayCart(){
    modalBody.innerHTML = ""; // Limpiar el contenido previo
    modalFooter.innerHTML = ""; // Limpiar el pie del modal previo
    let totalPrice = 0; // Inicializar el total del precio

    
    if (cart.length === 0) {
        modalBody.innerHTML = "<p>El carrito está vacío.</p>";
        return;
}
cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.className = "d-flex justify-content-between align-items-center";
    cartItem.innerHTML = `
        <img src="${item.img}" alt="${item.ProductName}" style="width: 50px; height: 50px; margin-right: 10px;">
        <span>${item.ProductName}</span>
        <span>$${item.price}</span>
        <span>Cantidad: ${item.quanty}</span>
    `;
    modalBody.appendChild(cartItem);
    // Calculamos el precio total de los productos
    totalPrice += item.price * item.quanty;
});
    // Mostrar el total en el pie del modal
    const totalElement = document.createElement("div");
    totalElement.className = "d-flex justify-content-between align-items-center";
    totalElement.innerHTML = `
        <span><strong>Total:</strong></span>
        <span><strong>$${totalPrice.toFixed(2)}</strong></span>
    `;
    modalFooter.appendChild(totalElement);
}

// Agregar un evento para mostrar el carrito cuando se abra el modal
Modal.addEventListener('show.bs.modal', displayCart);