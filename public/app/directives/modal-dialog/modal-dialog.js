(function(app) {
  'use strict';

  app.directive('modalDialog', list);

  function list() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/app/directives/modal-dialog/modal-dialog.html',
      scope: {
        show: '='
      },
      link: function(scope, element, attrs) {
        scope.dialogStyle = {};
        if (attrs.width)
          scope.dialogStyle.width = attrs.width;
        if (attrs.height)
          scope.dialogStyle.height = attrs.height;
        scope.hideModal = function() {
          scope.show = false;
        };
      }
    };
  }

})(angular.module('common.ui'));
