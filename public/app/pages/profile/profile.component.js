(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function (authenticationService, artService, squareSetService) {
        var model = this;
        model.arts = null;
        model.saveSquareSet = saveSquareSet;
        model.squareSets = null;
        model.user = null;
        model.flow = null;
        model.imageSources = null;
        model.errorMessage = null;

        function saveSquareSet() {
            var fileCount = model.flow.files.length;
            
            if (fileCount < 5 || 25 < fileCount) {
                model.errorMessage = 'Square sets have to consist of between 5 and 25 pieces';
                return
            }
            
            model.errorMessage = null;
            
            model.imageSources = [];
            for (var i = 0; i < fileCount; i++) {
                (function (i) {
                    var fileReader = new FileReader();
                    fileReader.onload = function (event) {
                        var uri = event.target.result;
                        model.imageSources[i] = uri;

                        if (model.imageSources.length === fileCount) {
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

        function retrieveSquareSets(user) {
            squareSetService.getByUserId(user.id).then(function (data) {
                model.squareSets = data;
            });
        }

        function retrieveArts(user) {
            artService.getByUserId(user.id).then(function (data) {
                model.arts = data;
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