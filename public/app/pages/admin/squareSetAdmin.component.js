(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    var controller = function() {
    };
    
    module.component('squareSetAdmin', {
        controllerAs: 'model',
        controller: controller,      
        templateUrl: '/app/pages/admin/squareSetAdmin.component.html'
    });
})();