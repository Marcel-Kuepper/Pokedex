let currentPokemon = ``;
let allPokemon = ``;
let selectedPokemon = ``;
const stats = ["hp", "attack", "defense", "specAttack", "specDefense", "speed"];


async function showPokemonList() {
    for (let i = 1; i < 906; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        renderPokedexList(i)
    }

}

function renderPokedexList(i) {
    document.getElementById('pokemon-list').innerHTML += pokemonTemplate(i);
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
    document.getElementById('pokedex').innerHTML = pokedexTemplate();
    for (let i = 0; i < selectedPokemon['abilities'].length; i++) {
        let ability = selectedPokemon['abilities'][i];
        document.getElementById('abilities').innerHTML += `${ability['ability']['name']}<br>`
    }
    if (selectedPokemon['types'].length > 1) {
        document.getElementById(`pokeType`).innerHTML += `<p class="${selectedPokemon["types"]["1"]["type"]["name"]}">${selectedPokemon["types"]["1"]["type"]["name"]}</p>`
    }
}

function closePokedex() {
    document.getElementById('pokedex').innerHTML = '';
}

function calculateStats(){
    calculateHealth();
    calculateAttack();
    calculateDefense();
    calculateSpAttack();
    calculateSpDefense();
    calculateSpeed();
}

function calculateHealth() {
    let health = selectedPokemon['stats'][0]['base_stat'];
    let hpPercent = (health / 255) * 100;
    renderCircle(hpPercent, 0);
}

function calculateAttack() {
    let attack = selectedPokemon['stats'][1]['base_stat'];
    let attackPrecent = (attack / 181) * 100;
    renderCircle(attackPrecent, 1);
}

function calculateDefense() {
    let defense = selectedPokemon['stats'][2]['base_stat'];
    let defensePercent = (defense / 230) * 100;
    renderCircle(defensePercent, 2);
}

function calculateSpAttack() {
    let spAttack = selectedPokemon['stats'][3]['base_stat'];
    let spAttackPercent = (spAttack / 173) * 100;
    renderCircle(spAttackPercent, 3);
}

function calculateSpDefense() {
    let spDefense = selectedPokemon['stats'][4]['base_stat'];
    let spDefensePercent = (spDefense / 230) *100;
    renderCircle(spDefensePercent, 4);
}

function calculateSpeed() {
    let speed = selectedPokemon['stats'][5]['base_stat'];
    let speedPercent = (speed / 200) * 100;
    renderCircle(speedPercent, 5)
}

function renderCircle(percent, index) {
    let output = document.getElementById(`${stats[index]}`);
    let output2 = document.getElementById(`${stats[index]}-text`);
    output.style = `background-image: conic-gradient(#f01214 ${percent.toFixed(
      0
    )}%, #fff5ef 0)`;
    output2.innerHTML = selectedPokemon['stats'][index]['base_stat'];
  }

