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

function ShoppingListDbError(message) {
  this.name = 'ShoppingListDbError';
  this.message = message || 'Error in shopping-list-db.js';
  this.stack = (new Error()).stack;
}
ShoppingListDbError.prototype = Object.create(Error.prototype);
ShoppingListDbError.prototype.constructor = ShoppingListDbError;

function getAllFromUser (userId, callback){
  callback(null, shoppingLists);
}
function add (shoppingList, callback){
  var newShoppingList = new ShoppingList(shoppingList);
  newShoppingList.save(function(err, shoppingList){
    if(err)
      callback(err);

    callback(null, shoppingList);
  });
}
function get (id, callback){
  ShoppingList.findOne({ _id: id }, function (err, shoppingList) {
    if(err)
      callback(err);

    callback(null, shoppingList);
  });
}

function update (shoppingList, callback){
  ShoppingList.findOneAndUpdate({ _id: shoppingList._id }, shoppingList, { new: true }, function(err, result){
    if(err) callback(err, null);
    callback(null, result);
  });
}

function remove (id, callback){
  ShoppingList.remove({_id: id}, function(err){
    if(err) callback(err, item);
    callback(null, null);
  });
}

function addItem (shoppingListId, item, callback){
  get(shoppingListId, function(err, shoppingList){
    if(err) callback(err, null);

    shoppingList.itens.push(item);
    update(shoppingList, function(err, result){
      if(err) callback(err, null);
      callback(null, result);
    });
  });

}

function updateItem (shoppingListId, itemId, item, callback){
  get(shoppingListId, function(err, shoppingList){
    if(err) callback(err, null);

    var itemIdex = shoppingList.itens.findIndex(function (e) {

      if(e._id.equals(itemId)){
        return true;
      }
    });
    if(itemIdex === -1)
      throw new ShoppingListDbError('item not found in collection of items of shoppinglist');

    shoppingList.itens[itemIdex] = item;
    update(shoppingList, function(err, result){
      if(err) callback(err, null);
      callback(null, result);
    });
  });
}

function removeItem (shoppingListId, itemId, callback){
  get(shoppingListId, function(err, shoppingList){
    if(err) callback(err, null);

    var itemIdex = shoppingList.itens.findIndex(function (e) {
      if(e._id.equals(itemId)){
        return true;
      }
    });
    if(itemIdex === -1)
      throw new ShoppingListDbError('item not found in collection of items of shoppinglist');

    shoppingList.itens.splice(itemIdex,1);
    update(shoppingList, function(err, result){
      if(err) callback(err, null);
      callback(null, result);
    });
  });
}

module.exports = (function(){
  return {
    getAllFromUser:      getAllFromUser,
    add:                  add,
    get:                  get,
    update:               update,
    remove:               remove,
    addItem:              addItem,
    updateItem:           updateItem,
    removeItem:           removeItem,
  };
})();
