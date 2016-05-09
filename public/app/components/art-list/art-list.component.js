(function () {
    'use strict';

    function fetchArts($http) {
        return $http.get('/data/art.json')
            .then(function (reponse) {
                return reponse.data;
            })
    }

    function controller($http) {
        var model = this;
        model.arts = [];
        

        model.$onInit = function() {
            fetchArts($http).then(function(arts) {
                model.arts = arts;
            });
        };
        
        model.setRating = function(rating, newRating) {
            rating.value = newRating;
        }
    }
    
    var module = angular.module('squares');

    module.component('artList', {
        templateUrl: '/app/components/art-list/art-list.component.html',
        controllerAs: 'model',
        controller: ['$http', controller]
    });
})();