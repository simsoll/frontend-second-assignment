(function () {
    'use strict';

    angular
        .module('squares')
        .factory('squareSetService', squareSetService);

    function squareSetService($http) {
        return {
            create: create,
            remove: remove,
            addReview: addReview,
            getAll: getAll,
            getByUserId: getByUserId
        }

        function getAll() {
            return $http.get('/api/squareSet/getAll').then(function (result) {
                return result.data.map(function (squareSet) {
                    return addAverageRatingProperty(squareSet);
                });
            });
        }

        function getByUserId(id) {
            return $http.get('/api/squareSet/getByUserId', {
                params: { id: id }
            }).then(function (result) {
                return result.data.map(function (squareSet) {
                    return addAverageRatingProperty(squareSet);
                });
            });
        }

        function create(squareSet) {
            return $http.post('/api/squareSet/create', {
                squareSet: squareSet
            }).then(function (result) {
                return result.data;
            });
        }

        function remove(id) {
            return $http.post('/api/squareSet/remove', {
                id: id
            }).then(function (result) {
                return result.data;
            });
        }

        function addReview(review) {
            return $http.post('/api/squareSet/addReview', {
                review: review
            }).then(function (result) {
                return result.data;
            });
        }

        function addAverageRatingProperty(squareSet) {
            squareSet.averageRating = averageRating(squareSet.reviews);
            return squareSet;
        }

        function averageRating(reviews) {
            var sum = 0;
            var count = reviews.length;

            for (var i = 0; i < count; i++) {
                sum += reviews[i].rating;
            }

            return count > 0 ? Math.ceil(sum / count) : 0;
        }
    }
})();