(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    var controller = function() {
        
    };
    
    module.component('home', {
        templateUrl: '/app/pages/home/home.component.html',
        controllerAs: 'model',
        controller: controller
    });
})();