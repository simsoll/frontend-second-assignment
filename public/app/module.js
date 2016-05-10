(function () {
  "use strict";

  var module = angular.module('squares', ['ngComponentRouter']);

  module.value('$routerRootComponent', 'squaresApp');

  module.run(function ($rootScope, AuthenticationService) {
    $rootScope.$on('$routeChangeStart',
      function (event, next, current) {
        AuthenticationService.getUserStatus()
      })
  });
})();