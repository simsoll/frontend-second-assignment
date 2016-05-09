(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    var controller = function() {
        
    };
    
    module.component('admin', {
        templateUrl: '/app/pages/admin/admin.component.html',
        controllerAs: 'model',
        controller: controller
    });
})();