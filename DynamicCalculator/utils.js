
function addElement(name,price){
  var itemValue = document.getElementById('item-value');
  var itemName = document.getElementById('item-name');
  if(!price || isNaN(parseFloat(price))) {
    itemValue.className = "error";
    return;
  };
  if(!name) {
    item.Name.className = "error";
  }
  itemName.className= "";
  itemValue.className="";

  var node = document.createElement('li');
  node.className ="added-item";
  node.innerText = `Name: ${name} Price: $ ${price} `

  var secondnode = document.createElement('button')
  secondnode.innerText = "remove";
  secondnode.className="remove-item";
  secondnode.addEventListener('click', function(){
    remove_item(node,parseFloat(price) * -1);
});
  node.appendChild(secondnode);

  var parent = document.getElementById('list');
  parent.appendChild(node);
  clean();
  calculateTotal(price);
}

function clean(){
  var itemName = document.getElementById('item-name');
  var itemValue = document.getElementById('item-value');

  itemName.value ="";
  itemValue.value= "";
}

function calculateTotal(number) {

  var total = document.getElementById('total');
  var prevValueClean = total.innerText.substring(1,total.innerText.length);
  var prevValue = parseFloat(prevValueClean); 
  var newValue = prevValue + parseFloat(number);
  console.log(prevValue);
  console.log(newValue);
  total.innerText = "$" + newValue.toString();

}
let remove_item  = (parent,price) => {
  parent.remove();
  calculateTotal(price);
}