(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    var controller = function(authenticationService) {
        var model = this;
        model.user = null;

        authenticationService.getActiveUser().then(function (data) {
            if (data.success) {
                model.user = data.user;
            }
        });        
    };
    
    module.component('admin', {
        controllerAs: 'model',
        controller: controller,
        $routeConfig: [
            { path: '/arts', component: 'artAdmin', name: 'ArtAdmin' },
            { path: '/users', component: 'userAdmin', name: 'UserAdmin' },
            { path: '/squareSets', component: 'squareSetAdmin', name: 'SquareSetAdmin' }
        ],        
        templateUrl: '/app/pages/admin/admin.component.html'
    }); 
})();