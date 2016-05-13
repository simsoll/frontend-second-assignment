(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($http, authenticationService) {
        var model = this;
        model.user = null;
        model.squareSets = null;

        model.$onInit = function () {
            $http.get('/api/squareSet/getAll')
                .then(function (response) {
                    model.squareSets = response.data;
                });
        };
        
        model.$routerOnActivate = function (next) {
            authenticationService.getUserStatus().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                }
            });
        };
    };

    module.component('pieces', {
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/pages/pieces/pieces.component.html'
    });
})();