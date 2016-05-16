(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($http, authenticationService) {
        var model = this;
        model.user = null;
        model.arts = [];

        model.$onInit = function () {
            $http.get('/api/art/getAll')
                .then(function (response) {
                    model.arts = response.data;
                });
        };

        model.$routerOnActivate = function (next) {
            authenticationService.getActiveUser().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                }
            });
        }
    };

    module.component('arts', {
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/pages/arts/arts.component.html'
    });
})();