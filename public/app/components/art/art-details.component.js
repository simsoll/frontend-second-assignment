(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function (authenticationService, artService, userService) {
        var model = this;
        model.art = null;
        model.user = null;
        model.goToArts = goToArts;
        model.addReview = addReview;
        model.hasUserReviewed = hasUserReviewed;
        model.isMadeByUser = isMadeByUser;

        model.$routerOnActivate = function (next, previous) {
            var artId = next.params.id;
            retrieveArt(artId);
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

        function retrieveArt(id) {
            return artService.getById(id).then(function (art) {
                model.art = art;
                retrieveUser(model.art.userId).then(function (user) {
                    model.art.user = user;
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
        templateUrl: '/app/components/art/art-details.component.html'
    });
})();