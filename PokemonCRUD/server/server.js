var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var db = require('./lib/mysql.js');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", null); // update to match the domain you will make the request from set to null because of origin
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});



function processParams (req) {
  return Object.assign({},req.body,req.params, req.query)
}

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.get('/', function (req, res) {
  db.pokemonCard.findAll()
  .then( pokemonCards => {
    res.json(pokemonCards);
  }).catch(function(error) {
    console.log(error);
    res.status(400).send({
      message:"Ocurrio un error"
    })
  })
})


app.get('/:pokemonName', function (req, res) {
  var pokemonName = req.params.pokemonName;
  db.pokemonCard.findOne({
    where: {
      name: pokemonName
    }
  }).then(function (pokemonCard) {
    res.send(pokemonCard);
  }).catch(function (error) {
      console.log(error)
      res.status(400).send({
        message: 'The card doesn´t exist'
  })
})
})

app.post('/',jsonParser,function(req,res) {
   console.log(req.body);
   const pokemonCard = req.body;
   db.pokemonCard.create(pokemonCard)
      .then( pokemonCard => {
        res.json(pokemonCard);
      })
      .catch(function(error){
        console.log(error);
        res.status(400).send({
          message:"No se pudo crear la carta"
        })
      })
})  

app.put('/updateCard',jsonParser,function(req,res) {
  console.log(req.body);
  var pokemonCard = req.body;
  db.pokemonCard.update(
    {
      name:pokemonCard.name,
      code:pokemonCard.code,
      weight:pokemonCard.weight,
      description:pokemonCard.description,
      type:pokemonCard.type,
      class:pokemonCard.class
    },
    {
      where:{ id:pokemonCard.id}
    }
  ).then(pokemonCard => {
    res.json(pokemonCard)
  }).catch(function(error){
    console.log(error)
    res.status(400).send({
      message:"No se pudo actualizar la carta"
    })
  })

})

app.delete('/:pokemonId',function(req,res){
  var pokemonId = req.params.pokemonId;
  db.pokemonCard.destroy({
    where: {
      id:pokemonId
    }
  }).then(function (destroyedCard){
    res.send(true);
  }).catch(function(error){
    console.log(error);
    res.status(400).send({
      message:"No se pudo eliminar la carta"
    })
  })
})



app.listen(3000);