(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function (userService) {
        var model = this;
        model.signUp = signUp;
        model.error = null;        

        function signUp() {
            if (model.password !== model.repeatedPassword) {
                model.error = true;
                model.errorMessage = "The two submitted passwords was not the same"
                return;
            }
            
            model.error = false;
            var user = {
                name: model.name,
                email: model.email,
                username: model.username,
                password: model.password
            };

            userService.signUp(user).then(function (data) {
                model.$router.navigate(['Profile']);
            })
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