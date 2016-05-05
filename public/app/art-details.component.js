(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    module.component('artDetails', {
        templateUrl: '/public/app/art-details.component.html',
        // $canActivate: function($http, $timeout) {
        //     return $timeout(function() {
        //         return true;
        //     }, 2000);
        // },
        controllerAs: 'model',
        controller: function() {
            var model = this;
            
            model.$routerOnActivate = function(next, previous) {
                model.id = next.params.id;
                
                //retrieve art
            }
        }
    });
})();