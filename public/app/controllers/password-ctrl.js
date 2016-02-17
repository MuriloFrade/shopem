(function (app) {
    'use strict';

    app.controller('PassWordCtrl', passwordCtrl);

    passwordCtrl.$inject = ['UserService'];

    function passwordCtrl(userService) {
      // View Model !
      var vm = this; // jshint ignore:line
      vm.error = '';
      vm.update = function() {
        var oldPw = vm.old,
            newPw = vm.new,
            confirmPw = vm.confirm;
        if(!oldPw || oldPw.length === 0) {
          vm.error = 'Old password field is required.';
          return;
        }
        if(!newPw || newPw.length === 0 || !confirmPw || confirmPw.length === 0 ) {
          vm.error = 'New and confirm new password fields are required.';
          return;
        }
        if(newPw !== confirmPw ) {
          vm.error = 'New password and confirm must be equals.';
          return;
        }

        userService.setPassword(oldPw, newPw, function(err, user){
          if(err){
            vm.error = err;
            return;
          }
          vm.error  = '';
          vm.old = vm.new = vm.confirm = '';
        });
      };
    }

})(angular.module('ShoppingListApp'));
