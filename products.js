const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriterio = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criterio, array) { // Diferentes filtros. 
    let result = []; // lista
    if (criterio === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) { // orden por nombre a - z
            if (a.name < b.name) { return -1; } // si a es menor me lo devuelve alreves
            if (a.name > b.name) { return 1; } // si a es mayor lo devuelve bien. Con el return -1 ordena de atras para adelante, y viceversa con 1.
            return 0;
        });
    } else if (criterio === ORDER_DESC_BY_NAME) { // orden por nombre z - a
        result = array.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    } else if (criterio === ORDER_BY_PROD_COUNTS) { // orden por ventas de cant de productos
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList() {

    let htmlContentToAppend = ""; // arreglar esta funcion para que no se fije en cantidades, sino en precios. Tiene que ser: filtrar desde cierta cantidad de precio(min), hasta otra cierta cantidad(max)
    for (let i = 0; i < currentProductsArray.length; i++) { // recorre por indice, recorre el currentprod... que es una lista vacia y esta definida como una variable global.
        let products = currentProductsArray[i]; // carga lo que venga del for y lo guarda en la variable products. 

        if (((minCount == undefined /* esto si no esta ingresado el valor del minimo, no hace nada.*/) || (minCount != undefined && parseInt(products.cost) >= minCount /*esto es que la cantidad(precio) de los productos es mayor igual al minimo*/)) && //Estos son los filtros, el rango de cant de productos que tiene cada product. 
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))) { // lo que hace el min y el max es poner en filtros el rango de cantidad de productos que se quiera, parseInt es para pasar a entero.
            // si se cumple este if, muestra esa categoria(en este caso deberia ser producto.)


            htmlContentToAppend += // incerto en el html de la misma manera que se hace en Products. 
                `<a href="" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.imgSrc + `" alt="` + products.name + `" class="img-thumbnail"> 
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ products.name + `</h4>
                    <small class="text-muted">` + products.currency + " " + products.cost + `</small>
                </div>
                    <p class="mb-1">` + products.description + `</p>
                    <p class="">Vendidos ` + products.soldCount + `</p>
                </div>
            </div>
            </a> 
            `;
        }

    }
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;

}

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

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) { // recorre por indice, recorre el currentprod... que es una lista vacia y esta definida como una variable global.
        let products = currentProductsArray[i]; // carga lo que venga del for y lo guarda en la variable products. 

        if (((minCount == undefined /* esto si no esta ingresado el valor del minimo, no hace nada.*/) || (minCount != undefined && parseInt(products.cost) >= minCount)) && //Estos son los filtros, el rango de cant de productos que tiene cada product. 
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))) { // lo que hace el min y el max es poner en filtros el rango de cantidad de productos que se quiera, parseInt es para pasar a entero.

            htmlContentToAppend += // incerto en el html de la misma manera que se hace en Products. 
                `<a href="" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.imgSrc + `" alt="` + products.name + `" class="img-thumbnail"> 
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ products.name + `</h4>
                    <small class="text-muted">` + products.currency + " " + products.cost + `</small>
                </div>
                    <p class="mb-1" style="text-align: left;">` + products.description + `</p>
                    <p class="" style="text-align: left;">Vendidos ` + products.soldCount + `</p>
                </div>
            </div>
            </a> 
            `;
        }

    }

    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;

}

function sortAndShowProducts(sortCriterio, productsArray) {
    currentsortCriterio = sortCriterio;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentsortCriterio, currentProductsArray);

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
});



