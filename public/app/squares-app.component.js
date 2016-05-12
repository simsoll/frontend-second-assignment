(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($rootScope, authenticationService) {
        var model = this;

        model.isLoggedIn = function () {
            return authenticationService.isLoggedIn()
        };

        model.$routerOnActivate = function () {
            return authenticationService.getHeroes().then(function (heroes) {
                $ctrl.heroes = heroes;
            });
        };
    };

    module.component('squaresApp', {
        templateUrl: '/app/squares-app.component.html',
        $routeConfig: [
            { path: '/', component: 'home', name: 'Home' },
            { path: '/pieces', component: 'pieces', name: 'Pieces' },
            { path: '/arts', component: 'arts', name: 'Arts' },
            { path: '/create', component: 'create', name: 'Create' },
            { path: '/about', component: 'about', name: 'About' },
            { path: '/profile', component: 'profile', name: 'Profile' },
            { path: '/admin', component: 'admin', name: 'Admin' },
            { path: '/signup', component: 'signup', name: 'Sign Up' },
            { path: '/login', component: 'login', name: 'Log In' },
            { path: '/artdetail/:id/...', component: 'artDetails', name: 'ArtDetails' },
            { path: '/**', redirectTo: ['Home'] }
        ],
        controllerAs: 'model',
        controller: controller
    });
})();