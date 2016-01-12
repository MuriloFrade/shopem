var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ShoppingListSchema = new Schema({
  title: String,
  itens: [{
    title: String,
    detail: String,
    wasPurchased: Boolean,
  }],
  _ownerId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  _sharedWith: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

var model = mongoose.model('ShoppingList', ShoppingListSchema);

module.exports = model;
