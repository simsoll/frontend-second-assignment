(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    var controller = function(authenticationService) {
        var model = this;
        model.user = null;

        model.$routerOnActivate = function (next) {
            authenticationService.getUserStatus().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                }
            });
        }        
    };
    
    module.component('arts', {
        templateUrl: '/app/pages/arts/arts.component.html',
        controllerAs: 'model',
        controller: controller
    });
})();