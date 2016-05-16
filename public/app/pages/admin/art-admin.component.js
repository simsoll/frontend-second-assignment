(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($http, artService) {
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
            $http.get('/api/art/getAll').then(function (response) {
                model.arts = response.data;
            });
        }
    };

    module.component('artAdmin', {
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/pages/admin/art-admin.component.html'
    });
})();