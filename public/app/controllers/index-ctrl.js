(function (app) {
    'use strict';

    app.controller('IndexCtrl', indexCtrl);

    indexCtrl.$inject = ['$scope'];

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
    function indexCtrl($scope) {
      var vm = this; // jshint ignore:line
      vm.hello = "Message from controller";
      vm.items = shoppingLists;

        // $scope.pageClass = 'page-home';
        // $scope.loadingMovies = true;
        // $scope.loadingGenres = true;
        // $scope.isReadOnly = true;
        //
        // $scope.latestMovies = [];
        // $scope.loadData = loadData;
        //
        // function loadData() {
        //     apiService.get('/api/movies/latest', null,
        //                 moviesLoadCompleted,
        //                 moviesLoadFailed);
        //
        //     apiService.get("/api/genres/", null,
        //         genresLoadCompleted,
        //         genresLoadFailed);
        // }
        //
        // function moviesLoadCompleted(result) {
        //     $scope.latestMovies = result.data;
        //     $scope.loadingMovies = false;
        // }
        //
        // function genresLoadFailed(response) {
        //     notificationService.displayError(response.data);
        // }
        //
        // function moviesLoadFailed(response) {
        //     notificationService.displayError(response.data);
        // }
        //
        // function genresLoadCompleted(result) {
        //     var genres = result.data;
        //     Morris.Bar({
        //         element: "genres-bar",
        //         data: genres,
        //         xkey: "Name",
        //         ykeys: ["NumberOfMovies"],
        //         labels: ["Number Of Movies"],
        //         barRatio: 0.4,
        //         xLabelAngle: 55,
        //         hideHover: "auto",
        //         resize: 'true'
        //     });
        //
        //     $scope.loadingGenres = false;
        // }
        //
        // loadData();
    }

})(angular.module('ShoppingListApp'));