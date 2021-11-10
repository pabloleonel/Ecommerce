let productosCarrito;
let sumaTotal;
let shippingPercentage;
let validations = { direction: false, methodPayment: { transfer: false, card: false, isSelected: false }, shippingMethod: false }
let quantity = document.getElementsByClassName("quiantity-inputs");
const CURRENCY_EXCHANGE = 40;
const CURRENCY = "UYU"
function showCartProduct() { // mostrar productos
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
        <input id="cantidad${i}" value="${producto.count}" class="form-control form-control-lg text-center quiantity-inputs" min="1" type="number" onchange="multiplyPrice(${i})"/>
      </td>
      </td>
      <td data-th="Price">
      <span id="currencySubTotal${i}">${producto.currency}</span>
      <span id="precio${i}">${producto.unitCost}<span>
      </td>
      <td data-th="Subtotal">
      <div id="subtotal${i}" class="cart_item_text" data-subtotal="${(producto.unitCost)}">${producto.currency} ${(producto.unitCost) * (producto.count)}</div>
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
  document.getElementById('quantityProds').innerHTML = contador // dice cuantos productos hay en el carrito
  calculateTotal();
}
function currencyConverter(id, cost) { // funcion para convertir los precios de los productos. 
  let currency = document.getElementById(`currencySubTotal${id}`).innerHTML; // div para poner la conversion. 
  if (currency == "USD") {
    return CURRENCY_EXCHANGE * cost; // funcionalidad para convertir de usd a uyu, sino hay que convertir, lo deja igual. 
  } else {
    return cost;
  }
}
function multiplyPrice(i) { // multiplicar el precio x cant de productos. 

  let price = parseFloat(document.getElementById(`precio${i}`).innerText); // trae el valor de precio unitario
  let quantity = parseFloat(document.getElementById(`cantidad${i}`).value); // trae el valor de la cantidad de prods
  if (quantity >= 0) {
    let total = price * quantity; // multiplica la cantidad de productos por el precio unitario
    productosCarrito.articles[i].count = quantity;
    document.getElementById(`subtotal${i}`).innerHTML = productosCarrito.articles[i].currency + " " + numberWithCommas(total); //imprimo el total de todos los productos y sus respectivos precios unitarios x la cantidad de productos que se quiere adquirir.
    document.getElementById(`subtotal${i}`).dataset.subtotal = total; // obtengo el total de la cantidad de subtotales.
  } else {
    total = 0;
    document.getElementById("messageForQuantity").innerHTML = // lanza el alert si no se actualizaron los datos 
      `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <span class="alert-heading alert-dismissible text-center"><strong>Debe seleccionar una cantiad</strong></span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`
    setTimeout(function () {
      document.getElementById("messageForQuantity").innerHTML = "";
    }, 4000)
    document.getElementById(`subtotal${i}`).innerHTML = productosCarrito.articles[i].currency + " " + numberWithCommas(total); //imprimo el total de todos los productos y sus respectivos precios unitarios x la cantidad de productos que se quiere adquirir.
    document.getElementById(`subtotal${i}`).dataset.subtotal = total; // obtengo el total de la cantidad de subtotales.
  }
  calculateTotal();
}
function calculateTotal() { // Funcion para calcular y mostrar el subtotal ya convertido. 
  sumaTotal = 0;
  for (let i = 0; i < productosCarrito.articles.length; i++) {
    sumaTotal += currencyConverter(i, parseFloat(document.getElementById(`subtotal${i}`).dataset.subtotal));  // sumatoria de todos los subtotales q hayan. 
  }
  document.getElementById('total').innerHTML = "UYU" + " " + numberWithCommas(sumaTotal);; // imprimir ese dato. 
}
function updateTotalCostAfterShipping() { // funcion para actualizar el costo total mas el envio. 
  let inputs = document.getElementsByName('shiptype');
  let totalCostProdsMoreShippingCost = document.getElementById('totalCostProdsMoreShipping');
  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {

      priceSubtotal = sumaTotal;

      var shippingPercentage = inputs[i].value;

      let totalCostToShow = CURRENCY + " " + numberWithCommas(parseFloat((Math.round(priceSubtotal * shippingPercentage) / 100) + priceSubtotal).toFixed(2));

      totalCostProdsMoreShippingCost.innerHTML = totalCostToShow;
    }
  }
  addPriceShipping();
}
function addPriceShipping() { // agregar costo de envio 
  let shippingPrice = document.getElementById("priceShipping");
  let inputs = document.getElementsByName('shiptype');
  for (i = 0; i < inputs.length; i++) { // for que recorre el input radio. 
    if (inputs[i].checked) { // si esta seleccionado... 

      priceSubtotal = sumaTotal; // suma del subtotal 

      var shippingPercentage = inputs[i].value;

      let totalCostToShow = CURRENCY + " " + numberWithCommas(parseFloat((Math.round(priceSubtotal * (shippingPercentage / 100)))));

      shippingPrice.innerHTML = totalCostToShow; // muestra el costo del envio solamente.
    }
  }
}
function deleteProd(i) { // funcion para remover productos. 
  productosCarrito.articles.splice(i, 1)
  showCartProduct();
}
function alertsFields() { // funcion para mostrar todas las alertas. 
  validateDirection();
  validateMethodShipping();
  validateSelectedTypeOfPaymentMethod();

  if ((validations.direction == true) && (validations.methodPayment.transfer == true || validations.methodPayment.card == true) && validations.shippingMethod == true) {
    document.getElementById("messageForAllGood").innerHTML = // lanza el alert si no se actualizaron los datos 
      `<div class="alert alert-success alert-dismissible role="alert">
            <span class=" alert-success text-center"><strong>¡Has comprado con éxito!</strong></span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`
    setTimeout(function () {
      document.getElementById("messageForAllGood").innerHTML = "";
    }, 4000)
  }

  document.getElementById("finalpurchase").setAttribute('disabled', '');
  setTimeout(function () {
    document.getElementById("finalpurchase").removeAttribute('disabled');
  }, 4000)
}
function validateDirection() { // funcion para validar la direccion seleccionada. 
  let direction = document.getElementById("direction");
  if (direction.value == "") {
    document.getElementById("messageForDirection").innerHTML = // lanza el alert si no se actualizaron los datos 
      `<div class="alert alert-danger alert-dismissible role="alert">
            <span class=" alert-danger text-center"><strong>Debe seleccionar una dirección</strong></span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`
    setTimeout(function () {
      document.getElementById("messageForDirection").innerHTML = "";
    }, 4000)
  } else {
    validations.direction = true
  }
}
function validateMethodShipping() { // funcion para validar el metodo de envio seleccionado. 
  let inputPremiun = document.getElementById('premiumradio');
  let inputExpress = document.getElementById('expressradio');
  let inputStandard = document.getElementById('standardradio');
  let valid = false
  if (inputPremiun.checked) {
    valid = true
    validations.shippingMethod = true
  }
  else if (inputExpress.checked) {
    valid = true
    validations.shippingMethod = true
  }
  else if (inputStandard.checked) {
    valid = true
    validations.shippingMethod = true
  }
  if (valid) {
  } else {
    document.getElementById("messegeForMethodPayNotComplete").innerHTML = // lanza el alert si no se actualizaron los datos 
      `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <span class="alert-danger text-center"><strong>Debe seleccionar un método de envio.</strong></span>

            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`
    setTimeout(function () {
      document.getElementById("messegeForMethodPayNotComplete").innerHTML = "";
    }, 4000)
  }
}
function validateSelectedTypeOfPaymentMethod() { // funcion para validad el tipo de pago seleccionado. 
  let payMethods = document.getElementsByName("paymethod");
  let credit = document.getElementById("credit-method-payment")
  let transfer = document.getElementById("transfer-method-payment")

  for (i = 0; i < payMethods.length; i++) {
    if (credit.checked) {
      validations.methodPayment.isSelected = true
      validateFieldsOfCardCredit();

    } else if (transfer.checked) {
      validations.methodPayment.isSelected = true
      validateFieldsOfTransfer();
    } else {
      document.getElementById("menssegeMethodPaymentNotComplete").innerHTML = // lanza el alert si no se actualizaron los datos 
        `<div class="alert alert-danger alert-dismissible role="alert">
            <span class=" alert-danger text-center"><strong>Debe seleccionar una forma de pago.</strong></span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`
      setTimeout(function () {
        document.getElementById("menssegeMethodPaymentNotComplete").innerHTML = "";
      }, 4000)
    }
  }
}
function validateFieldsOfTransfer() { // funcion que valida los campos de transferencia bancaria
  let transferCode = document.getElementById("transferCode");
  if (transferCode.value == "") {
    document.getElementById("messegeForNotCompleteFieldsForCardType").innerHTML = // lanza el alert si no se actualizaron los datos 
      `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <span class="alert-danger text-center"><strong>Debe completar los campos necesarios en la forma de pago.</strong></span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`
    setTimeout(function () {
      document.getElementById("messegeForNotCompleteFieldsForCardType").innerHTML = "";
    }, 6000)
  } else {
    validations.methodPayment.transfer = true
  }
}
function validateFieldsOfCardCredit() { // funcion que valida los campos de la tarjeta de credito. 

  let name = document.getElementById("name");
  let number = document.getElementById("number");
  let date = document.getElementById("date");
  let passcode = document.getElementById("passcode");
  let visa = document.getElementById("visa");
  let master = document.getElementById("master");
  let valid = false

  if (name.value != "" && number.value != "" && date.value != "" && passcode.value != "" && (visa.checked || master.checked)) {
    valid = true
    validations.methodPayment.card = true
  }
  else {
    document.getElementById("messegeForNotCompleteFieldsForCardType").innerHTML = // lanza el alert si no se actualizaron los datos 
      `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <span class="alert-danger text-center"><strong>Debe completar los campos necesarios en la forma de pago.</strong></span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`
    setTimeout(function () {
      document.getElementById("messegeForNotCompleteFieldsForCardType").innerHTML = "";
    }, 4000)

  }
}
function goToProducts() { // funcionalidad del boton de ir a productos.
  window.location.href = "products.html"
}
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL)
    .then(resultObj => {
      if (resultObj.status === "ok") {
        productosCarrito = resultObj.data;
        showCartProduct();
      }
    })
})
