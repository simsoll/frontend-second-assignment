(function () {
    'use strict';

    angular
        .module('squares')
        .factory('userService', userService);

    function userService($http) {
        return {
            signUp: signUp,
            create: create
        };
        
        function signUp(user) {
            return $http.post('/api/user/signUp', { user: user })
                .then(function (result) {
                    return result.data;
                });
        };        

        function create(user) {
            return $http.post('/api/user/create', { user: user })
                .then(function (result) {
                    return result.data;
                });
        };
    }
})();