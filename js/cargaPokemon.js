/**Funcion para la carga inicial del contenido */
async function cargarContenido(url){
    await fetch(url)
    .then(data => data.json())
    .then(async resp =>{
        let pokemons = resp.results;
        await pokemons.forEach(async pokemon => {
           await cargarPokemon(pokemon.url, 20)
        })
        if(resp.previous === null){
            $(".prevtarget").hide()
            $(".prevpage").hide()
        }else{
            $(".prevtarget").hide()
            $(".prevpage").attr("href", resp.previous).show()
        }
        $(".nexttarget").hide()
        $(".nextpage").attr("href", resp.next).show() 
        $(".eliminarFav").hide()
        $(".aniadirFav").hide()
        $(".loading").hide()
    })

}

async function cargarPokemon(pokeUrl, cantidad){
    await fetch(pokeUrl)
    .then(data => data.json())
    .then(resp => {
        
        pokemonsArray.push(resp)
        if(pokemonsArray.length === cantidad){
            let pokemonsOrder = pokemonsArray.sort((a,b) => a.id - b.id)
            pokemonsOrder.forEach(pokemon =>{
    
                insertarPokemon(pokemon);
            })
            
        }
        contenedor.innerHTML = contenido
        
    })
}

function insertarPokemon(pokemon){ 
    
    let pokemonCard = `<div id="${pokemon.id}" class="card-pokemon">
                        <div class="card-header">
                            <p>#${pokemon.id}</p>
                        </div>
                        <div class="card-body">
                            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
                        </div>
                        <div class="card-footer">
                            <p>${pokemon.name}</p>
                        </div>
                       </div>`
    contenido += pokemonCard
  
}