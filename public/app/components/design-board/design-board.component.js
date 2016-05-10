(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    var controller = function() {
        var element = document.getElementsByClassName('square')[0];
        var x = 0;
        var y = 0;
        

        interact(element)
            .draggable({
                snap: {
                    targets: [
                        interact.createSnapGrid({ x: 100, y: 100 })
                    ],
                },
                restrict: {
                    restriction: 'parent',
                    // elementRect: { top: 0, left: 0, bottom: 0, right: 0 },
                    // endOnly: true
                }
            })
            .on('dragmove', function (event) {
                x += event.dx;
                y += event.dy;

                event.target.style.webkitTransform =
                    event.target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';
            });        
    }
    
    module.component('designBoard', {
            templateUrl: '/app/components/design-board/design-board.component.html',
            controllerAs: 'model',
            controller: controller
        })
})();