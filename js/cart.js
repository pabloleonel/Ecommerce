// let productInfo;

// function calcularTotal() {
//    //CALCULAR Y MOSTRAR EL TOTAL
//   sumaTotal = '';
//   for (let i = 0; i < productInfo; i++) {
//     sumaTotal += parseFloat(document.getElementById(`subtotal`).innerHTML);
//   }

//   document.getElementById('total').innerHTML = sumaTotal;
// }

// function multiplicarPrecio() {
//   let precio = parseFloat(document.getElementById(`precio`).innerText);
//   let cantidad = parseFloat(document.getElementById(`cantidad`).value);

//   let total = precio * cantidad;

//   document.getElementById(`subtotal`).innerHTML = total;
//   calcularTotal();
// }

// function mostrarInfoProducto() { // muestra la info de productos en el carrito. 
//   htmlTexto = "";
//   let contador = 0;
//   fetch(CART_INFO_URL_DOS)
//     .then(response => response.json())
//     .then(productInfo => {
//       let producto = productInfo.articles[0];

//       htmlTexto += `
//     <li class="cart_item clearfix">
//       <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
//         <div class="cart_item_quantity cart_info_col">
//           <div class="cart_item_title">Quantity</div>
//           <input id="cantidad" class="cart_item_text" min="1" value="1" type="number" onchange="multiplicarPrecio()"/>
//         </div>
//         <div class="cart_item_price cart_info_col">
//           <div class="cart_item_title">Price</div>
//           <div id="precio" class="cart_item_text">${producto.unitCost}</div>
//         </div>
//         <div class="cart_item_subtotal cart_info_col">
//           <div class="cart_item_title">Subtotal</div>
//           <div id="subtotal" class="cart_item_text">100</div>
//         </div>
//       </div>
//     </li>
//     `;
//       document.getElementById('listaCarrito').innerHTML = htmlTexto
//       contador++; //SUMARLE 1
//     })
//   document.getElementById('cantidadTotal').innerHTML = `(${contador} productos en el carrito)`;

// }

// document.addEventListener("DOMContentLoaded", function (e) {
//   mostrarInfoProducto();
//   calcularTotal();
// })

let productosCarrito;

function calcularTotal(){
  // CALCULAR Y MOSTRAR EL TOTAL
  let sumaTotal = 0;
  for(let i = 0; i < productosCarrito.articles.length ;i++){
    sumaTotal += parseFloat(document.getElementById(`subtotal${i}`).innerHTML);
  }

  document.getElementById('total').innerHTML = sumaTotal;
}

function multiplicarPrecio(i){
  let precio = parseFloat(document.getElementById(`precio${i}`).innerText);
  let cantidad = parseFloat(document.getElementById(`cantidad${i}`).value);

  let total = precio * cantidad;

  document.getElementById(`subtotal${i}`).innerHTML = total;
  calcularTotal();
}

function goToProducts(){
  window.location.href = "products.html"
}

function mostrarInfoProducto(){
  htmlTexto = "";
  let contador = 0;

  for (let i = 0; i < productosCarrito.articles.length; i++) {
    const producto = productosCarrito.articles[i];
    
    htmlTexto += `
    <li class="cart_item clearfix">
      <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
      
        <div class="cart_item_image cart_info_col ">
          <img src="${producto.src}"/>
        </div>
        <div class="cart_item_quantity cart_info_col">
          <div class="cart_item_title">Quantity</div>
          <input id="cantidad${i}" class="cart_item_text" min="1" value="1" type="number" onchange="multiplicarPrecio(${i})"/>
        </div>
        <div class="cart_item_price cart_info_col">
          <div class="cart_item_title">Price</div>
          <div id="precio${i}" class="cart_item_text">${producto.unitCost}</div>
        </div>
        <div class="cart_item_subtotal cart_info_col">
          <div class="cart_item_title">Subtotal</div>
          <div id="subtotal${i}" class="cart_item_text">${producto.unitCost}</div>
        </div>
      </div>
    </li>
    `;

    contador++; //SUMARLE 1
  }

  document.getElementById('listaCarrito').innerHTML = htmlTexto
  document.getElementById('cantidadTotal').innerHTML = ` (${contador} productos en el carrito)`;
  calcularTotal();
}

document.addEventListener("DOMContentLoaded",function(e){
  getJSONData(CART_INFO_URL_DOS)
  .then(resultObj=>{
    if(resultObj.status === "ok"){
      productosCarrito = resultObj.data;
      mostrarInfoProducto()
    }
  })
})