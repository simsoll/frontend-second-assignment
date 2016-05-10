(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function (AuthenticationService) {
        var model = this;
        
        model.isLoggedIn = AuthenticationService.isLoggedIn();
    };

    module.component('profile', {
        templateUrl: '/app/pages/profile/profile.component.html',
        controllerAs: 'model',
        controller: controller
    });
})();