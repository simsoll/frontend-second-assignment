(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function () {

    };

    module.component('profile', {
        templateUrl: '/public/app/pages/profile/profile.component.html',
        controllerAs: 'model',
        controller: controller
    });
})();