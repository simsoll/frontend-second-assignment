(function () {
    'use strict';
    var module = angular.module('squares');

    var controller = function () {
        var model = this;
        model.addReview = addReview;
        
        function addReview() {
            var review = {
                rating: model.rating,
                comment: model.comment
            };
            
            model.onReviewAdded({review: review});
        }
    }

    module.component('addReview', {
        bindings: {
            min: '<',
            max: '<',
            onReviewAdded: '&'
        },
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/components/review/add-review.component.html',
    });
})();