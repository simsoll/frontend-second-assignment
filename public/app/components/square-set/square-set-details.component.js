(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($http) {
        var model = this;
        model.squareSet = null;
        model.goToPieces = goToPieces;

        model.$routerOnActivate = function (next, previous) {
            var squareSetId = next.params.id;

            $http.get('/api/squareSet/getById', {
                params: { id: squareSetId }
            }).then(function (response) {
                model.squareSet = response.data;
            });
        };
        
        function goToPieces() {
            model.$router.navigate(['Pieces']);
        }        
    }

    module.component('squareSetDetails', {
        bindings: {
            "$router": "<"
        },        
        templateUrl: '/app/components/square-set/square-set-details.component.html',
        $routeConfig: [
            { path: '/overview', component: 'squareSetOverview', name: 'Overview' },
            { path: '/reviews', component: 'squareSetReviews', name: 'Reviews' }
        ],       
        controllerAs: 'model',
        controller: controller
    });
    
    module.component('squareSetOverview', {
        template: 'This is the square set overview component'
    });

    module.component('squareSetReviews', {
        template: 'This is the square set reviews component'
    });    
})();