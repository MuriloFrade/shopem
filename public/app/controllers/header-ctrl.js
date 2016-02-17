(function (app) {
    'use strict';

    app.controller('HeaderCtrl', headerCtrl);

    headerCtrl.$inject = ['$http', '$rootScope'];

    function headerCtrl($http, $rootScope) {
      // View Model !
      var vm = this; // jshint ignore:line
      vm.userLogged = $rootScope.userLogged;

      $rootScope.$on("userLoggedUpdated", function(){
        vm.userLogged = $rootScope.userLogged;
      });

    }

})(angular.module('ShoppingListApp'));
