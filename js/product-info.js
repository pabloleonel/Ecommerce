document.addEventListener("DOMContentLoaded", function (e) {
  prodShow();
  prodCommentsShow();
  showComments();
});

let arrayComentarios = []; // variable para guardar una lista de comentraios y posteriormente ponerlos en la pagina tomandolos del localstorage
let saveStar; // variable para ver las estrellas guardadas
let scoreSelect; // variable para ver la cantidad de estrellas guardadas, y ponerlas junto a los demas datos guardados en el objeto showcomments.
let producto = window.localStorage.getItem('particularProd');

function prodShow() { // funcion para mostrar tanto los datos del prod, como el carrousel. 
  fetch(OTHER_PRODUCTS_URL)
    .then(respone => respone.json())
    .then(prod => {
      for (let datos of prod) {
        if (datos.name == producto) {

          // Nombre del auto
          productName.innerHTML += datos.name

          // Datos del producto
          productInfo.innerHTML += `<span class="text-left"><strong>Costo: </strong><br>${datos.cost} ${datos.currency}</span><br>
      <br><strong>Recuento de vendidos: </strong><br> ${datos.soldCount} 
      <br><br><strong> Descripcion:</strong><br>${datos.description}`

          // Carrousel
          let contenedorProduct = document.getElementById("carouselExampleIndicators") // traigo el div desde el html

          // le inserto:
          contenedorProduct.innerHTML = `
        <div class="">
        <div id="carouselProducto" class="carousel" data-ride="carousel">
        <div class="carousel-inner" style="border-radius: 15px;">
        </div></div></div>`

          // traigo a donde le voy a poner las imagenes
          let contenedorSlider = document.getElementsByClassName("carousel-inner")[0]

          //le agrego las imagenes con el codigo de boostrap y las imagenes del json, recorriendolos con el for de abajo.
          for (let i = 0; i < datos.images.length; i++) {
            const imagen = datos.images[i];
            contenedorSlider.innerHTML += ` 
        <div class="carousel-item">
        <img src="${imagen}" class="d-block w-100" alt="...">
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
          `
            let imagenes = document.getElementsByClassName("carousel-item")
            // le pongo el active para que aparezca primero, etc. 
            imagenes[0].className += " active"

          }

          // Productos relacionados
          let prodRelated = datos.relatedProducts;

          fetch(PRODUCTS_URL)
            .then(resp => resp.json())
            .then(prodRel => {

              relacionado = prodRelated;
              let relatedProd = document.getElementById('relatedProd'); // traigo el div del html.

              for (let related of relacionado) {

                relatedProd.innerHTML += `<div class="col-sm-4">
              <div class="card"> <img src=${prodRel[related].imgSrc} class="card-img-top" width="100%"><br>
                <div class="card-body pt-0 px-0">
                <div class="d-flex flex-row justify-content-around mb-0 px-3"> <small class="text-muted mt-1">Nombre</small><br>
                    <h6>${prodRel[related].name}</h6>
                  </div>
                  <div class="d-flex flex-row justify-content-between mb-0 px-3"> <small class="text-muted mt-1">Precio</small><br>
                    <h6>${prodRel[related].currency + " " + prodRel[related].cost}</h6>
                  </div>
                  <div class="d-flex flex-row justify-content-between mb-0 px-3"> <small class="text-muted mt-1">Vendidos</small><br>
                    <h6>${prodRel[related].soldCount}</h6>
                  </div>
                  <div class="d-flex flex-row justify-content-between text-right mb-0 px-3"> <small class="text-muted mt-1">Descripción</small>
                    <p>${prodRel[related].description}</p>
                  </div>
                  <hr class="mt-2 mx-3">
                </div>
                <div class="text-center mb-3">
                  <button class="btn btn-info" onclick="particularProd(` + `'` + prodRel[related].name + `'` + `)"><p>Ver producto</p></button>
                </div>
              </div>
            </div>
          </div>`

              }
            })
        }
      }
    })
}

function saveMessage() { //funcion para guardar comentarios nuevos.
  let textoMensaje = document.getElementById('menssage').value; //Obtengo el elemento textArea

  if (textoMensaje != '') { //Si el texto no esta vacio...

    let messageReg = { //Creo un objeto con el mensaje y la fecha
      fechaHora: new Date(), //fecha actual new Date
      mensaje: textoMensaje, //obtener el mensaje del textarea
      score: scoreSelect,
      usuario: localStorage.getItem('nombreUsuario') //Obtengo el usuario del localstorage
    };

    arrayComentarios.push(messageReg); //Agregar al array el mensaje

    showComments();
  }

  document.getElementById('formulario').reset();
}

function prodCommentsShow() { //funcion para mostrar los comentarios del json.

  // traigo el div donde voy a guardar los datos extraidos del json.
  let comentarios = document.getElementById('comentarios')

  //hago una peticion fetch para traer los datos de los comentarios.
  fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(respone => respone.json())
    .then(comment => {

      //for para las estrellitas de los comentarios del json.
      for (let comments of comment) {
        saveStar = "";
        for (let i = 0; i < 5; i++) {
          if (i >= comments.score) {
            saveStar += `<span class="fa fa-star"></span>`
          } else {
            saveStar += `<span class="fa fa-star checked"></span>`
          }
        }

        // agrego la informacion de los comentarios.
        comentarios.innerHTML +=
          `<div class="comment-card container"><h4>${comments.user} ${saveStar}</h4>
      <p>${comments.description}<p class="text-right">${comments.dateTime}</p></p>
      </div><br>`
      }
    })
}

function showComments() { // funcion para mostrar los comentarios realizados.

  let texto = "";

  //traigo el div donde se guardan las estrellitas.
  let stars = document.getElementsByName('rate');

  //las proceso en un for, y verifico la cantidad de estrellas chequeadas en el comentario a realizar.
  for (let star of stars) {
    if (star.checked) {
      scoreSelect = star.value
    }
  }

  // si estan chequeadas las almaceno en otro for, y en una variable saveStar para luego utilizarla cuando se imprime el comentario.
  saveStar = "";
  for (let i = 0; i < 5; i++) {
    if (i >= scoreSelect) {
      saveStar += `<span class="fa fa-star"></span>`
    } else {
      saveStar += `<span class="fa fa-star checked"></span>`
    }
  }

  // for para recorrer la cantidad de comentarios que se realizaron, es decir, poder agregar varios.
  for (let i = arrayComentarios.length - 1; i >= 0; i--) {
    let mensajeAux = arrayComentarios[i];

    // agrego el texto al div que cree en el html, por encima de los otros comentarios ya realizados del json.
    texto +=
      `<div class="comment-card container"><h4>${mensajeAux.usuario} ${saveStar}</h4>
      <br><p>${mensajeAux.mensaje}</p><p class="text-right">${mensajeAux.fechaHora.toLocaleDateString()}</p></p>
      </div><br>`
  }

  document.getElementById('showComments').innerHTML = texto;
}