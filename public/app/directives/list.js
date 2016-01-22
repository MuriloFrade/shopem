(function(app) {
    'use strict';

    app.directive('list', list);

    function list() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/app/directives/list.html',
            css: '/app/directives/list.css',
            // scope: {
            //   listModel: '=list-model'
            // }
        };
    }

})(angular.module('common.ui'));
