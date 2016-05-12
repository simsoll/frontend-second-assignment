(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function () {
        var model = this;
        
        model.designBoardPieces = new Array(25);

        var startPos = {};

        interact('.square')
            .draggable({
                onmove: function (event) {
                    var target = event.target;
                    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    target.style.webkitTransform =
                        target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)';

                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                }
            })
            .restrict({
                drag: "",
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            })
            .snap({
                mode: 'anchor',
                anchors: [],
                range: Infinity,
                elementOrigin: { x: 0.5, y: 0.5 },
                endOnly: true
            })
            .on('dragstart', function (event) {
                if (!startPos[event.target.dataset.id]) {
                    var rect = interact.getElementRect(event.target);

                    // record center point when starting the very first a drag
                    startPos[event.target.dataset.id] = {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                    }
                }

                // snap to the start position
                event.interactable.snap({ anchors: [startPos[event.target.dataset.id]] });
            });
    }

    module.component('designBoard', {
        bindings: {
            
        },
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/components/design-board/design-board.component.html'
    });
})();