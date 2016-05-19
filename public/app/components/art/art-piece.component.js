(function () {
    'use strict';

    function controller() {
        var model = this;
    }

    var module = angular.module('squares');

    module.component('artPiece', {
        bindings: {
            showInfo: '<',
            art: '<'
        },
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/components/art/art-piece.component.html'
    });
})();