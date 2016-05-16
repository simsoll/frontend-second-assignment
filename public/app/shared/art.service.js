(function () {
    'use strict';

    angular
        .module('squares')
        .factory('artService', artService);

    function artService($http) {
        return {
            create: create,
            remove: remove,
            addReview: addReview,
            getAll: getAll,
            getByUserId: getByUserId
        }

        function create(art) {
            return $http.post('/api/art/create', {
                art: art
            }).then(function (result) {
                return result.data;
            });
        }

        function remove(id) {
            return $http.post('/api/art/remove', {
                id: id
            }).then(function (result) {
                return result.data;
            });
        }

        function addReview(review) {
            return $http.post('/api/art/addReview', {
                review: review
            }).then(function (result) {
                return result.data;
            });
        }

        function getAll() {
            return $http.get('/api/art/getAll').then(function (result) {
                return result.data.map(function (art) {
                    return addAverageRatingProperty(art);
                });
            });
        }

        function getByUserId(id) {
            return $http.get('/api/art/getByUserId', {
                params: { id: id }
            }).then(function (result) {
                return result.data.map(function (art) {
                    return addAverageRatingProperty(art);
                });
            });
        }

        function addAverageRatingProperty(art) {
            art.averageRating = averageRating(art.reviews);
            return art;
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