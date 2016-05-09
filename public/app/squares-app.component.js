(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    module.component('squaresApp', {
        templateUrl: '/public/app/squares-app.component.html',
        $routeConfig: [
            { path: '/', component: 'home', name: 'Home'},
            { path: '/pieces', component: 'pieces', name: 'Pieces'},
            { path: '/arts', component: 'arts', name: 'Arts'},
            { path: '/create', component: 'create', name: 'Create'},
            { path: '/about', component: 'about', name: 'About'},
            { path: '/profile', component: 'profile', name: 'Profile'},
            { path: '/signup', component: 'signup', name: 'Signup'},
            { path: '/login', component: 'login', name: 'Login'},
            { path: '/artdetail/:id/...', component: 'artDetails', name: 'ArtDetails'},
            { path: '/**', redirectTo: ['Home']}            
        ]
    });
})();