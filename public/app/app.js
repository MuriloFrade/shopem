(function () {
    'use strict';

    angular.module('ShoppingListApp', ['common.core', 'common.ui'])
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/app/partials/index.html",
                controller: "IndexCtrl",
                controllerAs: "index"
            })
            .otherwise({ redirectTo: "/" });
    }

})();