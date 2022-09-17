let CARDS = 6;

//Peticion de pokemones al api

for (let i = 1; i <= CARDS; i++) {
  let id = getRandomId(150)
  searchPokemonById(id)
}

function getRandomId(max){
  return Math.floor(Math.random()*max)+1 
}

let pokemoSearched = [];
let namesPokemon = [];
let draggableElements = document.querySelector('.draggable-elements');
let droppableElements = document.querySelector('.droppable-elements');

async function searchPokemonById(id){
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  const data = await res.json()

  //Arreglos con imagenes
  pokemoSearched.push(data)
  
  //Arreglos con nombres
  namesPokemon.push(data.name);
  namesPokemon = namesPokemon.sort(()=> Math.random()-0.5)
  

  //Dibujando pokemones
  draggableElements.innerHTML = '';
  pokemoSearched.forEach(pokemon =>{
    let namePokemon = pokemon.name;
    let srcPokemon = pokemon.sprites.other['official-artwork'].front_default;
    draggableElements.innerHTML += `
    <div class="pokemon">
        <img id="${namePokemon}" draggable="true" class="image" src="${srcPokemon}" alt="${namePokemon}">
    </div>
    `;
  })

  //Dibujando nombres de pokemones
  droppableElements.innerHTML = '';
  namesPokemon.forEach(name =>{

    droppableElements.innerHTML += `
    <div class="name">
        <p>${name}</p>
    </div>
    `;
  })

  let pokemones = document.querySelectorAll('.image');
  pokemones = [...pokemones]
  pokemones.forEach(pokemon=>{
    pokemon.addEventListener('dragstart', e=>{
      e.dataTransfer.setData('text', e.target.id)
    })
  })
}
