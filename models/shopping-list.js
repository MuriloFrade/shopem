var mongoose = require('mongoose');
var shoppingListSchema = new mongoose.Schema({
  title: String,
  itens: [],
  _ownerId: {type: Schema.Types.ObjectId, ref: 'User'},
  _sharedWith: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

mongoose.model('ShoppingList', shoppingListSchema);
