let productosCarrito;
let producto = window.localStorage.getItem('particularProd');
let sumaTotal;
const CURRENCY_EXCHANGE = 40;
const CURRENCY = "UYU"

function showCartProduct(){ // mostrar productos
  htmlTexto = "";
  let contador = 0;

  
  for (let i = 0; i < productosCarrito.articles.length; i++) { // for que recorre la lista de prods. 
    const producto = productosCarrito.articles[i];
    
    // inserto el html, medio template de boostrap.
    htmlTexto += 
    `<tr data-prodComplete="eliminate">
      <td data-th="Product">
        <div class="row">
          <div class="col-md-3 text-left">
            <img src="${producto.src}" alt=""
              class="img-fluid d-none d-md-block rounded mb-2 shadow">
            </div>
          <div class="col-md-9 text-left mt-sm-2">
            <h4>Nombre del producto</h4>
            <p class="font-weight-light">${producto.name}</p>
          </div>
        </div>
      </td>
      <td data-th="Quantity">
        <input id="cantidad${i}" class="form-control form-control-lg text-center" min="1" value="1" type="number" onchange="multiplyPrice(${i})"/>
      </td>
      </td>
      <td data-th="Price">
      <span id="currencySubTotal${i}">${producto.currency}</span>
      <span id="precio${i}">${producto.unitCost}<span>
      </td>
      <td data-th="Subtotal">
      <div id="subtotal${i}" class="cart_item_text" data-subtotal="${(producto.unitCost)}">${producto.currency} ${numberWithCommas(producto.unitCost)}</div>
      </td>
      <td class="actions" data-th="">
        <div class="text-right">
          <button class="btn btn-white border-secondary bg-white btn-md mb-2" onclick="deleteProd(${i})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
    <hr>`;

    contador++; //Cuenta la cantidad de productos que hay mediante una suma.
    
  }

  document.getElementById('cart_list').innerHTML = htmlTexto //inserta el formato de arriba
  document.getElementById('cantidadTotal').innerHTML = contador // dice cuantos productos hay en el carrito
  calculateTotal();
  // updateTotalCostAfterShipping()
}

function currencyConverter(id, cost) { // funcion para convertir los precios de los productos. 
  let currency = document.getElementById(`currencySubTotal${id}`).innerHTML; // div para poner la conversion. 
  if (currency == "USD") {
    return CURRENCY_EXCHANGE * cost; // funcionalidad para convertir de usd a uyu, sino hay que convertir, lo deja igual. 
  } else {
    return cost;
  }
}

function multiplyPrice(i){ // multiplicar el precio x cant de productos. 

  let price = parseFloat(document.getElementById(`precio${i}`).innerText); // trae el valor de precio unitario
  let quantity = parseFloat(document.getElementById(`cantidad${i}`).value); // trae el valor de la cantidad de prods 
  let total = price * quantity; // multiplica la cantidad de productos por el precio unitario

  document.getElementById(`subtotal${i}`).innerHTML = productosCarrito.articles[i].currency + " " + numberWithCommas(total); //imprimo el total de todos los productos y sus respectivos precios unitarios x la cantidad de productos que se quiere adquirir.
  document.getElementById(`subtotal${i}`).dataset.subtotal = total; // obtengo el total de la cantidad de subtotales.
  calculateTotal();
}

function calculateTotal(){ // Funcion para calcular y mostrar el subtotal ya convertido. 
  sumaTotal = 0;
  for(let i = 0; i < productosCarrito.articles.length ;i++){     
    sumaTotal += currencyConverter(i, parseFloat(document.getElementById(`subtotal${i}`).dataset.subtotal));  // sumatoria de todos los subtotales q hayan. 
  }
  document.getElementById('total').innerHTML = "UYU" + " " + numberWithCommas(sumaTotal); ; // imprimir ese dato. 
}

function updateTotalCostAfterShipping() {
  var inputs = document.getElementsByName('shiptype');
    for(i = 0; i < inputs.length; i++) {
    if(inputs[i].checked){
     
        priceSubtotal = sumaTotal;

        var shippingPercentage = inputs[i].value;

        let totalCostProdsMoreShippingCost = document.getElementById('totalCostProdsMoreShipping');

        let totalCostToShow = CURRENCY + " " + numberWithCommas(parseFloat((Math.round(priceSubtotal * shippingPercentage) / 100) + priceSubtotal).toFixed(2));

        totalCostProdsMoreShippingCost.innerHTML = totalCostToShow;
    }}

}
    
function deleteProd(i){ // funcion para remover productos. 
  productosCarrito.articles.splice(i, 1)
  showCartProduct();
}

function goToProducts(){ // funcionalidad del boton de ir a productos.
  window.location.href = "products.html"
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