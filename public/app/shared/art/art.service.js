(function () {
    'use strict';

    angular
        .module('squares')
        .factory('artService', artService);

    function artService($http) {
        return {
            create: create
        }

        function create(art) {
            return $http.post('/api/art/create', {
                art: art
            }).then(function (result) {
                return result.data;
            });
        };
    }
})();