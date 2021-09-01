//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


let miStorage = window.localStorage;
let userName = document.getElementById("user");
let password = document.getElementById("pass");

function validar() {
    const home = "home.html";
    miStorage.setItem('nombreUsuario', userName.value);
    if (userName.value === "" && password.value === "") {
        alert("Campos incompletos, alguno campo vacio.");
    }
    else {
        window.location.href = home;
    }
}

function onSignIn(googleUser) {
    var perfil = googleUser.getBasicProfile();
    miStorage.setItem('nombreUsuario', perfil.getName());
    window.location.href = "home.html";
}

