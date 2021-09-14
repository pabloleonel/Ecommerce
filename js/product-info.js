//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

// fetch(PRODUCT_INFO_URL)
//     .then(respuesta => respuesta.json())
//     .then(datos => {

//         document.getElementById("...").innerHTML = datos.name
//         document.getElementById("...").innerHTML = "Descripcion: <br>" + datos.description
//         document.getElementById(".....").innerHTML = "Costo: " + datos.currency + " " + datos.cost
//         document.getElementById("....").innerHTML = "Cantidad disponible: " + datos.soldCount
//         document.getElementById('....').setAttribute("src", datos.images[0])
//         document.getElementById('...').setAttribute("src", datos.images[1])
//         document.getElementById('....').setAttribute("src", datos.images[2])
//         document.getElementById('....').setAttribute("src", datos.images[3])

//     })
//     .catch(error => alert("Hubo un error: " + error));
    
//     fetch(PRODUCT_INFO_COMMENTS_URL)
//         .then(response => response.json())
//         .then(comentario => {
//            // document.getElementById("comentarios").innerHTML = comentario.description 
//         })  