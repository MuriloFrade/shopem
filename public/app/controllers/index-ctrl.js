(function (app) {
    'use strict';

    app.controller('IndexCtrl', indexCtrl);

    indexCtrl.$inject = ['$scope'];

    var shoppingLists = [
      {
        _id: '13131312312',
        title: 'Supermarket',
        color: '#3498db',
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
        color: '#e74c3c',
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
      // View Model !
      var vm = this; // jshint ignore:line
      // lists to render the lists directives
      vm.lists = shoppingLists;
      vm.listColors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
            '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f',
            '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400',
            '#c0392b', '#bdc3c7', '#7f8c8d'];
            
      // called when the user clicks on button to create a new list
      vm.showListModal = function(){
        showModal('shownNewListModal');
      };
      // called when the form for create a list is submmited
      vm.createList = function(){
        // JUST FOR TESTS!
          vm.listToCreate._id = vm.listToCreate.title;
          vm.listToCreate.items = [];
        // --------------------------!!!!!!!!!!!!!!!
        vm.lists.push(vm.listToCreate);
        vm.listToCreate = {};
        hideModal('shownNewListModal');
      };
      // called when the form for edit a list is submmited
      vm.editList = function(){
        vm.listToEdit = {};
        hideModal('shownEditListModal');
      };
      // called when the user clicks on the trash icon inside the edit modal
      vm.showConfirmDeleteListModal = function(){
        vm.listToDelete = vm.listToEdit;
        hideModal('shownEditListModal');
        showModal('shownConfirmDeleteListModal');
      };
      // function called when the user clicks on button "Yes!" to confirm to delete a list
      vm.deleteList = function(){
        var itemIdex = vm.lists.findIndex(function (e) {
          if(e._id == vm.listToDelete._id){
            return true;
          }
        });
        vm.lists.splice(itemIdex, 1);
        vm.listToDelete = {};
        hideModal('shownConfirmDeleteListModal');
      };
      // called when the form for create an item list is submmited
      vm.createItemList = function(){
        // JUST FOR TESTS!
        vm.itemListToCreate._id = vm.itemListToCreate.title;
        // --------------------------!!!!!!!!!!!!!!!

        vm.listToAddItem.items.push(vm.itemListToCreate);
        hideModal('shownNewItemListModal');
      };
      // called whe the form for edit an item list is submmited
      vm.editItemList = function(){
        hideModal('shownEditItemListModal');
      };
      // called when the user clicks on the trash icon inside the edit modal
      vm.showConfirmDeleteItemListModal = function(){
        vm.itemListToDelete = vm.itemListToEdit;
        hideModal('shownEditItemListModal');
        showModal('shownConfirmDeleteItemListModal');
      };
      // function called when the user clicks on button "Yes!" to confirm to delete an item list
      vm.deleteItemList = function(){
        var itemIdex = vm.itemListToDelete.list.items.findIndex(function (e) {
          if(e._id == vm.itemListToDelete.item._id){
            return true;
          }
        });
        vm.itemListToDelete.list.items.splice(itemIdex, 1);
        hideModal('shownConfirmDeleteItemListModal');
      };

      // options used in list directive
      vm.listOptions = {
        editList: listEditBtn, // pencil button click action
        addItem: listAddBtn, // plus button click action
        itemClick: listItemClick, // click action
        checkClick: listCheckClick, // click action
      };

      function listEditBtn(list){
        vm.listToEdit = list;
        showModal('shownEditListModal');
      }
      function listAddBtn(list){
        vm.listToAddItem = list;
        vm.itemListToCreate = {};
        showModal('shownNewItemListModal');
      }

      function listItemClick(item, list){
        vm.itemListToEdit = { item: item, list: list };
        showModal('shownEditItemListModal');
      }

      function listCheckClick(item){
        item.wasPurchased = !item.wasPurchased;
      }
      function showModal(controlVar) { vm[controlVar] = true; }
      function hideModal(controlVar) { vm[controlVar] = false; }


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
