(function () {
    'use strict';

    function controller() {
        var model = this;
    }

    var module = angular.module('squares');

    module.component('artPiece', {
        bindings: {
            canCreate: '<',
            canSeeDetails: '<',
            art: '<'
        },
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/components/art/art-piece.component.html'
    });
})();