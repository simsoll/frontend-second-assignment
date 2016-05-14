(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($http, authenticationService) {
        var model = this;
        model.user = null;
        model.squareSet = null;
        model.goToPieces = goToPieces;
        model.goToCreateWithRandomId = goToCreateWithRandomId;

        model.$routerOnActivate = function (next) {
            retrieveUser();
            retrieveSquareSet(next.params.id);
        }

        function retrieveSquareSet(squareSetId) {
            $http.get('/api/squareSet/getById', {
                params: { id: squareSetId }
            }).then(function (response) {
                var data = response.data;
                model.squareSet = {
                    id: data.id,
                    title: data.title,
                    ratings: data.ratings
                };
                
                
                for(var i = 0; i < data.imageSources.length; i++) {
                    model.squareSet[i] = {
                        img: data.imageSources[i],
                        position: {
                            x: 0,
                            y: 0
                        },
                        transform: 'translate(0px, 0px)'
                    };
                }
            });
        }

        function retrieveUser() {
            authenticationService.getUserStatus().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                }
            });
        }

        function goToPieces() {
            model.$router.navigate(['Pieces']);
        }

        function goToCreateWithRandomId() {
            $http.get('/api/squareSet/getAll').then(function (response) {
                var squareSets = response.data;
                var randomIndex = randomIntBetween(0, squareSets.length - 1);
                var randomId = squareSets[randomIndex].id;
                
                model.$router.navigate(['Create', {id: randomId}]);
            });
        }

        function randomIntBetween(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    };

    module.component('create', {
        bindings: {
            "$router": "<"
        },
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/pages/create/create.component.html'
    });
})();