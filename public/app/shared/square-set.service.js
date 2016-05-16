(function () {
    'use strict';

    angular
        .module('squares')
        .factory('squareSetService', squareSetService);

    function squareSetService($http) {
        return {
            create: create,
            remove: remove
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
    }
})();