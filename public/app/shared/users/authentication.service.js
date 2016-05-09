(function () {
    'use strict';

    angular
        .module('squares')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http'];
    function AuthenticationService($http) {
        return {
            login: login
        }
        
        function login(username, password, callback) {
            $http.post('/api/authenticate', { username: username, password: password })
                .success(function (response) {
                    callback(response);
                });
        }
    }
})();