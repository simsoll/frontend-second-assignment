(function () {
    'use strict';

    function controller() {
        var model = this;
        model.averageRating = averageRating;

        function averageRating() {
            var sum = 0;
            var count = model.squareSet.reviews.length;

            for (var i = 0; i < count; i++) {
                sum += model.squareSet.reviews[i].rating;
            }

            return count > 0 ? Math.ceil(sum / count) : 0;
        }        
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