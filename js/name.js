document.addEventListener("DomContentLoad", function () {
    let miStorage = window.localStorage;
    if (miStorage.getItem('nombreUsuario') !== '') {
        let nombre = miStorage.getItem('nombreUsuario');
        let id = document.getElementById('userimpress');
        id.innerHTML = nombre;
    }
    else {
        window.location.href = "index.html";
    }
})