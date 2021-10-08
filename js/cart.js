let productosCarrito;
let CURRENCY_EXCHANGE = 40;

function showCartProduct(){ // mostrar productos
  htmlTexto = "";
  let contador = 0;

  for (let i = 0; i < productosCarrito.articles.length; i++) { // for que recorre la lista de prods. 
    const producto = productosCarrito.articles[i];
    
    htmlTexto += `
    <li class="cart_item clearfix">
      <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
      
        <div class="cart_item_image cart_info_col">
          <img src="${producto.src}"/>
        </div>

        <div class="cart_item_quantity cart_info_col">
          <div class="cart_item_title">Quantity</div>
          <input id="cantidad${i}" class="cart_item_text" min="1" value="1" type="number" onchange="multiplyPrice(${i})"/>
        </div>
        <div class="cart_item_price cart_info_col">
          <div class="cart_item_title">Price</div>
          <div class="cart_item_text"><span id="currencySubTotal${i}">${producto.currency}</span><span id="precio${i}">${producto.unitCost}<span></div>
        </div>
        <div class="cart_item_subtotal cart_info_col">
          <div class="cart_item_title">Subtotal</div>
          <div id="subtotal${i}" class="cart_item_text">${producto.unitCost}</div>
        </div>
      </div>
    </li>
    `;

    contador++; //SUMARLE 1 PRODUCTO
  }

  document.getElementById('cartList').innerHTML = htmlTexto //inserta el formato de arriba
  document.getElementById('cantidadTotal').innerHTML = ` (${contador} productos en el carrito)`; // dice cuantos productos hay en el carrito
  calculateTotal();
  
}

/**
 * 
 * @param {*} id indice del valor que recibe
 * @param {*} cost 
 * @returns el valor de la moneda ya convertido
 */
function currencyConverter(id, cost) {
  let currency = document.getElementById(`currencySubTotal${id}`).innerHTML;
  if (currency == "USD") {
    return CURRENCY_EXCHANGE * cost;
  } else {
    return cost;
  }
}

/**
 * Se podria incluir el convertor en esta funcion. 
 * Sin necesidad de crear otro function. 
 * O en el showCartProduct, con una funcion que se cree aparte, y poniendola ahi.  
 */
function multiplyPrice(i){ // multiplicar el precio x cant de productos. 

  let precio = parseFloat(document.getElementById(`precio${i}`).innerText); // trae el valor de precio unitario
  let cantidad = parseFloat(document.getElementById(`cantidad${i}`).value); // trae el valor de la cantidad de prods 
  let total = precio * cantidad; // multiplica la cantidad de productos por el precio unitario

  document.getElementById(`subtotal${i}`).innerHTML = total; //imprimo el total de todos los productos y sus respectivos precios unitarios x la cantidad de productos que se quiere adquirir.
  calculateTotal();
}

function calculateTotal(){ // CALCULAR Y MOSTRAR EL TOTAL
  
  let sumaTotal = 0;
  for(let i = 0; i < productosCarrito.articles.length ;i++){     
    sumaTotal += currencyConverter(i, parseFloat(document.getElementById(`subtotal${i}`).innerHTML));  // sumatoria de todos los subtotales q hayan. 
  }

  document.getElementById('total').innerHTML = sumaTotal; // imprimir ese dato. 
  
}

function goToProducts(){ // funcionalidad del boton de ir a productos.
  window.location.href = "products.html"
}

function finishPurchase(){ // función para mostrar el mensaje al comprar. 
  fetch(CART_BUY_URL)
  .then(obj => obj.json())
  .then(msg => {
    let menssege = msg.msg // guardo el mensaje en una variable. 
    let textToImpress = document.getElementById("textFinishPurchase"); // traigo el div del html
    textToImpress.innerHTML = `${" " + menssege}` // imprimo el mensaje de que se compro con exito
  })
}

document.addEventListener("DOMContentLoaded",function(e){
  getJSONData(CART_INFO_URL)
  .then(resultObj=>{
    if(resultObj.status === "ok"){
      productosCarrito = resultObj.data;
      showCartProduct();
      
    }
  })
})