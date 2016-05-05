(function () {
  "use strict";

  var module = angular.module("squares", ['ngComponentRouter']);

  module.value('$routerRootComponent', 'squaresApp');

  module.component('appAbout', {
    template: 'This is the about page'
  });
})();