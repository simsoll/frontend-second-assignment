(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    module.component('artDetails', {
        templateUrl: '/app/components/art-list/art-details.component.html',
        // $canActivate: function($http, $timeout) {
        //     return $timeout(function() {
        //         return true;
        //     }, 2000);
        // },
        $routeConfig: [
            {path: '/overview', component: 'artOverview', name: 'Overview'},
            {path: '/reviews', component: 'artReviews', name: 'Reviews'}
        ],
        controllerAs: 'model',
        controller: function() {
            var model = this;
            
            model.$routerOnActivate = function(next, previous) {
                model.id = next.params.id;
                
                //retrieve art from db
            }
        }
    });
    
    module.component('artOverview', {
        template: 'This is the art overview component'
    });
    
    module.component('artReviews', {
        template: 'This is the art reviews component'
    });
})();