(function (app) {
    'use strict';

    app.factory('ShoppingListSvc', shoppingListSvc);
    shoppingListSvc.$inject = ['$http', '$resource'];
    function shoppingListSvc($http, $resource) {
      var service = {
        getAll : getAll,
        create : create
      };

      var ShoppingList = $resource(
        '/shoppinglists/:id', null, { 'update': { method:'PUT' } }
      );

      function getAll(cb){
        ShoppingList.query().$promise.then(function(shoppingLists) {
           // success
           cb(null, shoppingLists);
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
      return service;

        // var service = {
        //     get: get,
        //     post: post
        // };
        //
        // function get(url, config, success, failure) {
        //     return $http.get(url, config)
        //             .then(function (result) {
        //                 success(result);
        //             }, function (error) {
        //                 if (error.status == '401') {
        //                     notificationService.displayError('Authentication required.');
        //                     $rootScope.previousState = $location.path();
        //                     $location.path('/login');
        //                 }
        //                 else if (failure != null) {
        //                     failure(error);
        //                 }
        //             });
        // }
        //
        // function post(url, data, success, failure) {
        //     return $http.post(url, data)
        //             .then(function (result) {
        //                 success(result);
        //             }, function (error) {
        //                 if (error.status == '401') {
        //                     notificationService.displayError('Authentication required.');
        //                     $rootScope.previousState = $location.path();
        //                     $location.path('/login');
        //                 }
        //                 else if (failure != null) {
        //                     failure(error);
        //                 }
        //             });
        // }
        //
        // return service;
    }

})(angular.module('common.core'));
