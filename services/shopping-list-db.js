// fake data:
var shoppingLists = [
  {
    title: 'Supermarket',
    itens: [
      {
        title: '12 oranges',
        detail: 'Should prefer buy oranges from Brazil',
        wasPurchased: false,
      },
      {
        title: '1 brown bread',
        detail: '',
        wasPurchased: false,
      },
      {
        title: '2 Axe Deodorants',
        detail: 'Should prefer aerosol types',
        wasPurchased: false,
      },
      {
        title: '12 oranges',
        detail: 'Should prefer buy oranges from Brazil',
        wasPurchased: false,
      },
    ],
    ownerId: '123123',
    sharedWith: []
  }
];

function getListFromUser (userId, callback){
  callback(null, shoppingLists);
}

function addItem (item, callback){
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
    getListFromUser:      getListFromUser,
    addItem:              addItem,
    updateItem:           updateItem,
    removeItem:           removeItem,
    markItemAsPurchased:  markItemAsPurchased
  };
})();
