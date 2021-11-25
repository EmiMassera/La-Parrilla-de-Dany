class Carrito {
    // Añadir producto
     comprarProducto(e){
         e.preventDefault();
         if (e.target.classList.contains('btnAddCart')) {
             const producto = e.target.parentElement;
             this.leerDatosProducto(producto)
         }
     }

     leerDatosProducto(producto){
         const infoProduct = {
             name : producto.querySelector('.nameProduct').textContent,
             price : producto.querySelector('.productPrice').textContent,
             id : producto.getAttribute("data-id"),
             amount : 1
         }
         this.insertarCarrito(infoProduct);
     }
     
     insertarCarrito(producto) {
         const rowProduct = document.createElement('div');
         rowProduct.classList.add('carrito-body-element');
         rowProduct.innerHTML = `
        <div class="producto-amount">${producto.amount}</div>
        <div class="producto-name">${producto.name}</div>
        <div class="producto-price">$${producto.price}</div>
         `;
         tablaCarrito.appendChild(rowProduct);
     }
}

const carro = new Carrito();
const carrito = document.getElementById('carrito');
const products = document.getElementById('products');
const tablaCarrito = document.getElementById('tablaCarrito');

// console.log(tablaCarrito)

cargarEventos();

function cargarEventos(){
    products.addEventListener('click',(e)=>{carro.comprarProducto(e)});
}
