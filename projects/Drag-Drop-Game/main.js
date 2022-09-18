let CARDS = 8;

//Peticion de pokemones al api

for (let i = 1; i <= CARDS; i++) {
  let id = getRandomId(200)
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

  let names = document.querySelectorAll('.name')
  let wrongMSG = document.querySelector('.wrong');
  let point = 0;

  names = [...names]
  names.forEach(name =>{
    name.addEventListener('dragover', (e)=>{
      e.preventDefault(); //Previniendo el dragover, para que funcione el drop
      // console.log('dragover');
    })
    name.addEventListener('drop', (e)=>{

      const draggableElementData = e.dataTransfer.getData('text');
      let pokemonElement = document.querySelector(`#${draggableElementData}`)

      console.log(draggableElementData);
      console.log(pokemonElement);
      if(e.target.innerText == draggableElementData){
        console.log('Si son iguales')
        point++;
        e.target.innerHTML='';
        e.target.appendChild(pokemonElement);
        wrongMSG.innerHTML = 'Acertado!'

        if(point == CARDS){
          draggableElements.innerHTML = `<p class="win">Ganaste!</p>`
        }
      }else{
        console.log('No son iguales');
        wrongMSG.innerHTML = 'Ups!'
      }
    })
  })
}
