(function (app) {
    'use strict';

    app.controller('IndexCtrl', indexCtrl);

    indexCtrl.$inject = ['$scope'];

    var shoppingLists = [
      {
        _id: '13131312312',
        title: 'Supermarket',
        items: [
          {
            _id: '131aaa312312',
            title: '12 oranges',
            detail: 'Should prefer buy oranges from Brazil',
            wasPurchased: true,
          },
          {
            _id: '13131312312zzzz',
            title: '1 brown bread',
            wasPurchased: false,
          },
          {
            _id: '13131rttrr312312',
            title: '2 Axe Deodorants',
            detail: 'Should prefer aerosol types',
            wasPurchased: false,
          },
          {
            _id: '131trewtrwe31312312',
            title: '12 oranges',
            wasPurchased: true,
          },
        ],
        ownerId: '123123',
        sharedWith: []
      },
      {
        _id: '13asdadsa2312',
        title: 'Ebay',
        items: [
          {
            _id: '131313qqqqq12312',
            title: '1 oranges',
            detail: 'Should prefer buy oranges from Brazil',
            wasPurchased: false,
          },
          {
            _id: '13tes131312312',
            title: '19 brown bread',
            wasPurchased: true,
          },
          {
            _id: '1313134325312312',
            title: '29 Axe Deodorants',
            detail: 'Should prefer aerosol types',
            wasPurchased: false,
          },
          {
            _id: '1313131sfsd2312',
            title: '102 oranges',
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
      vm.lists = shoppingLists;
      vm.listOptions = {
        addItem: listAddBtn,
        itemClick: listItemClick,
        checkClick: listCheckClick,

      };

      function listAddBtn(id){
        console.log("add button clicked on list " + id);
      }

      function listItemClick(id){
        console.log("item clicked " + id);
      }

      function listCheckClick(id){
        console.log("checkbox clicked on item " + id);
      }
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
