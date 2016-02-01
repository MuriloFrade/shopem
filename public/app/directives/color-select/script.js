(function(app) {
  'use strict';

  app.directive('colorSelect', list);

  function list() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/app/directives/color-select/template.html',
      scope: {
        data: '=',
        options: '='
      }
    };
  }


})(angular.module('common.ui'));
