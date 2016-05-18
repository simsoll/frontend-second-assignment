(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($http, $location) {
        var model = this;
        model.isActive = isActive;
        model.logOut = logOut;

        function isActive(route) {
            if (route === '/') {
                return $location.path() === '/'; 
            }
            
            return $location.path().startsWith(route);
        }

        function logOut() {
            $http.get('/api/user/logOut').then(function (result) {
                 model.parent.onUserStatusUpdate(null);
            });
        }
    };

    module.component('navigation', {
        templateUrl: '/app/components/navigation/navigation.component.html',
        bindings: {
            user: '<'
        },
        controllerAs: 'model',
        controller: controller,
        require: {
            parent: '^squaresApp'
        },        
    })
})();