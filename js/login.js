//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function onSignIn(){
    window.location.href ="hme.html";
}

/*document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("ingresar-bottom").addEventListener("click", 
    function(event){
        balidacion();
    })   
});

function validacion(){
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    if((user !=="") && (pass !=="") && (user.length<=6 && user.length>=15)){
       window.location.href="home.html"; 
    }
    
}*/