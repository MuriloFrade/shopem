var mongoose = require('mongoose');
var shoppingListSchema = new mongoose.Schema({
  title: String,
  itens: [],
  _ownerId: Schema.Types.ObjectId,
  _sharedWith: []
});

mongoose.model('ShoppingList', shoppingListSchema);
