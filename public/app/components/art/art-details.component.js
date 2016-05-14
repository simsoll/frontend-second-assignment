(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($http) {
        var model = this;
        model.art = null;
        model.goToArts = goToArts;

        model.$routerOnActivate = function (next, previous) {
            var artId = next.params.id;

            $http.get('/api/art/getById', {
                params: { id: artId }
            }).then(function (response) {
                model.art = response.data;
            });
        }

        function goToArts() {
            model.$router.navigate(['Arts']);
        }
    }

    module.component('artDetails', {
        bindings: {
            '$router': '<'
        },
        templateUrl: '/app/components/art/art-details.component.html',
        $routeConfig: [
            { path: '/overview', component: 'artOverview', name: 'Overview' },
            { path: '/reviews', component: 'artReviews', name: 'Reviews' }
        ],
        controllerAs: 'model',
        controller: controller
    });

    module.component('artOverview', {
        template: 'This is the art overview component'
    });

    module.component('artReviews', {
        template: 'This is the art reviews component'
    });
})();