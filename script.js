let currentPokemon = ``;


async function showPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/ditto`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    renderPokedex();
}

function renderPokedex() {
    document.getElementById(`pokemon-name`).innerHTML = currentPokemon[`name`];
}