(function () {
    'use strict';
    var module = angular.module('squares');

    var controller = function () {
        var model = this;
    }

    module.component('review', {
        bindings: {
            review: '<',
            max: '<'
        },
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/components/review/review.component.html',
    });
})();