/**Funcion para cargar filtro de tipos */
let typeFiltro = `<option>----</option>`

async function cargarFiltroTipo(url){
    await fetch(url)
    .then(data => data.json())
    .then(resp =>{
        resp.results.forEach(type => {
            crearFiltroTipo(type)
        })
    })

    filtro.innerHTML = typeFiltro
}

function crearFiltroTipo(type){
    
    typeFiltro += `<option value=${type.url}>${type.name}</option>`
    return typeFiltro
}

async function cargarContenidoFiltroTipo(url){
    await fetch(url)
    .then(data => data.json())
    .then(async resp =>{
        let pokemons = resp.pokemon;
        let cantidad = pokemons.length
        await pokemons.forEach(async pokemon => {
             await cargarPokemon(pokemon.pokemon.url, cantidad)
        })

        $(".prevpage").hide()
        $(".nextpage").hide()
        $(".prevtarget").hide()
        $(".nexttarget").hide()
        $(".eliminarFav").hide()
        $(".aniadirFav").hide()
        $(".loading").hide()
    })

}

