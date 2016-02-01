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
        colors: '=',
        options: '=',
      },
      link: function (scope, element, attrs) {
        //var visibility = 'hidden';
        scope.itemClick = function (val){
          scope.data = val;
          scope.visibility = 'hidden';
        };

        scope.onMouseOver = function (){

        };
      }
    };
  }


})(angular.module('common.ui'));
