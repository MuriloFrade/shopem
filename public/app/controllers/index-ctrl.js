(function (app) {
    'use strict';

    app.controller('IndexCtrl', indexCtrl);

    indexCtrl.$inject = ['$scope', 'ShoppingListSvc'];

    function indexCtrl($scope, ShoppingListSvc) {
      // View Model !
      var vm = this; // jshint ignore:line
      // lists to render the lists directives
      vm.lists = [];
      vm.listColors =
        ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
        '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f',
        '#e67e22', '#e74c3c', '#DB0A5B', '#95a5a6', '#f39c12', '#d35400',
        '#c0392b', '#bdc3c7', '#7f8c8d'];

      // called when the user clicks on button to create a new list
      vm.showListModal = function(){
        showModal('shownNewListModal');
      };
      // called when the form for create a list is submmited
      vm.createList = function(){
        if(!vm.listToCreate.color) vm.listToCreate.color = vm.listColors[0];
        ShoppingListSvc.create(vm.listToCreate, function(e, shoppingList){
          if(e){
            console.log(e);
            return;
          }
          vm.lists.push(shoppingList);
          vm.listToCreate = {};
          hideModal('shownNewListModal');
        });
      };
      // called when the form for edit a list is submmited
      vm.editList = function(){
        ShoppingListSvc.update(vm.listToEdit, function(e, shoppingList){
          if(e){
            console.log(e);
            return;
          }
          vm.lists[getListIndexById(shoppingList._id)] = shoppingList;
          vm.listToEdit = {};
          hideModal('shownEditListModal');
        });

      };
      // called when the user clicks on the trash icon inside the edit modal
      vm.showConfirmDeleteListModal = function(){
        vm.listToDelete = vm.listToEdit;
        hideModal('shownEditListModal');
        showModal('shownConfirmDeleteListModal');
      };
      // function called when the user clicks on button "Yes!" to confirm to delete a list
      vm.deleteList = function(){
        var listDeletedId = vm.listToDelete._id;
        ShoppingListSvc.remove(vm.listToDelete, function(e){
          if(e){
            console.log(e);
            return;
          }
          var itemIdex = getListIndexById(listDeletedId);
          vm.lists.splice(itemIdex, 1);
          vm.listToDelete = {};
          hideModal('shownConfirmDeleteListModal');
        });
      };
      // called when the form for create an item list is submmited
      vm.createItemList = function(){
        ShoppingListSvc.createItem(vm.listToAddItem, vm.itemListToCreate, function(e, shoppingList){
          if(e){
            console.log(e);
            return;
          }
          vm.lists[getListIndexById(vm.listToAddItem)] = shoppingList;
          hideModal('shownNewItemListModal');
        });
      };
      // called whe the form for edit an item list is submmited
      vm.editItemList = function(){
        ShoppingListSvc.updateItem(vm.itemListToEdit.list, vm.itemListToEdit.item, function(e, shoppingList){
          if(e){
            console.log(e);
            return;
          }
          vm.lists[getListIndexById(vm.itemListToEdit.list._id)] = shoppingList;
          hideModal('shownEditItemListModal');
        });
      };
      // called when the user clicks on the trash icon inside the edit modal
      vm.showConfirmDeleteItemListModal = function(){
        vm.itemListToDelete = vm.itemListToEdit;
        hideModal('shownEditItemListModal');
        showModal('shownConfirmDeleteItemListModal');
      };
      // function called when the user clicks on button "Yes!" to confirm to delete an item list
      vm.deleteItemList = function(){
        var listItemDeletedId = vm.itemListToDelete.item._id;
        ShoppingListSvc.removeItem(vm.itemListToDelete.list, vm.itemListToDelete.item, function(e, shoppingList){
          if(e){
            console.log(e);
            return;
          }
          var itemIdex = vm.itemListToDelete.list.items.findIndex(function (e) {
            if(e._id == listItemDeletedId){
              return true;
            }
          });
          vm.itemListToDelete.list.items.splice(itemIdex, 1);
          hideModal('shownConfirmDeleteItemListModal');
        });
      };

      // options used in list directive
      vm.listOptions = {
        editList: listEditBtn, // pencil button click action
        addItem: listAddBtn, // plus button click action
        itemClick: listItemClick, // click action
        checkClick: listCheckClick, // click action
      };

      function listEditBtn(list){
        vm.listToEdit = angular.copy(list);
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
      function getListIndexById(id){
        return vm.lists.findIndex(function (e) {
          if(e._id == id){
            return true;
          }
        });
      }
      function init(){
        ShoppingListSvc.getAll(function(err, result){
          vm.lists = result;
        });
      }
      init();
    }

})(angular.module('ShoppingListApp'));
