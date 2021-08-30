document.getElementById("searchbox").addEventListener("keyup", function(e){
    let results = document.getElementById("results");
    let searchbox = document.getElementById("searchbox").value.toLowerCase();
    
    if(searchbox.value !=""){
        results.innerHTML ="";
        fetch(PRODUCTS_URL)
        .then(response => response.json())
        .then(productos => {
            for(let products of productos){
                let nombre = products.name.toLowerCase();
                if(nombre.indexOf(searchbox) != -1){
                    results.innerHTML += `<a href="" class="list-group-item list-group-item-action">
                        <div class="row">
                            <div class="col-3">
                                <img src="` + products.imgSrc + `" alt="` + products.name + `" class="img-thumbnail"> 
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ products.name + `</h4>
                                <small class="text-muted">` + products.currency + " " + products.cost + `</small>
                            </div>
                                <p class="mb-1" style="text-align: left;">` + products.description + `</p>
                                <p class="" style="text-align: left;">Vendidos ` + products.soldCount + `</p>
                            </div>
                        </div>
                        </a> 
                        `;
                    results.style.display = "block";
                }
            }
            }).catch(error => alert(error))
        }else{
            results.innerHTML="";
            results.style.display = "none";
        }
    function buscarEnListaResultado(articulo){
        document.getElementById("results").style.display = "none";
        document.getElementById("searchbox").value = articulo
        fetch(PRODUCTS_URL)
        .then(response => response.json())
        .then(productos => {
            for(let producto of productos){
                results.innerHTML="";
                let nombre = producto.name.toLowerCase();
                if(results.value != ""){
                    if(nombre.indexOf(results) != -1){
                        results.innerHTML += `<a href="" class="list-group-item list-group-item-action">
                            <div class="row">
                            <div class="col-3">
                                <img src="` + producto.imgSrc + `" alt="` + producto.name + `" class="img-thumbnail"> 
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ producto.name + `</h4>
                                <small class="text-muted">` + producto.currency + " " + producto.cost + `</small>
                            </div>
                                <p class="mb-1" style="text-align: left;">` + producto.description + `</p>
                                <p class="" style="text-align: left;">Vendidos ` + producto.soldCount + `</p>
                            </div>
                        </div>
                        </a> 
                        `;}
                        
                    }else{
                        buscarEnListaResultado() = "";
                    }}
            }) .catch(error => alert(error))
            }

    function buscarConBoton(){
    let buscar = document.getElementById("searchbox").value.toLowerCase();
    results.innerHTML = "";

    fetch(PRODUCTS_URL)
    .then(response => response.json())
    .then(productos => {
        for(let products of productos){
            if(searchbox.value != ""){
                if(products.name.toLowerCase().incluides(buscar)){
                    htmlContentToAppend.innerHTML += `<a href="" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + products.imgSrc + `" alt="` + products.name + `" class="img-thumbnail"> 
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ products.name + `</h4>
                        <small class="text-muted">` + products.currency + " " + products.cost + `</small>
                    </div>
                        <p class="mb-1" style="text-align: left;">` + products.description + `</p>
                        <p class="" style="text-align: left;">Vendidos ` + products.soldCount + `</p>
                    </div>
                </div>
                </a> 
                `;}
            }else{
                results.style.display = "none";
            }}
    }) .catch(error => alert(error))
}
})

