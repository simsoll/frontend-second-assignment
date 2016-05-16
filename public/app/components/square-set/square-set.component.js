(function () {
    'use strict';

    function controller() {
        var model = this;
    }
    
    var module = angular.module('squares');

    module.component('squareSet', {
        bindings: {
            canCreate: '<',
            canSeeDetails: '<',
            squareSet: '<'
        },
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/components/square-set/square-set.component.html'
    });
})();