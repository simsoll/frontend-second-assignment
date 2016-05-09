(function () {
    'use strict';

    angular
        .module('squares')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {

        return {
            getAll: getAll,
            getById: getById,
            getByUsername: getByUsername,
            create: create
        };

        function getAll() {
            return $http.get('/api/users').then(succesCallback, errorCallback('Error getting all users'));
        }

        function getById(id) {
            return $http.get('/api/users/' + id).then(succesCallback, errorCallback('Error getting user by id'));
        }

        function getByUsername(username) {
            return $http.get('/api/users/' + username).then(succesCallback, errorCallback('Error getting user by username'));
        }

        function create(user) {
            return $http.post('/api/users', user).then(succesCallback, errorCallback('Error creating user'));
        }

        function succesCallback(response) {
            return response.data;
        }

        function errorCallback(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();