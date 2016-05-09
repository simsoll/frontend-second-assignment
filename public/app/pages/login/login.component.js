(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    var controller = function(AuthenticationService) {
        var model = this;
        
        model.login = login;
        
        function login() {
            AuthenticationService.login(model.username, model.password, function(reponse) {
               if (response.success) {
                   //redirect to profile page
               }
               else {
                   //write out error to user
               }
            });
        }
    };
    
    module.component('login', {
        templateUrl: '/app/pages/login/login.component.html',
        controllerAs: 'model',
        controller: controller
    });
})();