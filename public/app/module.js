(function () {
  "use strict";

  var module = angular.module('squares', ['ngComponentRouter']);

  module.value('$routerRootComponent', 'squaresApp');

  module.run(function ($rootScope, authenticationService) {
    $rootScope.$on('$routeChangeStart',
      function (event, next, current) {
        authenticationService.getUserStatus()
      })
  });
})();