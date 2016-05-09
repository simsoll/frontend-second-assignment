(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    var controller = function() {
        
    };
    
    module.component('pieces', {
        templateUrl: '/app/pages/pieces/pieces.component.html',
        controllerAs: 'model',
        controller: controller
    });
})();