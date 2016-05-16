(function () {
    'use strict';
    var module = angular.module('squares');

    var controller = function () {
        var model = this;

        model.handleModeChange = function () {
            if (model.editMode) {
                model.onUpdate({ value: model.value });
            }
            model.editMode = !model.editMode;
        };

        model.$onInit = function () {
            // Set a default type
            if (!model.type) {
                model.type = 'text';
            }
        };
    }

    module.component('editableField', {
        bindings: {
            editMode: '<',
            value: '<',
            type: '@?',
            onUpdate: '&'
        },
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/components/editable-field/editable-field.component.html',
    });
})();