//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

fetch(PRODUCTS_URL)

.then( respuesta => respuesta.json())

.then( datosprod => {
    let principal = document.getElementById("principal");
    for(let products of datosprod) {

    principal.innerHTML += 
    `<a href="category-info.html" class="list-group-item list-group-item-action">
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