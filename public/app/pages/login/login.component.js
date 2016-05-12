(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function (authenticationService) {
        var model = this;

        model.login = login;
        model.error = false;

        function login() {
            authenticationService.login(model.username, model.password)
                .then(function () {
                    model.error = false;
                    model.$router.navigate(['Profile']);
                })
                .catch(function () {
                    model.error = true;
                    model.errorMessage = 'Invalid username and/or password';
                });
        }
    };

    module.component('login', {
        templateUrl: '/app/pages/login/login.component.html',
        controllerAs: 'model',
        controller: controller,
        bindings: {
            "$router": "<"
        }
    });
})();