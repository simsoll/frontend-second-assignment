(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($http, authenticationService) {
        var model = this;
        model.user = null;
        model.squareSets = null;
        model.arts = null;

        model.$routerOnActivate = function (next) {
            authenticationService.getUserStatus().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                    model.parent.onUserStatusUpdate(model.user);
                    retrieveSquareSets(model.user);
                    retrieveArts(model.user);
                }
            });
        };

        function retrieveSquareSets(user) {
            $http.get('/api/squareSet/getByUserId', {
                params: { id: user.id }
            }).then(function (response) {
                model.squareSets = response.data;
            });
        }
        
        function retrieveArts(user) {
            $http.get('/api/art/getByUserId', {
                params: { id: user.id }
            }).then(function (response) {
                model.arts = response.data;
            });
        }        
    };

    module.component('profile', {
        templateUrl: '/app/pages/profile/profile.component.html',
        controllerAs: 'model',
        controller: controller,
        require: {
            parent: '^squaresApp'
        },
    });
})();