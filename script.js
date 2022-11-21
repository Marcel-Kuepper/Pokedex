let currentPokemon = ``;
let allPokemon = ``;
let selectedPokemon = ``;


async function showPokemonList() {
    for (let i = 1; i < 906; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        renderPokedexList(i)
    }

}

function renderPokedexList(i) {
    document.getElementById('pokemon-list').innerHTML += `
        <div class="select bg${currentPokemon["types"]["0"]["type"]["name"]}" onclick="showPokemon('${currentPokemon['name']}')">
        <div class="pokemon-info">
        <div class="pokename"><b>#${i} ${currentPokemon["name"].charAt(0).toUpperCase() + currentPokemon["name"].slice(1)}</b></div>
        <div id="types${i}" class="types"><div class="${currentPokemon["types"]["0"]["type"]["name"]}">${currentPokemon["types"]["0"]["type"]["name"]}</div></div>
        </div>
        <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
        </div>`;
    if (currentPokemon['types'].length > 1) {
        document.getElementById(`types${i}`).innerHTML += `<div class="${currentPokemon["types"]["1"]["type"]["name"]}">${currentPokemon["types"]["1"]["type"]["name"]}</div>`
    }
}

async function showPokemon(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    selectedPokemon = await response.json();

    renderPokedex();
}

function renderPokedex() {
    document.getElementById(`pokemon-name`).innerHTML = selectedPokemon[`name`];
    document.getElementById(`pokemon-img`).innerHTML = `<img src="${selectedPokemon['sprites']['other']['official-artwork']['front_default']}">`
    document.getElementById('abilitys').innerHTML = '';
    for (let i = 0; i < selectedPokemon['abilities'].length; i++) {
        const ability = selectedPokemon['abilities'][i];
        document.getElementById('abilitys').innerHTML += `<div>${ability['ability']['name']}</div>`
    }
}