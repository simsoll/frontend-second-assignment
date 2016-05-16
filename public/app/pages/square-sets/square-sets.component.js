(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function (authenticationService, squareSetService) {
        var model = this;
        model.user = null;
        model.squareSets = null;

        model.$routerOnActivate = function (next) {
            retrieveUser();
            retrieveSquareSets();
        };

        function retrieveUser() {
            authenticationService.getActiveUser().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                }
            });
        }

        function retrieveSquareSets() {
            squareSetService.getAll().then(function (data) {
                model.squareSets = sortedByAverageRating(data);
            });
        }
        
        function sortedByAverageRating(array) {
            return array.sort(byAverageRating);
        }

        function byAverageRating(a, b) {
            if (a.averageRating < b.averageRating) {
                return 1;
            }
            else if (b.averageRating < a.averageRating) {
                return -1;
            }

            return 0;
        }        
    };

    module.component('squareSets', {
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/pages/square-sets/square-sets.component.html'
    });
})();