(function () {
    'use strict';

    function controller() {
        var model = this;
        
        model.setRating = function(rating, newRating) {
            rating.value = newRating;
        }
    }
    
    var module = angular.module('squares');

    module.component('squareSet', {
        bindings: {
            squareSet: '<'
        },
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/components/square-set/square-set.component.html'
    });
})();