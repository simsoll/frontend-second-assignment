(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function (authenticationService, artService) {
        var model = this;
        model.user = null;
        model.arts = null;

        model.$routerOnActivate = function (next) {
            retrieveUser();
            retrieveArts();
        }

        function retrieveUser() {
            authenticationService.getActiveUser().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                }
            });
        }
        
        function retrieveArts() {
            artService.getAll().then(function (data) {
                model.arts = data;
                //TODO: move to artService?
                addAverageRatingProperty();
                model.arts = artsSortedByAverageRating();
            });
        }      
        
        function addAverageRatingProperty() {
            for (var i = 0; i < model.arts.length; i++) {
                model.arts[i].averageRating = averageRating(model.arts[i]);
            }
        }

        function averageRating(arts) {
            var sum = 0;
            var count = arts.reviews.length;

            for (var i = 0; i < count; i++) {
                sum += arts.reviews[i].rating;
            }

            return count > 0 ? Math.ceil(sum / count) : 0;
        }
        
        function artsSortedByAverageRating() {
            return model.arts.sort(byAverageRating);
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

    module.component('arts', {
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/pages/arts/arts.component.html'
    });
})();