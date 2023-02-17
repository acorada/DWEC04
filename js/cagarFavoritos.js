/**Funciones para la muestra de los Favoritos */
function cargarFavoritos(){
    let favoritos = JSON.parse(localStorage.getItem("pokemon")) || [];
    
    if(favoritos.length > 0){
        cargarContenidoFav(favoritos)
        contenedor.innerHTML = contenido
    } else {
        contenedor.innerHTML = `<h1>Aún no tiene favoritos en su lista</h1>`
    }
    $(".prevpage").hide()
    $(".nextpage").hide()
    $(".prevtarget").hide()
    $(".nexttarget").hide()
    $(".loading").hide()
    $(".eliminarFav").hide()
    $(".aniadirFav").hide()
}

function cargarContenidoFav(favoritos){
    favoritos.forEach(fav => {
        let pokemonCard = `<div id="${fav.id}" class="card-pokemon">
                        <div class="card-header">
                            <p>#${fav.id}</p>
                        </div>
                        <div class="card-body">
                            <img src="${fav.image}" alt="${fav.name}">
                        </div>
                        <div class="card-footer">
                            <p>${fav.name}</p>
                        </div>
                       </div>`
        contenido += pokemonCard

    })
}