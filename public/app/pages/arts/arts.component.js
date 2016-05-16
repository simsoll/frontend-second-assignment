(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function (authenticationService, artService) {
        var model = this;
        model.user = null;
        model.arts = null;

        model.$routerOnActivate = function (next) {
            retrieveUser();
            retrieveArts();
        }

        function retrieveUser() {
            authenticationService.getActiveUser().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                }
            });
        }
        
        function retrieveArts() {
            artService.getAll().then(function (data) {
                model.arts = artsSortedByAverageRating(data);
            });
        }      
        
        function artsSortedByAverageRating(array) {
            return array.sort(byAverageRating);
        }
        
        function byAverageRating(a, b) {
            if (a.averageRating < b.averageRating) {
                return 1;
            }
            else if (b.averageRating < a.averageRating) {
                return -1;
            }
            
            return 0;
        }          
    };

    module.component('arts', {
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/pages/arts/arts.component.html'
    });
})();