(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function (authenticationService) {
        var model = this;
        model.user = null;

        model.onUserStatusUpdate = function (user) {
            model.user = user;
        }

        model.$onInit = function () {
            authenticationService.getUserStatus().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                }
            });
        }
    }

    module.component('squaresApp', {
        $routeConfig: [
            { path: '/', component: 'home', name: 'Home' },
            { path: '/squareSets', component: 'squareSets', name: 'Square Sets' },
            { path: '/arts', component: 'arts', name: 'Arts' },
            { path: '/create', component: 'create', name: 'Create' },
            { path: '/about', component: 'about', name: 'About' },
            { path: '/profile', component: 'profile', name: 'Profile' },
            { path: '/admin/...', component: 'admin', name: 'Admin' },
            { path: '/signup', component: 'signup', name: 'Sign Up' },
            { path: '/login', component: 'login', name: 'Log In' },
            { path: '/artDetail/:id/...', component: 'artDetails', name: 'ArtDetails' },
            { path: '/squareSetDetail/:id/...', component: 'squareSetDetails', name: 'SquareSetDetails' },
            { path: '/**', redirectTo: ['Home'] }
        ],
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/squares-app.component.html'        
    });
})();