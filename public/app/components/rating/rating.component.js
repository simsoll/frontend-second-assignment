(function () {
    'use strict';
    var module = angular.module('squares');

    var controller = function () {
        var model = this;

        model.$onInit = function () {
            model.entries = buildEntries(model.rating, model.max);
        };

        function buildEntries(value, max) {
            var entries = [];

            for (var i = 0; i < max; i++) {
                var icon = i < value ? 'glyphicon-star' : 'glyphicon-star-empty';
                entries.push(icon);
            }

            return entries;
        }
    }

    module.component('rating', {
        bindings: {
            rating: '<',
            max: '<'
        },
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/components/rating/rating.component.html',
    });
})();