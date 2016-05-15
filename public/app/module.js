(function () {
  "use strict";

  var module = angular.module('squares', ['ngComponentRouter', 'flow']);

  module.value('$routerRootComponent', 'squaresApp');
})();