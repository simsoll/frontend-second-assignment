(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($http) {
        var model = this;

        model.logOut = logOut;

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