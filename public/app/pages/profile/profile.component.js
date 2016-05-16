(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($scope, $http, authenticationService, squareSetService) {
        var model = this;
        model.arts = null;
        model.saveSquareSet = saveSquareSet;
        model.squareSets = null;
        model.uploadSquareSet = uploadSquareSet;
        model.user = null;
        model.flow = null;
        model.imageSources = null;

        function saveSquareSet() {
            model.imageSources = [];
            for (var i = 0; i < model.flow.files.length; i++) {
                (function (i) {
                    var fileReader = new FileReader();
                    fileReader.onload = function (event) {
                        var uri = event.target.result;
                        model.imageSources[i] = uri;

                        if (model.imageSources.length === model.flow.files.length) {
                            var squareSet = {
                                userId: model.user.id,
                                title: model.title,
                                imageSources: model.imageSources,
                                reviews: []
                            }

                            squareSetService.create(squareSet).then(function (data) {
                                model.squareSets.push(data);
                                model.flow.files = [];
                                model.title = '';
                            });
                        }
                    };
                    fileReader.readAsDataURL(model.flow.files[i].file);
                })(i);
            }
        }

        model.$routerOnActivate = function (next) {
            authenticationService.getActiveUser().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                    model.parent.onUserStatusUpdate(model.user);
                    retrieveSquareSets(model.user);
                    retrieveArts(model.user);
                }
            });
        };

        function uploadSquareSet() {

        }

        function retrieveSquareSets(user) {
            $http.get('/api/squareSet/getByUserId', {
                params: { id: user.id }
            }).then(function (response) {
                model.squareSets = response.data;
            });
        }

        function retrieveArts(user) {
            $http.get('/api/art/getByUserId', {
                params: { id: user.id }
            }).then(function (response) {
                model.arts = response.data;
            });
        }
    };

    module.component('profile', {
        templateUrl: '/app/pages/profile/profile.component.html',
        controllerAs: 'model',
        controller: controller,
        require: {
            parent: '^squaresApp'
        },
    });
})();