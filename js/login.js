//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let miStorage = window.localStorage;
let userName = document.getElementById("user");
let password = document.getElementById("pass");

function validar() { // funcion de la validacion del login.
    const home = "home.html"; //redireccion
    miStorage.setItem('nombreUsuario', userName.value); //guardo el usuario en el localstorage
    if (userName.value === "") {
        alert("Campos incompletos, algún campo vacio.");
    }
    else {
        if(password.value === ""){
        alert("Campos incompletos, algún campo vacio.");
        }
    }
     window.location.href = "home.html"   
    }

function onSignIn(googleUser) { // poner username en el navbar, pero con google. 
    var perfil = googleUser.getBasicProfile();
    miStorage.setItem('nombreUsuario', perfil.getName());
    window.location.href = "home.html";
}

