const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
let htmlContentToAppend = "";
var currentSortCriterio = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criterio, array) { // Diferentes filtros. 
    let result = []; // lista
    if (criterio === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) { // orden por nombre a - z
            if (a.cost < b.cost) { return -1; } // si a es menor me lo devuelve alreves
            if (a.cost > b.cost) { return 1; } // si a es mayor lo devuelve bien. Con el return -1 ordena de atras para adelante, y viceversa con 1.
            return 0;
        });
    } else if (criterio === ORDER_DESC_BY_NAME) { // orden por nombre z - a
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === ORDER_BY_PROD_COUNT) { // orden por ventas de cant de productos
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList() {

    for (let i = 0; i < currentProductsArray.length; i++) { // recorre por indice, recorre el currentprod... que es una lista vacia y esta definida como una variable global.
        let products = currentProductsArray[i]; // carga lo que venga del for y lo guarda en la variable products. 

        if (((minCount == undefined /* esto si no esta ingresado el valor del minimo, no hace nada.*/) || (minCount != undefined && parseInt(products.cost) >= minCount)) && //Estos son los filtros, el rango de cant de productos que tiene cada product. 
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))) { // lo que hace el min y el max es poner en filtros el rango de cantidad de productos que se quiera, parseInt es para pasar a entero.

            htmlContentToAppend += // incerto en el html de la misma manera que se hace en Products. 
            `   <div class="col-lg-4 col-md-6 col-sm-12" onclick="particularProd(` + `'` + products.name + `'` + `)">
                    <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                    <img class="bd-placeholder-img card-img-top" src="${products.imgSrc}" alt="${products.description}">
                        <div class="card-body">
                            <h4 class="mb-1">${products.name}</h4>
                            <strong><p class="mb-1">${products.currency} ${products.cost}</p></strong>
                            <p class="card-text">${products.description}</p>
                            <small class="text-muted">${products.soldCount} artículos vendidos</small>
                        </div>
                    </a>
                </div>
            `;
        }

    }

    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;

}

function searchProduct() {
    let searchbox = document.getElementById("searchbox").value.toLowerCase(); // convierto lo que venga del searchbox en m 
    htmlContentToAppend = ""; 
    for (let product of currentProductsArray) { //error dentro del for. 
        let nombre = product.name.toLowerCase(); // convertir en nombre del producto en minuscula. 
        if ((nombre.includes(searchbox))) { // indexOf utilizado para buscar los elementos de una lista.

            htmlContentToAppend += `<span onclick="particularProd(` + `'` + product + `'` + `)" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.name + `" class="img-thumbnail"> 
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ product.name + `</h4>
                    <small class="text-muted">` + product.currency + " " + product.cost + `</small>
                </div>
                    <p class="mb-1" style="text-align: left;">` + product.description + `</p>
                    <p class="" style="text-align: left;">Vendidos ` + product.soldCount + `</p>
                </div>
            </div>
            </span> 
            `;
        }
    }
    document.getElementById("prod-list-container").innerHTML += htmlContentToAppend;
}

function sortAndShowProducts(sortCriterio, productsArray) {
    currentSortCriterio = sortCriterio;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriterio, currentProductsArray);

    //Muestro las prodegorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();

    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por prodegoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });

    searchbox.addEventListener("keyup", searchProduct()) // todo lo que este aca dentro funcionara
});



