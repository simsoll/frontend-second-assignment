(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function (authenticationService) {
        var model = this;
        
        model.isLoggedIn = authenticationService.isLoggedIn();
    };

    module.component('profile', {
        templateUrl: '/app/pages/profile/profile.component.html',
        controllerAs: 'model',
        controller: controller
    });
})();