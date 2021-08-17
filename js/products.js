document.addEventListener("DOMContentLoaded", function (e) {

fetch(PRODUCTS_URL) // traigo el json

.then( respuesta => respuesta.json()) // lo proceso

.then( datosprod => {
    let principal = document.getElementById("principal"); // establezco un array para traer el div del html
    for(let products of datosprod) { // for que procesa lo que viene del json 

    principal.innerHTML += // incerto en el html de la misma manera que se hace en categories. 
    `<a href="" class="list-group-item list-group-item-action">
    <div class="row">
        <div class="col-3">
            <img src="` + products.imgSrc + `" alt="` + products.name + `" class="img-thumbnail"> 
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">`+ products.name +`</h4>
            <small class="text-muted">` + products.currency + " " + products.cost + `</small>
        </div>
            <p class="mb-1">` + products.description + `</p>
            <p class="">Vendidos ` + products.soldCount + `</p>
        </div>
    </div>
    </a> 
    `; 
}  
})         
});           