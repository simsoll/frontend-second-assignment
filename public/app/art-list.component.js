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
    }
    
    var module = angular.module('squares');

    module.component('artList', {
        templateUrl: '/public/app/art-list.component.html',
        controllerAs: 'model',
        controller: ['$http', controller]
    });
})();