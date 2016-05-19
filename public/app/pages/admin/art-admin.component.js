(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function (artService) {
        var model = this;
        model.arts = null;
        model.remove = remove;

        model.$routerOnActivate = function (next) {
            retrieveArts();
        };

        function remove(art) {
            artService.remove(art.id).then(function (data) {
                retrieveArts();
            });
        }

        function retrieveArts() {
            artService.getAll().then(function (data) {
                model.arts = data;
            });
        }
    };

    module.component('artAdmin', {
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/pages/admin/art-admin.component.html'
    });
})();