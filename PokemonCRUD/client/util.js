


let getPokemonPromise = (pokemonName) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.onload = function(data) {
      console.log(req.response);
    }
    req.open("GET", `http://localhost:3000/${pokemonName}`);
    req.onreadystatechange = (req_event) => {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
          return resolve(req.response);
        } else {
          console.log(req);
          showErrorMessage("No se encontro" + pokemonName + " :(")
          return reject(req.reject);
        }
      }
    };
    req.send();
  });
};

let deletePokemonPromise = (pokemonId) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.onload = function(data) {
      console.log(req.response);
    }
    req.open("DELETE", `http://localhost:3000/${pokemonId}`);
    req.onreadystatechange = (req_event) => {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
          return resolve(req.response);
        } else {
          console.log(req);
          showErrorMessage("No se pudo borrar")
          return reject(req.reject);
        }
      }
    };
    req.send();
  });
};

let createPokemonPromise = (pokemon) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.onload = function(data) {
      console.log(req.response);
    }
    req.body = pokemon;
    req.open("POST", `http://localhost:3000/`);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    req.onreadystatechange = (req_event) => {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
          return resolve(req.response);
        } else {
          console.log(req);
          showErrorMessage("No se pudo crear el pokemon")
          return reject(req.reject);
        }
      }
    };
    req.send(JSON.stringify(pokemon))
  });
};


let getPokemonsPromise = () => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.onload = function(data) {
      console.log(req.response);
    }
    req.open("GET", `http://localhost:3000/`);
    req.onreadystatechange = (req_event) => {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
          return resolve(req.response);
        } else {
          console.log(req);
          showErrorMessage("No se encontraron tarjetas")
          return reject(req.reject);
        }
      }
    };
    req.send();
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
    addPokemon(pokemon);
  }).catch(function(error) {
    showErrorMessage("No se encontro la carta " + name)
  })
}

function createCard(name,description,code,type){
  if(!name || !description || !code || !type){
    showErrorMessage("Hay que llenar todos los campos");
    return;
  }
  let pokemon = {name,description,code,type};
  console.log(pokemon);
  createPokemonPromise(pokemon).then(result => {
    console.log(result);
    pokemon = JSON.parse(result);
    addPokemon(pokemon);
  }).catch(function(error) {
    showErrorMessage("No se pudo crear");
  })

}

function addElements(){
  var pokemons = [];
  getPokemonsPromise().then(result => {
    pokemons = JSON.parse(result);
    addPokemons(pokemons);
  }).catch(function(error) {
    showErrorMessage("No se encontraron cartas");
  })
}

function addPokemons(pokemons){
  var parent = document.getElementById('list');
  parent.innerHTML = "";
  for(var i = 0; i < pokemons.length; i++){
    addPokemon(pokemons[i]);
  }
}
function addPokemon(pokemon) {
  var node = document.createElement('li');
  node.className ="added-item";

  var secondNode = document.createElement('ul');
  secondNode.className = "pokeattributes";
  var nodes = [];

  nodes[0] = document.createElement('li');
  nodes[0].innerText = "Name: " + pokemon.name;
  nodes[1] = document.createElement('li');
  nodes[1].innerText = "Description: " + pokemon.description;
  nodes[2] = document.createElement('li');
  nodes[2].innerText = "Code: " + pokemon.code;
  nodes[3] = document.createElement('li');
  nodes[3].innerText = "Type: " + pokemon.type;
  nodes[4] = document.createElement('li');
  nodes[4].innerText = "Weight: " + pokemon.weight;
  nodes[5] = document.createElement('li');

  for(var i = 0; i < nodes.length ; i++) {
    secondNode.appendChild(nodes[i]);
  }
  for(var i = 0; i < nodes.length ; i++) {
    secondNode.appendChild(nodes[i]);
  }


  node.appendChild(secondNode);
  var thirdnode = document.createElement('button')
  thirdnode.innerText = "remove";
  thirdnode.className="remove-item";
  thirdnode.addEventListener('click', function(){
    remove_item(node,pokemon.id);
});
  node.appendChild(thirdnode);

  var parent = document.getElementById('list');
  parent.appendChild(node);
  clean();
}

function clean(){
  var itemName = document.getElementById('item-name');
  itemName.value ="";
}


function showErrorMessage(message) {
  var errorMessage = document.getElementById('error-message');
  errorMessage.innerText = message
  errorMessage.className ="visible error";
  setTimeout(HideErrorMessage,10000)
}
function HideErrorMessage() {
  var errorMessage = document.getElementById('error-message');
  errorMessage.className ="invisible error";
}
let remove_item  = (parent,id) => {
  parent.remove();
  deletePokemonPromise(id).then()

}

