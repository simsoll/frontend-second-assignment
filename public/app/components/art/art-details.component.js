(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($http, authenticationService, artService, userService) {
        var model = this;
        model.art = null;
        model.user = null;
        model.goToArts = goToArts;
        model.addReview = addReview;
        model.hasUserReviewed = hasUserReviewed;
        model.isMadeByUser = isMadeByUser;

        model.$routerOnActivate = function (next, previous) {
            var artId = next.params.id;
            retrieveArtSet(artId);
            retrieveActiveUser();
        }

        function addReview(review) {
            review.user = model.user;
            review.art = model.art;

            artService.addReview(review).then(function (data) {
                model.art = data;
            });
        }

        function isMadeByUser() {
            return model.art.userId === model.user.id;
        }

        function hasUserReviewed() {
            for (var i = 0; i < model.art.reviews.length; i++) {
                if (model.art.reviews[i].user.id === model.user.id) {
                    return true;
                }
            }

            return false;
        }

        function goToArts() {
            model.$router.navigate(['Arts']);
        }

        function retrieveArtSet(artId) {
            $http.get('/api/art/getById', {
                params: { id: artId }
            }).then(function (response) {
                model.art = response.data;
                retrieveUser(model.art.userId).then(function (data) {
                    model.art.user = data;
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

    module.component('artDetails', {
        bindings: {
            '$router': '<'
        },
        controllerAs: 'model',
        controller: controller,
        $routeConfig: [
            { path: '/overview', component: 'artOverview', name: 'Overview' },
            { path: '/reviews', component: 'artReviews', name: 'Reviews' }
        ],
        templateUrl: '/app/components/art/art-details.component.html'
    });

    module.component('artOverview', {
        template: 'This is the art overview component'
    });

    module.component('artReviews', {
        template: 'This is the art reviews component'
    });
})();