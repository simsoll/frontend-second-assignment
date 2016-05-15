(function () {
    'use strict';

    angular
        .module('squares')
        .factory('userService', userService);

    function userService($http) {
        return {
            create: create
        };

        function create(user) {
            return $http.post('/api/user/create', { user: user })
                .then(function (result) {
                    return result.data;
                });
        };
    }
})();