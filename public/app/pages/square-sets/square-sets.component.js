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
                model.squareSets = data;
                //TODO: move to squareSetService?
                addAverageRatingProperty();
                model.squareSets = squareSetsSortedByAverageRating();
            });
        }

        function addAverageRatingProperty() {
            for (var i = 0; i < model.squareSets.length; i++) {
                model.squareSets[i].averageRating = averageRating(model.squareSets[i]);
            }
        }

        function averageRating(squareSet) {
            var sum = 0;
            var count = squareSet.reviews.length;

            for (var i = 0; i < count; i++) {
                sum += squareSet.reviews[i].rating;
            }

            return count > 0 ? Math.ceil(sum / count) : 0;
        }
        
        function squareSetsSortedByAverageRating() {
            return model.squareSets.sort(byAverageRating);
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