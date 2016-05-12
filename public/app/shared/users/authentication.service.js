(function () {
    'use strict';

    angular
        .module('squares')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', '$q'];
    function authenticationService($http, $q) {

        return {
            getUserStatus: getUserStatus,
            login: login
        }

        function getUserStatus() {
            return $http.get('/api/authenticated')
                .then(function (result) {
                    return result.data;
                });
        };

        function login(username, password) {
            var deferred = $q.defer();

            $http.post('/api/authenticate', { username: username, password: password })
                .success(function (data, status) {
                    if (status === 200 && data.success) {
                        deferred.resolve();
                    }
                    else {
                        deferred.reject();
                    }
                })
                .error(function (data) {
                    deferred.reject();
                });

            return deferred.promise;
        };
    }
})();