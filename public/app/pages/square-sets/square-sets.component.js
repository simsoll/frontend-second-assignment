(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($http, authenticationService) {
        var model = this;
        model.user = null;
        model.squareSets = null;

        model.$routerOnActivate = function (next) {
            retrieveUser();
            retrieveSquareSets();
        };

        function retrieveUser() {
            authenticationService.getUserStatus().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                }
            });
        }
        
        function retrieveSquareSets() {
            $http.get('/api/squareSet/getAll').then(function (response) {
                model.squareSets = response.data;
            });            
        }
    };

    module.component('squareSets', {
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/pages/square-sets/square-sets.component.html'
    });
})();