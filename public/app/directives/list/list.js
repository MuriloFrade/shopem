(function(app) {
  'use strict';

  app.directive('list', list);

  function list() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/app/directives/list/list.html',
      scope: {
        data: '=',
        options: '='
      }
    };
  }

  // app.directive('listItem', listItem);
  //
  // function listItem(){
  //   return {
  //     restrict: 'E',
  //     replace: true,
  //     templateUrl: '/app/directives/list/list-item.html'
  //     // scope: {
  //     //   listModel: '=list-model'
  //     // }
  //   };
  // }
  //
  // app.directive('addItem', addItem);
  //
  // function addItem(){
  //   return {
  //     restrict: 'E',
  //     replace: true,
  //     templateUrl: '/app/directives/list/add-item.html'
  //     // scope: {
  //     //   listModel: '=list-model'
  //     // }
  //   };
  // }



})(angular.module('common.ui'));
