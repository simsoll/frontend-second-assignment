(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    var controller = function() {
        
    };
    
    module.component('about', {
        templateUrl: '/public/app/pages/about/about.component.html',
        controllerAs: 'model',
        controller: controller
    });
})();