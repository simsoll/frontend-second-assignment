(function () {
    'use strict';

    angular
        .module('squares')
        .factory('squareSetService', squareSetService);

    function squareSetService($http) {
        return {
            create: create
        }

        function create(squareSet) {
            return $http.post('/api/squareSet/create', {
                squareSet: squareSet
            }).then(function (result) {
                return result.data;
            });
        };
    }
})();