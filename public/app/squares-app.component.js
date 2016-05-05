(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    module.component('squaresApp', {
        templateUrl: '/public/app/squares-app.component.html',
        $routeConfig: [
            { path: '/list', component: 'artList', name: 'List'},
            { path: '/about', component: 'appAbout', name: 'About'},
            { path: '/artdetail/:id/...', component: 'artDetails', name: 'ArtDetails'},
            { path: '/**', redirectTo: ['List']}            
        ]
    });
})();