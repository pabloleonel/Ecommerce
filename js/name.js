window.addEventListener("load", function (e) { // nombre de usuario mediante el input user. 
    let miStorage = window.localStorage; // traigo el user almacenado
    if (miStorage.getItem('nombreUsuario') !== '') {  
        let nombre = miStorage.getItem('nombreUsuario'); 
        let id = document.getElementById('userImpress');
        id.innerHTML = nombre; // imprimo el nombre el div nombreUsuario del html. 
    }
    else {
        window.location.href = "index.html";
    }
})