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
            getById: getById,
            getByUserId: getByUserId
        }

        function create(art) {
            art.img = LZString.compressToEncodedURIComponent(art.img);
            return $http.post('/api/art/create', {
                art: art
            }).then(function (response) {
                var art = response.data;
                var decompressed = LZString.decompressFromEncodedURIComponent(art.imageSource);
                art.imageSource = decompressed;
                return art;
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
            }).then(function (response) {
                var art = response.data;
                var decompressed = LZString.decompressFromEncodedURIComponent(art.imageSource);
                art.imageSource = decompressed;
                return art;
            });
        }

        function getAll() {
            return $http.get('/api/art/getAll').then(function (result) {
                return result.data.map(function (art) {
                    art.imageSource = LZString.decompressFromEncodedURIComponent(art.imageSource);
                    return addAverageRatingProperty(art);
                });
            });
        }

        function getByUserId(id) {
            return $http.get('/api/art/getByUserId', {
                params: { id: id }
            }).then(function (result) {
                return result.data.map(function (art) {
                    var decompressed = LZString.decompressFromEncodedURIComponent(art.imageSource);
                    art.imageSource = decompressed;
                    return addAverageRatingProperty(art);
                });
            });
        }

        function getById(id) {
            return $http.get('/api/art/getById', {
                params: { id: id }
            }).then(function (response) {
                var art = response.data;
                var decompressed = LZString.decompressFromEncodedURIComponent(art.imageSource);
                art.imageSource = decompressed;
                return art;
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