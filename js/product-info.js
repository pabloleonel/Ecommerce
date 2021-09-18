//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  prodShow();
  prodCommentsShow();
  showComments();
});

let arrayComentarios = []; // variable para guardar una lista de comentraios y posteriormente ponerlos en la pagina tomandolos del localstorage
let saveStar; // variable para ver las estrellas guardadas
let puntajeSelect; // variable para ver la cantidad de estrellas guardadas, y ponerlas junto a los demas datos guardados en el objeto showcomments.

function prodShow() { // funcion para mostrar tanto los datos del prod, como el carrousel. 
  fetch(PRODUCT_INFO_URL)
    .then(respone => respone.json())
    .then(datos => {

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
        <div class="carousel-inner" style="border-radius: 20px;">
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
    })
}

function saveMessage() { //funcion para guardar comentarios nuevos. 
  let textoMensaje = document.getElementById('menssage').value; //Obtengo el elemento textArea

  if (textoMensaje != '') { //Si el texto no esta vacio...

    let messageReg = { //Creo un objeto con el mensaje y la fecha
      fechaHora: new Date(), //fecha actual new Date
      mensaje: textoMensaje, //obtener el mensaje del textarea
      score: puntajeSelect,
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

  //traigo las estrellitas. 
  let stars = document.getElementsByName('rate');

  //las proceso en un for, y verifico la cantidad de estrellas chequeadas en el comentario a realizar. 
  for (let star of stars) {
    if (star.checked) {
      puntajeSelect = star.value
    }
  }

  // si estan chequeadas las almaceno en otro for, y en una variable saveStar para luego utilizarla cuando se imprime el comentario. 
  saveStar = "";
  for (let i = 0; i < 5; i++) {
    if (i >= puntajeSelect) {
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