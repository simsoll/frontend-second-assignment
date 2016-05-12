(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    var controller = function(authenticationService) {
        var model = this;
        model.user = null;

        authenticationService.getUserStatus().then(function (data) {
            if (data.success) {
                model.user = data.user;
            }
        });        
    };
    
    module.component('admin', {
        templateUrl: '/app/pages/admin/admin.component.html',
        controllerAs: 'model',
        controller: controller
    });
})();