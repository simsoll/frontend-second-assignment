(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($http, authenticationService, squareSetService) {
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
            retrieveUser();
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
            });
        }

        function retrieveUser() {
            authenticationService.getUserStatus().then(function (data) {
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
        $routeConfig: [
            { path: '/overview', component: 'squareSetOverview', name: 'Overview' },
            { path: '/reviews', component: 'squareSetReviews', name: 'Reviews' }
        ],
        controllerAs: 'model',
        controller: controller
    });

    module.component('squareSetOverview', {
        template: 'This is the square set overview component'
    });

    module.component('squareSetReviews', {
        template: 'This is the square set reviews component'
    });
})();