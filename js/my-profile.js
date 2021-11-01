const NAMES = document.getElementById("names");
const LASTNAME = document.getElementById("last-name");
const AGE = document.getElementById("age");
const EMAIL = document.getElementById("email");
const PHONENUMBER = document.getElementById("phone-number");
const COUNTRY = document.getElementById("country");
const IMAGE = document.getElementById("img");

function getUserData() { // obtiene los datos del user y los guarda en un objeto 

    let userData = {
        names: NAMES.value, // obligatorio
        lastName: LASTNAME.value, // obligatorio
        age: AGE.value, // obligatorio
        email: EMAIL.value, // obligatorio
        numberPhone: PHONENUMBER.value,
        country: COUNTRY.value,
        img: IMAGE.src // obligatorio
    }

    if (userData.names !== '' && userData.lastName !== '' && userData.email !== "" && userData.numberPhone !== "" && userData.age !== "") {
        localStorage.setItem("userProfile", JSON.stringify(userData));

        document.getElementById("buttonCongratulations").innerHTML = // lanza el alert si se actualizaron los datos 
            `
            <div class="alert alert-success" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="alert-heading">Correcto!</h4>
                <p>Datos actualizados con éxito!</p>
            </div>`
        setTimeout(function () {
            document.getElementById("buttonCongratulations").innerHTML = "";
        }, 3000)
    } else {
        document.getElementById("buttonCongratulations").innerHTML = // lanza el alert si no se actualizaron los datos 
            `
            <div class="alert alert-danger" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="alert-danger">No!.</h4>
                <p>Porfavor, rellena los campos obligatorios</p>
            </div>`
        setTimeout(function () {
            document.getElementById("buttonCongratulations").innerHTML = "";
        }, 3000)
    }
}

function saveAndViewImage() { // guarda y muestra la imagen del perfil. 
    var preview = document.getElementById('img'); // traigo lo de la imagen 
    var file = document.querySelector('input[type=file]').files[0]; // traigo el valor que se introduzca en el input 
    var reader = new FileReader(); // lee el tipo de archivo 

    reader.onloadend = function () {
        preview.src = reader.result; // guarda la imagen que se haya seteado en el input 
        localStorage.setItem("imgProfile", reader.result) // guarda la imagen que se haya seteado en el input, pero en el local 
    }

    if (file) { // si el archivo existe
        reader.readAsDataURL(file); // lo lee y lo convierte en binario. 
    } else {
        preview.src = "https://bootdey.com/img/Content/avatar/avatar6.png"; // sino pone el avatar
    }
}

function impressDataUser() { // mostrar informacion actualizada del usuario. 

    let user = JSON.parse(localStorage.getItem('userProfile')); // traigo el localstorage de usuario para ponerle los datos 
    if (user !== null) {
        NAMES.value = user.names
        LASTNAME.value = user.lastName
        AGE.value = user.age
        EMAIL.value = user.email
        PHONENUMBER.value = user.numberPhone
        COUNTRY.value = user.country
        IMAGE.src = localStorage.getItem("imgProfile") // pongo la imagen del localstorage, porque la setie en otra funcion. 
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    impressDataUser();
})
