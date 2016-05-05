(function() {
    'use strict';
    
    angular.module('squares')
        .component('rating', {
            templateUrl: '/public/app/rating.component.html',
            bindings: {
                value: '<'
            },
            controllerAs: 'model',
            controller: function() {
                
            }
        })
})();