(function () {
    'use strict';

    angular
        .module('squares')
        .factory('urlService', urlService);

    function urlService($location) {
        return {
            create: create
        }

        function create(state) {
            if (state) {
                return $location.absUrl() + '&state=' + state;
            }
            
            return $location.absUrl();
        }
    }
})();