(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($http, squareSetService) {
        var model = this;
        model.squareSets = null;
        model.remove = remove;

        model.$routerOnActivate = function (next) {
            retrieveSquareSets();
        };

        function remove(squareSet) {
            squareSetService.remove(squareSet.id).then(function (data) {
                retrieveSquareSets();
            });
        }

        function retrieveSquareSets() {
            $http.get('/api/squareSet/getAll').then(function (response) {
                model.squareSets = response.data;
            });
        }
    };

    module.component('squareSetAdmin', {
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/pages/admin/square-set-admin.component.html'
    });
})();