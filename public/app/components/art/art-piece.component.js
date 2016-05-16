(function () {
    'use strict';

    function controller() {
        var model = this;
        model.averageRating = averageRating;

        function averageRating() {
            var sum = 0;
            var count = model.art.reviews.length;

            for (var i = 0; i < count; i++) {
                sum += model.art.reviews[i].rating;
            }

            return count > 0 ? Math.ceil(sum / count) : 0;
        }
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