(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    var controller = function(authenticationService) {
        var model = this;
        model.user = null;

        model.$routerOnActivate = function (next) {
            authenticationService.getActiveUser().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                }
            });
        }        
    };
    
    module.component('home', {
        templateUrl: '/app/pages/home/home.component.html',
        controllerAs: 'model',
        controller: controller  
    });
})();