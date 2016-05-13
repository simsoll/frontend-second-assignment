(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    function fetchArts($http) {
        return $http.get('/data/art.json')
            .then(function (reponse) {
                return reponse.data;
            })
    }
    
    var controller = function($http, authenticationService) {
        var model = this;
        model.user = null;
        model.arts = [];

        model.$onInit = function() {
            fetchArts($http).then(function(arts) {
                model.arts = arts;
            });       
        };

        model.$routerOnActivate = function (next) {
            authenticationService.getUserStatus().then(function (data) {
                if (data.success) {
                    model.user = data.user;
                }
            });                 
        }        
    };
    
    module.component('arts', {
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/pages/arts/arts.component.html'
    });
})();