const cart = [];
document.addEventListener("DOMContentLoaded", () => {
const shopContent = document.getElementById("shopContent");

productos.forEach((product)=>{
    const content = document.createElement("div");
    content.classList.add("col-md-4");
    content.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${product.img}" class="img-fluid rounded-start" alt="Card title" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${product.ProductName}</h5>
                        <p class="card-text">
                            ${product.price}$
                        </p>
                        <p class="card-text">
                            <small class="text-muted">Last updated 3 mins ago</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
    shopContent.append(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";
    content.append(buyButton);
    buyButton.classList.add("btn", "btn-primary");
    buyButton.style.marginTop = "10px";
    content.querySelector('.card-body').append(buyButton);

    buyButton.addEventListener("click", ()=>{
        const repeat = cart.some((repeatProduct)=> repeatProduct.id === product.id)

        if (repeat){
            cart.map((prod)=> {
                if(prod.id === product.id){
                    prod.quanty++;
                }
            })
        } else{
            cart.push({
                id: product.id,
                ProductName: product.ProductName,
                price: product.price,
                quanty: product.quanty,
                img: product.img
            })
        }
       
    })
})
});
