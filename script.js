let currentPokemon = ``;
let allPokemon = ``;


async function showPokemonList() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=905`;
    let response = await fetch(url);
    let allPokemons = await response.json();
    allPokemon = await allPokemons['results'];

    console.log(allPokemon);
    renderPokedexList()
}

function renderPokedexList() {
    document.getElementById('pokemon-list').innerHTML = '';
    for (let i = 0; i < allPokemon.length; i++) {
        const pokemon = allPokemon[i];
        document.getElementById('pokemon-list').innerHTML += `<div class="select" onclick="showPokemon('${pokemon['name']}')">#${i+1} ${pokemon['name']}</div>`;
    }
}

async function showPokemon(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    renderPokedex();
}

function renderPokedex() {
    document.getElementById(`pokemon-name`).innerHTML = currentPokemon[`name`];
    document.getElementById('abilitys').innerHTML = '';
    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        const ability = currentPokemon['abilities'][i];
        document.getElementById('abilitys').innerHTML += `<div>${ability['ability']['name']}</div>`
    }
}