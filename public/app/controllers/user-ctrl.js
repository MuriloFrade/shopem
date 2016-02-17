(function (app) {
    'use strict';

    app.controller('UserCtrl', userCtrl);

    userCtrl.$inject = ['$rootScope', 'UserService'];

    function userCtrl($rootScope, userService) {
      // View Model !
      var vm = this; // jshint ignore:line
      vm.userLogged = angular.copy($rootScope.userLogged);

      $rootScope.$on("userLoggedUpdated", function(){
        vm.userLogged = angular.copy($rootScope.userLogged);
      });
      vm.update = function(user){
        userService.update(user, function(err, user){
          if(err)
            return console.log(err);

          $rootScope.userLogged = user;
          $rootScope.$broadcast("userLoggedUpdated");
        });
      };
    }

})(angular.module('ShoppingListApp'));
