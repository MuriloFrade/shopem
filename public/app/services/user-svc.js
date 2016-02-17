(function (app) {
    'use strict';

    app.factory('UserService', userService);

    userService.$inject = ['$http'];
    function userService($http) {
      var service = {
        update : updateUser,
        setPassword: setPassword
      };
      function updateUser (user, callback){
        $http({
            method : "PUT",
            url : "/app/user",
            data : user
        }).then(function (res) {
            return callback(null, res.data);
        }, function (res) {
            return callback(res.data.error);
        });
      }
      function setPassword(oldPassword, newPassword, callback){
        $http({
            method : "post",
            url : "/app/user/setpassword",
            data : { oldPassword: oldPassword, newPassword : newPassword}
        }).then(function (res) {
            return callback(null, res.data);
        }, function (res) {
            return callback(res.data.error);
        });
      }

      return service;
    }

})(angular.module('common.core'));
