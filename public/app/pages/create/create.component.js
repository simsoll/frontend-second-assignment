(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($scope, $http, authenticationService, artService) {
        var model = this;
        model.goToSquareSets = goToSquareSets;
        model.goToCreateWithRandomId = goToCreateWithRandomId;
        model.saveToProfile = saveToProfile;
        model.squareSet = null;
        model.user = null;
        model.imgSrc = null;

        model.$routerOnActivate = function (next) {
            retrieveUser();
            if (next.params.state) {
                var decoded = LZString.decompressFromEncodedURIComponent(decodeURI(next.params.state));
                model.squareSet = JSON.parse(decoded);
            }
            else if (next.params.id) {
                retrieveSquareSet(next.params.id);
            }
        }

        function retrieveSquareSet(squareSetId) {
            $http.get('/api/squareSet/getById', {
                params: { id: squareSetId }
            }).then(function (response) {
                var data = response.data;

                if (!data) {
                    return;
                }

                model.squareSet = {
                    id: data.id,
                    title: data.title,
                    pieces: {}
                };

                for (var i = 0; i < data.imageSources.length; i++) {
                    model.squareSet.pieces[i] = {
                        imgSource: data.imageSources[i],
                    };
                }
            });
        }

        function retrieveUser() {
            authenticationService.getActiveUser().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                }
            });
        }

        function goToSquareSets() {
            model.$router.navigate(['Square Sets']);
        }

        function saveToProfile() {
            //TODO: fix padding-top
            html2canvas(document.getElementById("canvas"), {
                onrendered: function (canvas) {
                    var img = canvas.toDataURL("image/png");
                    var state = encodeState();

                    var art = {
                        userId: model.user.id, 
                        title: model.title, 
                        img: img, 
                        state: state,
                        squareSetId: model.squareSet.id,
                        reviews: []
                    }
                    
                    artService.create(art);
                    model.$router.navigate(['Profile']);
                },
                width: 500, //TODO: get from parent component
                height: 500
            });
        }

        function encodeState() {
            var squareSetStringified = JSON.stringify(model.squareSet);
            return LZString.compressToEncodedURIComponent(squareSetStringified);
        }

        function goToCreateWithRandomId() {
            $http.get('/api/squareSet/getAll').then(function (response) {
                var squareSets = response.data;
                var randomIndex = randomIntBetween(0, squareSets.length - 1);
                var randomId = squareSets[randomIndex].id;

                model.$router.navigate(['Create', { id: randomId }]);
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