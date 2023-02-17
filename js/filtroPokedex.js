/*Metodos para la carga del filtro de las pokedex disponibles*/
let pokedexFiltro = `<option>----</option>`
async function cargarPokedex(url){
    await fetch(url)
    .then(data => data.json())
    .then(resp =>{
        let cantidad = resp.count 
        
        recuperarPodekedex(cantidad, url)
    })
}

function recuperarPodekedex(cant, url){
    for(let i = 1; i <= cant; i++){
        if(i != 10){
            let pokedexUrl = url + i
            fetch(pokedexUrl)
                .then(data => data.json())
                .then(resp =>{
                    let nameEs = recuperarNombre(resp.names)
                    crearFiltroPokedex(pokedexUrl, nameEs)
                    filtroPokedex.innerHTML = pokedexFiltro
                })
        }
    }
}

function recuperarNombre(names){
    let finName = names.find(element => element.language.name === "es")
    if (finName){
        return finName
    }
    return names.find(element => element.language.name === "en")
}

function crearFiltroPokedex(pokedexUrl, nameEs){
    pokedexFiltro += `<option value=${pokedexUrl}>${nameEs.name}</option>`
    return pokedexFiltro
}

/*Metodo para la carga de los datos de la pokedex */
async function cargarContenidoFiltroPokedex(url){
    await fetch(url)
    .then(data => data.json())
    .then(async resp =>{
        let pokemons = resp.pokemon_entries;
        let cantidad = pokemons.length
        await pokemons.forEach(async pokemon => {
             await cargarPokemonPokedex(pokemon.pokemon_species.url, cantidad)
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

async function cargarPokemonPokedex(pokemonUrl, cantidad){
    await fetch(pokemonUrl)
    .then(data => data.json())
    .then(async resp => {
        pokemonsArray.push(resp)
        if(pokemonsArray.length === cantidad){
            let pokemonsOrder = pokemonsArray.sort((a,b) => a.id - b.id)
            pokemonsOrder.forEach(async pokemon =>{
                await insertarPokemonPokedex(pokemon)
            })
        }
    })
}

async function insertarPokemonPokedex(pokemon){
    let url = pokemon.varieties.find(pokemon => pokemon.is_default === true)
    await fetch(url.pokemon.url)
    .then(data => data.json())
    .then(async resp =>{
        let pokemonInsert = {
            id:pokemon.id,
            name: recuperarNombre(pokemon.names).name,
            image: resp.sprites.other["official-artwork"].front_default
        }
        aniadirPokemon(pokemonInsert)
        contenedor.innerHTML = contenido
    })
}

function aniadirPokemon(pokemon){ 
    
    let pokemonCard = `<div id="${pokemon.id}" class="card-pokemon">
                        <div class="card-header">
                            <p>#${pokemon.id}</p>
                        </div>
                        <div class="card-body">
                            <img src="${pokemon.image}" alt="${pokemon.name}">
                        </div>
                        <div class="card-footer">
                            <p>${pokemon.name}</p>
                        </div>
                       </div>
                        `;
    contenido += pokemonCard
  
}