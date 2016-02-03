(function (app) {
    'use strict';

    app.factory('ShoppingListSvc', shoppingListSvc);
    shoppingListSvc.$inject = ['$http', '$resource'];
    function shoppingListSvc($http, $resource) {
      var service = {
        getAll : getAll,
        create : create,
        update : update,
        remove : remove,
        createItem : createItem,
        updateItem : updateItem,
        removeItem : removeItem,
      };

      var ShoppingList = $resource(
        '/shoppinglists/:id', null, { 'update': { method:'PUT' } }
      );
      var ShoppingListItem = $resource(
        '/shoppinglists/:id/items/:itemId', null, { 'update': { method:'PUT' } }
      );

      function getAll(cb){
        ShoppingList.query().$promise.then(function(shoppingLists) {
           // success
           // create resource objects for the items of shoppinglists
           var shoppingListsFix = shoppingLists.map(function (list){
             var newItems = list.items.map(function(item){
               return new ShoppingListItem(item);
             });
             list.items = newItems;
             return list;
           });
           cb(null, shoppingListsFix);
        }, function(errResponse) {
           cb(errResponse);
        });
      }

      function create(obj, cb){
        var newShoppingList = new ShoppingList(obj);
        newShoppingList.$save().then(function(shoppingList) {
           // success
           cb(null, shoppingList);
        }, function(errResponse) {
           cb(errResponse);
        });
      }

      function update(resource, cb){
        resource.$update( { id : resource._id }, function(shoppingList) {
           cb(null, shoppingList);
        }, function(errResponse) {
           cb(errResponse);
        });
      }

      function remove(resource, cb){
        resource.$delete( { id : resource._id }, function(shoppingList) {
           cb(null);
        }, function(errResponse) {
           cb(errResponse);
        });
      }

      function createItem(list, obj, cb){
        var newItem = new ShoppingListItem(obj);
        newItem.$save( { id : list._id } ).then(function(itemCreated) {
           // success
           cb(null, itemCreated);
        }, function(errResponse) {
           cb(errResponse);
        });
      }
      function updateItem(list, item, cb){
        item.$update( { id : list._id, itemId : item._id }, function(itemUpdated) {
           cb(null, itemUpdated);
        }, function(errResponse) {
           cb(errResponse);
        });
      }
      function removeItem(list, resource, cb){
        resource.$delete( { id : list._id, itemId : resource._id }, function(e, shoppingList) {
           cb(null, shoppingList);
        }, function(errResponse) {
           cb(errResponse);
        });
      }

      return service;

    }

})(angular.module('common.core'));
