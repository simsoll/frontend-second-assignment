(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    var controller = function() {
        
    };
        
    module.component('navigation', {
            templateUrl: '/app/components/navigation/navigation.component.html',
            bindings: {
                user: '<'
            },
            controllerAs: 'model',
            controller: controller
        })
})();