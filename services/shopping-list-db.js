/* jshint esnext: true*/
var ShoppingList = require('../models/shopping-list');

function ShoppingListDbError(message) {
  this.name = 'ShoppingListDbError';
  this.message = message || 'Error in shopping-list-db.js';
  this.stack = (new Error()).stack;
}
ShoppingListDbError.prototype = Object.create(Error.prototype);
ShoppingListDbError.prototype.constructor = ShoppingListDbError;

function getAllFromUser (userId, callback){
  ShoppingList.find({_ownerId : userId}, function (err, results) {
    if(err)
    callback(err);

    callback(null, results);
  });
}
function add (shoppingList, callback){
  var newShoppingList = new ShoppingList(shoppingList);
  newShoppingList.save(function(err, result, numAffected){
    if(err)
      callback(err);

    if(numAffected === 0)
      callback(result.error);

    callback(null, result);
  });
}
function get (id, callback){
  ShoppingList.findOne({ _id: id }, function (err, shoppingList) {
    if(err)
      callback(err);

    callback(null, shoppingList);
  });
}

function update (id, shoppingList, callback){
  ShoppingList.findOneAndUpdate({ _id: id }, shoppingList, { new: true }, function(err, result){
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
    var newItemIndex = shoppingList.items.length;
    shoppingList.items.push(item);
    update(shoppingList._id, shoppingList, function(err, shoppingList){
      if(err) callback(err, null);
      callback(null, shoppingList.items[newItemIndex]);
    });
  });

}

function updateItem (shoppingListId, itemId, item, callback){
  get(shoppingListId, function(err, shoppingList){
    if(err) callback(err, null);

    var itemIdex = shoppingList.items.findIndex(e => e._id.equals(itemId));
    if(itemIdex === -1)
      throw new ShoppingListDbError('item not found in collection of items of shoppinglist');

    shoppingList.items[itemIdex] = item;
    update(shoppingList._id, shoppingList, function(err, shoppingList){
      if(err) callback(err, null);
      callback(null, shoppingList.items[itemIdex]);
    });
  });
}

function removeItem (shoppingListId, itemId, callback){
  get(shoppingListId, function(err, shoppingList){
    if(err) callback(err, null);

    var itemIdex = shoppingList.items.findIndex(function (e) {
      if(e._id.equals(itemId)){
        return true;
      }
    });
    if(itemIdex === -1)
      throw new ShoppingListDbError('item not found in collection of items of shoppinglist');

    shoppingList.items.splice(itemIdex,1);
    update(shoppingList._id, shoppingList, function(err, result){
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
