(function () {
    'use strict';

    function controller() {
        var model = this;
        
        model.setRating = function(rating, newRating) {
            rating.value = newRating;
        }
    }
    
    var module = angular.module('squares');

    module.component('artPiece', {
        bindings: {
            art: '<'
        },
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/components/art/art-piece.component.html'
    });
})();