//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

fetch(PRODUCT_INFO_URL)
    .then(respuesta => respuesta.json())
    .then(datos => {
        let productNameHTML = document.getElementById("productName");
        let productDescriptionHTML = document.getElementById("productDescription"); 
        let costProductHTML = document.getElementById("costProduct"); 
        let soldCountProductHTML = document.getElementById("soldCountProduct"); 

        productNameHTML.innerHTML =  datos.name 
        productDescriptionHTML.innerHTML = "Descripcion: <br>" + datos.description
        costProductHTML.innerHTML = "Costo: " + datos.currency + " " + datos.cost
        soldCountProductHTML.innerHTML = "Cantidad disponible: " + datos.soldCount
        document.getElementById('showProduct').setAttribute("src", datos.images[0])
        document.getElementById('showProduct1').setAttribute("src", datos.images[1])
        document.getElementById('showProduct2').setAttribute("src", datos.images[2])
        document.getElementById('showProduct3').setAttribute("src", datos.images[3])

    })
    .catch(error => alert("Hubo un error: " + error));

