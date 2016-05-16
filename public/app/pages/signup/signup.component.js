(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function (userService) {
        var model = this;
        model.create = create;

        function create(user) {
            userService.signUp(user).then(function (data) {
                model.$router.navigate(['Profile']);
            });
        }

    };

    module.component('signup', {
        bindings: {
            '$router': '<'
        },
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/pages/signup/signup.component.html'
    });
})();