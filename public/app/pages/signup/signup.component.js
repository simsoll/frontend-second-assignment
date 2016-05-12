(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function (authenticationService) {
        var model = this;
        model.user = null;

        model.$routerOnActivate = function (next) {
            authenticationService.getUserStatus().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                }
            });
        }
    };

    module.component('signup', {
        templateUrl: '/app/pages/signup/signup.component.html',
        controllerAs: 'model',
        controller: controller
    });
})();