(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function () {
        var x = 0;
        var y = 0;
        var stepSize = 100;

        var startPos = null;

        interact('.square')
            .draggable({
                onmove: function (event) {
                    var target = event.target,
                        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    target.style.webkitTransform =
                        target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)';

                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                onend: function (event) {
                    var textEl = event.target.querySelector('p');

                    textEl && (textEl.textContent =
                        'moved a distance of '
                        + (Math.sqrt(event.dx * event.dx +
                            event.dy * event.dy) | 0) + 'px');
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
                if (!startPos) {
                    var rect = interact.getElementRect(event.target);

                    // record center point when starting the very first a drag
                    startPos = {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                    }
                }

                // snap to the start position
                event.interactable.snap({ anchors: [startPos] });
            });
    }

    module.component('designBoard', {
        templateUrl: '/app/components/design-board/design-board.component.html',
        controllerAs: 'model',
        controller: controller
    });

    function clamp(min, max, value) {
        return Math.max(Math.min(max, value), min);
    }

    function integerDivision(x, y) {
        return Math.floor(x / y);
    }
})();