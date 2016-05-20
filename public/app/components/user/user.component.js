(function () {
    'use strict';

    function controller() {
        var model = this;
        model.submit = submit;
        model.error = null;

        function submit() {
            if (model.isCreating && model.user.password !== model.user.repeatedPassword) {
                model.error = true;
                model.errorMessage = "The two submitted passwords was not the same"
                return;
            }

            model.error = false;

            var user = {
                name: model.user.name,
                email: model.user.email,
                username: model.user.username,
                password: model.user.password
            }

            if (model.isCreating) {
                model.onCreate({ user: user });
                resetFormInputs();
            }
            else if (model.isUpdating) {
                user.id = model.user.id;
                model.onUpdate({ user: user });
            }
            else if (model.isRemoving) {
                user.id = model.user.id;
                model.onRemove({ user: user });
            }            
        }

        function resetFormInputs() {
            model.user.name = '';
            model.user.email = '';
            model.user.username = '';
            model.user.password = '';
            model.user.repeatedPassword = '';
        }
    }

    var module = angular.module('squares');

    module.component('user', {
        bindings: {
            user: '<',
            onCreate: '&?',
            onUpdate: '&?',
            onRemove: '&?'
        },
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/components/user/user.component.html'
    });
})();