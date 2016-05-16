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
            getAll: getAll
        }

        function getAll() {
            return $http.get('/api/squareSet/getAll').then(function (result) {
                return result.data;
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
    }
})();