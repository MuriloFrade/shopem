(function () {
    'use strict';

    angular.module('ShoppingListApp', ['common.core', 'common.ui'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/app/partials/index.html",
                controller: "IndexCtrl",
                controllerAs: "index"
            })
            .when("/user", {
                templateUrl: "/app/partials/user.html",
                controller: "UserCtrl",
                controllerAs: "user"
            })
            .when("/setpassword", {
                templateUrl: "/app/partials/setpassword.html",
                controller: "PassWordCtrl",
                controllerAs: "password"
            })
            .otherwise({ redirectTo: "/" });
    }

    run.$inject = ['$rootScope', '$http'];
    function run ($rootScope, $http){
      $rootScope.userLogged = {};
      $http({
          method : "GET",
          url : "/app/user"
      }).then(function (res) {
          $rootScope.userLogged = res.data;
          $rootScope.$broadcast("userLoggedUpdated");
      }, function (res) {
          console.log('error retrieving the user logged');
      });
    }

})();
