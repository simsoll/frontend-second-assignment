(function () {
    'use strict';

    angular
        .module('squares')
        .factory('userService', userService);

    function userService($http) {
        return {
            signUp: signUp,
            create: create,
            getAll: getAll,
            getById: getById,
            update: update,
            remove: remove
        };

        function signUp(user) {
            return $http.post('/api/user/signUp', {
                user: user
            }).then(function (result) {
                return result.data;
            });
        };

        function create(user) {
            return $http.post('/api/user/create', {
                user: user
            }).then(function (result) {
                return result.data;
            });
        };

        function getAll() {
            return $http.get('/api/user/getAll').then(function (result) {
                return result.data;
            });
        };
        
        function getById(id) {
            return $http.get('/api/user/getById', {
                params: { id: id }
            }).then(function (result) {
                return result.data;
            });
        };        

        function update(user) {
            return $http.put('/api/user/update', {
                user: user
            }).then(function (result) {
                return result.data;
            });
        };

        function remove(id) {
            return $http.post('/api/user/remove', {
                id: id
            }).then(function (result) {
                return result.data;
            });
        };
    }
})();