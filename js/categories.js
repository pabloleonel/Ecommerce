const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array) { // Diferentes filtros.  
                                           // comentar un solo if del sort, en este boton se llama, y esta funcion conecta con la otra. Comento codigo en el desafiante anterior y lo muestro, resalto algo importante ahi. 
    let result = []; // lista
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) { // orden por nombre a - z
            if (a.name < b.name) { return -1; } // si a es menor me lo devuelve alreves
            if (a.name > b.name) { return 1; } // si a es mayor lo devuelve bien. Con el return -1 ordena de atras para adelante, y viceversa con 1.
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) { // orden por nombre z - a
        result = array.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) { // orden por ventas de cant de productos
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) { // recorre por indice, recorre el currentCat... que es una lista vacia y esta definida como una variable global.
        let category = currentCategoriesArray[i]; // carga lo que venga del for y lo guarda en la variable category. 

        if (((minCount == undefined /* esto si no esta ingresado el valor del minimo, no hace nada.*/) || (minCount != undefined && parseInt(category.productCount) >= minCount)) && //Estos son los filtros, el rango de cant de productos que tiene cada product. 
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))) { // lo que hace el min y el max es poner en filtros el rango de cantidad de productos que se quiera, parseInt es para pasar a entero.

            htmlContentToAppend += ` 
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail"> 
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name + `</h4>
                            <small class="text-muted">` + category.productCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
} 

function sortCategories(criteria, array) { // Diferentes filtros.  
    let result = []; // lista
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) { // orden por nombre a - z
            if (a.name < b.name) { return -1; } // si a es menor me lo devuelve alreves
            if (a.name > b.name) { return 1; } // si a es mayor lo devuelve bien. Con el return -1 ordena de atras para adelante, y viceversa con 1.
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) { // orden por nombre z - a
        result = array.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) { // orden por ventas de cant de productos
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) { // recorre por indice, recorre el currentCat... que es una lista vacia y esta definida como una variable global.
        let category = currentCategoriesArray[i]; // carga lo que venga del for y lo guarda en la variable category. 

        if (((minCount == undefined /* esto si no esta ingresado el valor del minimo, no hace nada.*/) || (minCount != undefined && parseInt(category.productCount) >= minCount)) && //Estos son los filtros, el rango de cant de productos que tiene cada product. 
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))) { // lo que hace el min y el max es poner en filtros el rango de cantidad de productos que se quiera, parseInt es para pasar a entero.

            htmlContentToAppend += ` 
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail"> 
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name + `</h4>
                            <small class="text-muted">` + category.productCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CATEGORIES_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showCategoriesList();
    });
});