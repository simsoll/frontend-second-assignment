(function () {
    'use strict';

    angular
        .module('squares')
        .factory('artService', artService);

    function artService($http) {
        return {
            create: create
        }

        function create(userId, title, squareSetId, img, state) {
            return $http.post('/api/art/create', {
                userId: userId,
                title: title,
                squareSetId: squareSetId,
                img: img,
                state: state
            }).then(function (result) {
                return result.data;
            });
        };
    }
})();