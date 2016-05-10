(function () {
    'use strict';

    angular
        .module('squares')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$q'];
    function AuthenticationService($http, $q) {
        var model = this;

        model.user = null;

        return {
            getUserStatus: getUserStatus,
            isLoggedIn: isLoggedIn,
            login: login
        }

        function getUserStatus() {
            return $http.get('/api/authenticated')
                // handle success
                .success(function (data) {
                    if (data.status) {
                        model.user = true;
                    } else {
                        model.user = false;
                    }
                })
                // handle error
                .error(function (data) {
                    model.user = false;
                });
        };

        function login(username, password) {
            var deferred = $q.defer();

            $http.post('/api/authenticate', { username: username, password: password })
                .success(function (data, status) {
                    if (status === 200 && data.status) {
                        model.user = true;
                        deferred.resolve();
                    }
                    else {
                        model.user = false;
                        deferred.reject();
                    }
                })
                .error(function (data) {
                    model.user = false;
                    deferred.reject();
                });

            return deferred.promise;
        };

        function isLoggedIn() {
            return model.user ? true : false;
        };
    }
})();