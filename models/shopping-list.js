var mongoose = require('mongoose');
var shoppingListSchema = new mongoose.Schema({
  title: String,
  itens: [],
  _ownerId: {type: Schema.Types.ObjectId, ref: 'User'},
  _sharedWith: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

var model = mongoose.model('ShoppingList', shoppingListSchema);

module.exports = model;
