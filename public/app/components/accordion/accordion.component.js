(function () {
    'use strict';

    var module = angular.module('squares');

    module.component('accordion', {
        transclude: true,
        templateUrl: '/public/app/components/accordion/accordion.component.html',
        controllerAs: 'model',
        controller: function () {
            var model = this;
            var panels = [];

            model.selectPanel = function (panel) {
                for (var i = 0; i < panels.length; i++) {
                    if (panel === panels[i]) {
                        panels[i].turnOn();
                    }
                    else {
                        panels[i].turnOff();
                    }
                }
            }

            model.addPanel = function (panel) {
                panels.push(panel);

                if (panels.length > 0) {
                    panels[0].turnOn();
                }
            }

        }
    });

    module.component('accordionPanel', {
        bindings: {
            heading: '@'
        },
        require: {
            parent: '^accordion'
        },
        controllerAs: 'model',
        controller: function () {
            var model = this;
            model.selected = false;

            model.$onInit = function() {
                model.parent.addPanel(model)
            };
            
            model.turnOn = function() {
                model.selected = true;
            };
            
            model.turnOff = function() {
                model.selected = false;
            };
            
            model.select = function() {
                model.parent.selectPanel(model);
            };
        },
        transclude: true,
        templateUrl: '/public/app/components/accordion/accordion-panel.component.html'
    });
})();