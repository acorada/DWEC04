/**Funciones para la recopilacion de datos completos y cargar tarjeta de informacion completa */
async function cargarDatosPokemon(url){
    await fetch(url)
    .then(data => data.json())
    .then(async resp => {
        await recuperarDatosCompletos(resp)
        if(resp.id - 1 < 1){
            $(".prevpage").hide()
            $(".prevtarget").hide()
        } else {
            $(".prevpage").hide()
            $(".prevtarget").attr("href", urlPokemonSpecies + (resp.id - 1)).show()
        }
        $(".nextpage").hide()
        $(".nexttarget").attr("href", urlPokemonSpecies + (resp.id + 1)).show()
        $(".loading").hide()
    })
}

async function recuperarDatosCompletos(datosPokemon){
    let url = datosPokemon.varieties.find(pokemon => pokemon.is_default === true)
    await fetch(url.pokemon.url)
    .then(data => data.json())
    .then(resp =>{
        pokemonActive = {}
        let pokemonInsert = {
            id:datosPokemon.id,
            name: recuperarNombre(datosPokemon.names).name,
            image: resp.sprites.other["official-artwork"].front_default,
            evolution_chain: datosPokemon.evolution_chain.url,
            descripcion: recuperarNombre(datosPokemon.flavor_text_entries).flavor_text,
            genero: recuperarNombre(datosPokemon.genera).genus,
            altura: resp.height,
            peso: resp.weight,
            type: resp.types,
            stats: resp.stats,
            color: datosPokemon.color.name
        }
        pokemonActive = pokemonInsert
        cargarCard(pokemonInsert)
        tarjeta.innerHTML = ''
        tarjeta.innerHTML = contenido
        esFavorito(datosPokemon.id)
    })
}

function cargarCard(pokemon){

        let pokemonCard = `<div id="${pokemon.id}" class="pokemon-card">
                            <div class="pokemon-card-header">
                                <p>${pokemon.name}</p>
                                <p class="numero">#${pokemon.id}</p>
                            </div>
                            <div class="pokemon-card-body">
                                <img src="${pokemon.image}" alt="${pokemon.name}">
                            </div>
                            <div class="pokemon-card-footer" style="background-color: ${pokemon.color};">
                                <div class="pokemon-descripcion">
                                    <p>${pokemon.descripcion}</p>
                                </div>
                                <div class="pokemon-data">
                                    <div class="pokemon-stats">
                                        <h3>Stats:</h3>
                                        ${mostrarStats(pokemon.stats)}
                                    </div>
                                    <div class="pokemon-tipos">
                                    <h3>Tipos:</h3>
                                    ${recuperarTipos(pokemon.type)}
                                    </div>
                                    <div class="pokemon-evo">
                                        ${tieneEvolucion(pokemon.evolution_chain)}
                                    </div>
                                </div>
                            </div>
                       </div>`
        contenido = pokemonCard
}

function recuperarTipos(type){
    let tiposText = ''
    type.forEach(tipo => {
        tiposText += `<p>${tipo.type.name}</p>`
    })
    return tiposText
}

function esFavorito(id){
    let pokemonStorage = JSON.parse(localStorage.getItem("pokemon"));
    if(pokemonStorage){
        let esfavorito = false
        pokemonStorage.forEach(pokemon => {
            if(pokemon.id === id){
                esfavorito = true
            }
        })

        if(esfavorito){
            $(".eliminarFav").show()
            $(".aniadirFav").hide()
        } else{
            $(".eliminarFav").hide()
            $(".aniadirFav").show()
        }

    }else{
        $(".eliminarFav").hide()
        $(".aniadirFav").show()
    }
}

function tieneEvolucion(evolutionUrl){
    let evolutionText = ''
    if(evolutionUrl != null){
        evolutionText = `<input type="button" class="pokemon-evolution" onclick="cargarEvoluciones('${evolutionUrl}')" value="Cadena de evolución">`
    }
    
    return evolutionText
}

function mostrarStats(stats){
    let statsText = ''
    stats.map(stat =>{
        statsText += `<p>${stat.stat.name}: ${stat.base_stat}</p>`
    })

    return statsText
}