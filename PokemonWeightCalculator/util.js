

var totalWeight = 0;
var pokemons = [];
let getPokemonPromise = (pokemonName) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokemonName}`, true);
    req.onreadystatechange = (req_event) => {
      if (req.readyState == 4) {
        if (req.status == 200) {
          return resolve(req.response);
        } else {
          showErrorMessage(pokemonName)
          return reject(req.reject);
        }
      }
    };
    req.send(null);
  });
};

function addElement(name){
  var itemName = document.getElementById('item-name');
  var pokemon = null;
  if(!name) {
    itemName.className = "error";
    return;
  }
  itemName.className= "";
  getPokemonPromise(name.toLowerCase()).then(result => {
    pokemon = JSON.parse(result);
    if(!pokemons.some(x => x == pokemon.name))
    addPokemon(pokemon);
  })

  
}
function addPokemon(pokemon) {
  var node = document.createElement('li');
  node.className ="added-item";
  node.innerText = "Name: " + pokemon.name;
  pokemons.push(pokemon.name);
  // sprites.front_default
  var firstNode = document.createElement('img');
  firstNode.src = pokemon.sprites.front_default;
  firstNode.className ="image";
  node.appendChild(firstNode);
  var secondnode = document.createElement('button')
  secondnode.innerText = "remove";
  secondnode.className="remove-item";
  secondnode.addEventListener('click', function(){
    remove_item(node,pokemon.weight * -1,pokemon.name);
});
  node.appendChild(secondnode);

  var parent = document.getElementById('list');
  parent.appendChild(node);
  clean();
  calculateTotal(pokemon.weight);
}

function clean(){
  var itemName = document.getElementById('item-name');
  itemName.value ="";
}

function calculateTotal(weight) {

  var total = document.getElementById('total');
  totalWeight+=weight;
  total.innerText = totalWeight.toString() + " kg";


}

function showErrorMessage(pokemonName) {
  var errorMessage = document.getElementById('error-message');
  errorMessage.innerText = "The pokemon " + pokemonName +  " does not exist :("
  errorMessage.className ="visible error";
  setTimeout(HideErrorMessage,10000)
}
function HideErrorMessage() {
  var errorMessage = document.getElementById('error-message');
  errorMessage.className ="invisible error";
}
let remove_item  = (parent,weight,pokemonName) => {
  var index = pokemons.indexOf(pokemonName);
  pokemons.splice(index,1);
  parent.remove();
  calculateTotal(weight);
}