function listMoves() {
    document.getElementById('moves').innerHTML = '';
    if (selectedPokemon['moves'].length == 0){
            document.getElementById('moves').innerHTML += `<div class="move"><h2>No Moves found for this Pokemon</h2></div>`;
        } else {
        for (let i = 0; i < selectedPokemon['moves'].length; i++) {
            let move = selectedPokemon['moves'][i]['move']['name'];
            document.getElementById('moves').innerHTML += `<div class="move">${move}</div>`;
            }
    }
}

  function togglePokeTabs(index) {
    if (index == 0) {
      toggleBase();
    } else if (index == 1){
        toggleMove();
    } else if (index == 2){
        toggleStats();
    }
  }

  function toggleBase() {
    document.getElementById("pokeTabStat").style = "background-color: white";
    document.getElementById("pokeTabMove").style = "background-color: white";
    document.getElementById("pokeTabBase").style = "background-color: transparent";
    document.getElementById("pokeBase").classList.remove("d-none");
    document.getElementById("pokeMove").classList.add("d-none");
    document.getElementById("pokeStats").classList.add("d-none");
  }

  function toggleMove() {
    document.getElementById("pokeTabStat").style = "background-color: white";
    document.getElementById("pokeTabMove").style = "background-color: transparent";
    document.getElementById("pokeTabBase").style = "background-color: white";
    document.getElementById("pokeBase").classList.add("d-none");
    document.getElementById("pokeMove").classList.remove("d-none");
    document.getElementById("pokeStats").classList.add("d-none");
    listMoves();
  }

  function toggleStats() {
    document.getElementById("pokeTabStat").style ="background-color: transparent";
    document.getElementById("pokeTabMove").style ="background-color: white";
    document.getElementById("pokeTabBase").style = "background-color: white";
    document.getElementById("pokeBase").classList.add("d-none");
    document.getElementById("pokeMove").classList.add("d-none");
    document.getElementById("pokeStats").classList.remove("d-none");
    calculateStats();
  }

  function next(index) {
    if (index == 905){
    selectedPokemon['id'] = 1;
    } else {
        selectedPokemon['id']++;
    }
    showPokemon(selectedPokemon['id'])
  }

  function back(index) {
    if (index == 1) {
        selectedPokemon['id'] = 905;
    } else {
        selectedPokemon['id']--;
    }
    showPokemon(selectedPokemon['id'])
  }

  function pokemonTemplate(i) {
    return `
    <div class="select bg${currentPokemon["types"]["0"]["type"]["name"]}" onclick="showPokemon('${currentPokemon['name']}')">
    <div class="pokemon-info">
    <div class="pokename"><b>#${i} ${currentPokemon["name"].charAt(0).toUpperCase() + currentPokemon["name"].slice(1)}</b></div>
    <div id="types${i}" class="types"><div class="${currentPokemon["types"]["0"]["type"]["name"]}">${currentPokemon["types"]["0"]["type"]["name"]}</div></div>
    </div>
    <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
    <img src="img/pokemon-bg.png" class="cardbg">
    </div>`
  }

  function pokedexTemplate() {
    return `<div id="pokedexCard" class="bg-opacity-25 inactive">
    <div class="bg-dark bg-opacity-25 inactive" onclick=closePokedex()></div>
    <div id="pokeCard" class="card bg${selectedPokemon["types"]["0"]["type"]["name"]}" style="width: 27rem;">
        <div class="pokeCardHead">
            <h3 id="pokeName" class="namePokemon">${
                selectedPokemon["name"].charAt(0).toUpperCase() +
                selectedPokemon["name"].slice(1)
                }</h3>
            <h3 id="pokemonId" class="pokemonId">#${selectedPokemon["id"]}</h3>
        </div>
        <button class="carousel-dark carousel-control-prev button-upgrade" type="button"
            data-bs-target="#carouselExampleDark" data-bs-slide="prev" onclick=back(${selectedPokemon['id']})>
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-dark carousel-control-next button-upgrade" type="button"
            data-bs-target="#carouselExampleDark" data-bs-slide="next" onclick=next(${selectedPokemon['id']})>
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        <img id="pokeImg" class="pokeImg" src=${selectedPokemon["sprites"]["other"]["official-artwork"]["front_default"]
            } />
        <img class="cardbg1" src="./img/pokemon-bg.png ">

        <!-- About Card -->
        <div id="pokeBase" class="pokeBase" style="border-color: #3a7036">
            <div class="pokeType" id="pokeType">
                <p class="${selectedPokemon["types"]["0"]["type"]["name"]}">${
                    selectedPokemon["types"]["0"]["type"]["name"]
                    }</p>
            </div>
            <div class="pokeBody">
                <div class="text-secondary">
                    <h3 id="abilities"></h3>
                    <p>Abilities</p>
                </div>
                <div id="pokeFrame" class="border-end border-start border-3 text-secondary"
                    style="border-color: #000000 !important">
                    <h3 id="pokeHeight">${(selectedPokemon["height"] / 10).toFixed(1)} m</h3>
                    <p>Height</p>
                </div>
                <div class="text-secondary">
                    <h3 id="pokeWeight">${(selectedPokemon["weight"] / 10).toFixed(
                        1
                        )} kg</h3>
                    <p>Weight</p>
                </div>
            </div>
        </div>

        <!-- Moves Card -->
        <div id="pokeMove" class="pokeBase d-none" style="border-color: #3a7036">
            <div class="pokeBody">
                <div class="text-secondary">
                    <h2>Moves</h2>
                    <div id="moves"></div>
                </div>
            </div>
        </div>

        <!-- Base Stats card -->
        <div id="pokeStats" class="pokeBase d-none" style="border-color: #3a7036">
            <div class="container">
                <div class="circle-name">
                    <div id="hp" class="circle" style="
            background-image: conic-gradient(#f01c14 100%, #fff5ef 0);
          ">
                        <div class="inner-circle">
                            <span id="hp-text">100%</span>
                        </div>
                    </div>
                    <p>HP</p>
                </div>
                <div class="circle-name">
                    <div id="attack" class="circle" style="
            background-image: conic-gradient(#f01c14 100%, #fff5ef 0);
          ">
                        <div class="inner-circle">
                            <span id="attack-text">100%</span>
                        </div>
                    </div>
                    <p>Attack</p>
                </div>
                <div class="circle-name">
                    <div id="defense" class="circle" style="
            background-image: conic-gradient(#f01c14 100%, #fff5ef 0);
          ">
                        <div class="inner-circle">
                            <span id="defense-text">100%</span>
                        </div>
                    </div>
                    <p>Defense</p>
                </div>
                <div class="circle-name">
                    <div id="specAttack" class="circle" style="
            background-image: conic-gradient(#f01c14 100%, #fff5ef 0);
          ">
                        <div class="inner-circle">
                            <span id="specAttack-text">100%</span>
                        </div>
                    </div>
                    <p>Spec. Attack</p>
                </div>
                <div class="circle-name">
                    <div id="specDefense" class="circle" style="
            background-image: conic-gradient(#f01c14 100%, #fff5ef 0);
          ">
                        <div class="inner-circle">
                            <span id="specDefense-text">100%</span>
                        </div>
                    </div>
                    <p>Spec. Defense</p>
                </div>
                <div class="circle-name">
                    <div id="speed" class="circle" style="
            background-image: conic-gradient(#f01c14 100%, #fff5ef 0);
          ">
                        <div class="inner-circle">
                            <span id="speed-text">100%</span>
                        </div>
                    </div>
                    <p>Speed</p>
                </div>
            </div>
        </div>
        <div class="pokeTabs">
            <div id="pokeTabBase" style="border-color: #3a7036; background-color: transparent"
                onclick="togglePokeTabs(0)">
                <h3>About</h3>
            </div>
            <div id="pokeTabMove" style="border-color: #3a7036; background-color: white" onclick="togglePokeTabs(1)">
                <h3>Moves</h3>
            </div>
            <div id="pokeTabStat" style="border-color: #3a7036; background-color: white" onclick="togglePokeTabs(2)">
                <h3>Base Stats</h3>
            </div>
            
        </div>
    </div>
</div>`
  }
  /**/
  /*<div id="pokeTabStat" style="border-color: #3a7036; background-color: white" onclick="togglePokeTabs(2)">
                <h3>Base Stats</h3>
            </div>*/