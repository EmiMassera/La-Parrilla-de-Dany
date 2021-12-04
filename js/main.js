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
        <div class="producto-quitar"> 
        <i class="bi bi-cart-x-fill a-eliminar" data-id="${producto.id}"></i>
        </div>
        <div class="producto-price">$${producto.price}</div>
         `;
         tablaCarrito.appendChild(rowProduct);
         this.guardarProductosLS(producto);
         this.sumarCantidad(producto);
     }

     eliminarProducto(e){
         e.preventDefault();
         var producto, productoID;
         if(e.target.classList.contains('a-eliminar')){
            e.target.parentElement.parentElement.remove();
            producto =  e.target.parentElement.parentElement;
            productoID = producto.querySelector('.a-eliminar').getAttribute("data-id");
            this.eliminarProductoLS(productoID);
        } 
     }


     vaciarCarrito(e){
         e.preventDefault();
         while (tablaCarrito.firstChild) {
             tablaCarrito.removeChild(tablaCarrito.firstChild);
         }
         this.vaciarLocalStorage();
         return false;
     }

     guardarProductosLS(producto) {
         let productos;
         productos = this.obtenerProductosLS();
         productos.push(producto)
         localStorage.setItem('productos', JSON.stringify(productos))
     }
     
     obtenerProductosLS(){
         let productoLS;
         if (localStorage.getItem('productos') === null) {
             productoLS = [];
         }
         else {
             productoLS = JSON.parse(localStorage.getItem('productos'))
         }
         return productoLS;
     }

     eliminarProductoLS(productoID){
         let productosLS;
         productosLS = this.obtenerProductosLS(); 
         productosLS.forEach(function(productoLS, index){ 
            if (productoLS.id === productoID) {
                productosLS.splice(index, 1);                
            }
         });
         localStorage.setItem('productos', JSON.stringify(productosLS))
     }

     leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLS(); 
        productosLS.forEach(function(producto){
            const rowProduct = document.createElement('div');
         rowProduct.classList.add('carrito-body-element');
         rowProduct.innerHTML = `
        <div class="producto-amount">${producto.amount}</div>
        <div class="producto-name">${producto.name}</div>
        <div class="producto-quitar"> 
        <i class="bi bi-cart-x-fill a-eliminar" data-id="${producto.id}"></i>
        </div>
        <div class="producto-price">$${producto.price}</div>
         `;
         tablaCarrito.appendChild(rowProduct);
        });
     }

     vaciarLocalStorage(){
         localStorage.clear();
     }


    //  sumarCantidad(producto){
    //      let productosALeer = this.obtenerProductosLS();      

    //  }
     

}



const carro = new Carrito();
const carrito = document.getElementById('carrito');
const products = document.getElementById('products');
const tablaCarrito = document.getElementById('tablaCarrito');
const vaciarCarrito = document.getElementById('btn-vaciarCarrito');
const btnCombo = document.getElementById('btnCombo');
cargarEventos();

function cargarEventos(){
    products.addEventListener('click',(e)=>{carro.comprarProducto(e)});
    tablaCarrito.addEventListener('click',(e)=>{carro.eliminarProducto(e)});
    vaciarCarrito.addEventListener('click',(e)=>{carro.vaciarCarrito(e)});
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());
}
