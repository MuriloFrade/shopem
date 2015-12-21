// fake data:
// var shoppingLists = [
//   {
//     title: 'Supermarket',
//     itens: [
//       {
//         title: '12 oranges',
//         detail: 'Should prefer buy oranges from Brazil',
//         wasPurchased: false,
//       },
//       {
//         title: '1 brown bread',
//         detail: '',
//         wasPurchased: false,
//       },
//       {
//         title: '2 Axe Deodorants',
//         detail: 'Should prefer aerosol types',
//         wasPurchased: false,
//       },
//       {
//         title: '12 oranges',
//         detail: 'Should prefer buy oranges from Brazil',
//         wasPurchased: false,
//       },
//     ],
//     ownerId: '123123',
//     sharedWith: []
//   }
// ];

var ShoppingList = require('../models/shopping-list');


function getAllFromUser (userId, callback){
  callback(null, shoppingLists);
}
function add (item, callback){
  var shoppingList = new ShoppingList(item);
  shoppingList.save(function(err, shoppingList){
    if(err)
      callback(err);

    callback(null, shoppingList);
  });
}
function get (item, callback){
  callback(null, item);
}

function update (item, callback){
  callback(null, item);
}

function remove (item, callback){
  callback(null, item);
}

function addItem (item, callback){
  callback(null, item);
}
function getItem (item, callback){
  callback(null, item);
}

function updateItem (item, callback){
  callback(null, item);
}

function removeItem (item, callback){
  callback(null, item);
}

function markItemAsPurchased (item, callback){
  callback(null, item);
}

module.exports = (function(){
  return {
    getAllFromUser:      getAllFromUser,
    add:                  add,
    get:                  get,
    update:               update,
    remove:               remove,
    addItem:              addItem,
    getItem:              getItem,
    updateItem:           updateItem,
    removeItem:           removeItem,
    markItemAsPurchased:  markItemAsPurchased
  };
})();
