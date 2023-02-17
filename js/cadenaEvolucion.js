/**Funcion para la carga de evoluciones  */
async function cargarEvoluciones(url){
    await fetch(url)
    .then(data => data.json())
    .then(resp =>{
        limpiarDom()
        let urlsCadena = []
        urlsCadena.push(resp.chain.species.url)

        let tieneEvoluciones = resp.chain.evolves_to
        if(tieneEvoluciones.length > 0){
            tieneEvoluciones.forEach(evolution => {
                let tieneMasEvoluciones = evolution.evolves_to
                urlsCadena.push(evolution.species.url)
                if(tieneMasEvoluciones.length > 0){
                    tieneMasEvoluciones.forEach(evo =>{
                        urlsCadena.push(evo.species.url)
                    })
                }
            });
        }

        let cantidad = urlsCadena.length
        urlsCadena.forEach(async url =>{
            await cargarPokemonPokedex(url, cantidad)
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