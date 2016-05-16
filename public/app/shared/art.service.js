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
            getAll: getAll
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
                return result.data;
            });
        }
    }
})();