(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($http, authenticationService, squareSetService, userService) {
        var model = this;
        model.squareSet = null;
        model.user = null;
        model.goToSquareSets = goToSquareSets;
        model.addReview = addReview;
        model.hasUserReviewed = hasUserReviewed;
        model.isMadeByUser = isMadeByUser;

        model.$routerOnActivate = function (next, previous) {
            var squareSetId = next.params.id;
            retrieveSquareSet(squareSetId);
            retrieveActiveUser();
        };

        function addReview(review) {
            review.user = model.user;
            review.squareSet = model.squareSet;

            squareSetService.addReview(review).then(function (data) {
                model.squareSet = data;
            });
        }
        
        function isMadeByUser() {
            return model.squareSet.userId === model.user.id;
        }        
        
        function hasUserReviewed() {
            for(var i = 0; i < model.squareSet.reviews.length; i++) {
                if (model.squareSet.reviews[i].user.id === model.user.id) {
                    return true;
                }
            }
            
            return false;
        }

        function goToSquareSets() {
            model.$router.navigate(['Square Sets']);
        }

        function retrieveSquareSet(squareSetId) {
            $http.get('/api/squareSet/getById', {
                params: { id: squareSetId }
            }).then(function (response) {
                model.squareSet = response.data;
                retrieveUser(model.squareSet.userId).then(function (data) {
                    model.squareSet.user = data;
                });                
            });
        }
        
        function retrieveUser(id) {
            return userService.getById(id).then(function (data) {
                return data;
            });
        }        

        function retrieveActiveUser() {
            authenticationService.getActiveUser().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                }
            });
        }
    }

    module.component('squareSetDetails', {
        bindings: {
            "$router": "<"
        },
        templateUrl: '/app/components/square-set/square-set-details.component.html',
        controllerAs: 'model',
        controller: controller
    });
})();