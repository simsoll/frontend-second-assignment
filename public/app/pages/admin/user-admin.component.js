(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function (userService) {
        var model = this;
        model.users = null;
        model.create = create;
        model.remove = remove;
        model.update = update;

        model.$routerOnActivate = function (next) {
            retrieveUsers();
        };

        function create(user) {
            userService.create(user).then(function (data) {
                retrieveUsers();
            });            
        }

        function remove(user) {
            userService.remove(user.id).then(function (data) {
                retrieveUsers();
            });
        }
        
        function update(user) {
            userService.update(user).then(function (data) {
                retrieveUsers();
            });            
        }

        function retrieveUsers() {
            userService.getAll().then(function (data) {
                model.users = data;
            });
        }
    };

    module.component('userAdmin', {
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/pages/admin/user-admin.component.html'
    });
})();