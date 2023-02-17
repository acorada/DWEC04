'use strict'
/*Constantes*/
const urlInicial = "https://pokeapi.co/api/v2/pokemon/"
const filterTipoUrl = "https://pokeapi.co/api/v2/type/"
const filterPokedexUrl = "https://pokeapi.co/api/v2/pokedex/"
const urlPokemonSpecies = "https://pokeapi.co/api/v2/pokemon-species/"
/*Selectores*/
let contenedor = document.querySelector(".contenido")
let paginacion = document.querySelector(".paginacion")
let filtro = document.querySelector(".filtroTipo")
let filtroPokedex = document.querySelector(".filtroPokedex")
let tarjeta = document.querySelector(".tarjeta")

/*Inicio de carga*/
let contenido = ''
let pokemonsArray = []
let pokemonActive = {}
cargarPokedex(filterPokedexUrl)
cargarFiltroTipo(filterTipoUrl)
cargarContenido(urlInicial)

/*Funcionalidades JQuery*/
$(document).ready(function () {

    $(".logo").click(function (e) {
        e.preventDefault()
        limpiarDom()
        cargarContenido(urlInicial)
    })

    $(".prevpage, .nextpage").click(function (e) {
        e.preventDefault()
        limpiarDom()
        let url = this.href
        cargarContenido(url)
    })

    $(".prevtarget, .nexttarget").click(function (e) {
        e.preventDefault()
        limpiarDom()
        let url = this.href
        cargarDatosPokemon(url)
    })

    $(".filtroTipo").change(function (e) {
        e.preventDefault()
        limpiarDom()
        let url = this.value
        cargarContenidoFiltroTipo(url)
    })

    $(".filtroPokedex").change(function (e) {
        e.preventDefault()
        limpiarDom()
        let url = this.value
        cargarContenidoFiltroPokedex(url)
    })

    $(".contenido").click(function (e) {
        e.preventDefault()
        limpiarDom()
        let name = e.target.innerHTML
        if (name === "") {
            name = e.target.alt
        }
        cargarDatosPokemon(urlPokemonSpecies + name.toLowerCase())
    })

    $("#search").keypress(function (e) {
        if (e.which == 13) {
            limpiarDom()
            let search = $('#search').val();
            cargarDatosPokemon(urlPokemonSpecies + search.toLowerCase())
            $('#search').val("");
        }
    })

    $(".aniadirFav").click(function (e) {
        let pokemonFavs = JSON.parse(localStorage.getItem("pokemon")) || [];

        pokemonFavs.push(pokemonActive)
        localStorage.setItem("pokemon", JSON.stringify(pokemonFavs))

        $(".eliminarFav").show()
        $(".aniadirFav").hide()
    })

    $(".eliminarFav").click(function (e) {
        let pokemonFavs = JSON.parse(localStorage.getItem("pokemon")) || [];
        let pokemonFavsTemp = []
        pokemonFavs.forEach(pokemon => {
            if (pokemon.id != pokemonActive.id) {
                pokemonFavsTemp.push(pokemon)
            }
        })
        localStorage.removeItem("pokemon")
        localStorage.setItem("pokemon", JSON.stringify(pokemonFavsTemp))

        $(".eliminarFav").hide()
        $(".aniadirFav").show()
    })

    $(".botonFav").click(function () {
        limpiarDom()
        cargarFavoritos()
    })

});

/**Limpia el Dom y muestra spinner de cargando */
function limpiarDom() {
    tarjeta.innerHTML = ''
    contenedor.innerHTML = ''
    contenido = ''
    pokemonsArray = []
    $(".loading").show()
}