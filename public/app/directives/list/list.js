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


})(angular.module('common.ui'));
