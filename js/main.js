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
         const rowProduct = document.createElement('tr');
         rowProduct.innerHTML = `
         <td>${producto.amount}</td>
         <td>${producto.name}</td>
         <td>${producto.price}</td>
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
