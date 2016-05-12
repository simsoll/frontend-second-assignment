(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function () {
        interact('.design-board-piece')
            // enable draggables to be dropped into this
            .dropzone({ overlap: 'center' })
            // only accept elements matching this CSS selector
            .accept('.square')
            // listen for drop related events
            .on('dragenter', function (event) {
                var dropRect = interact.getElementRect(event.target),
                    dropCenter = {
                        x: dropRect.left + dropRect.width / 2,
                        y: dropRect.top + dropRect.height / 2
                    };

                event.draggable.snap({
                    anchors: [dropCenter]
                });

                var draggableElement = event.relatedTarget,
                    dropzoneElement = event.target;

                // feedback the possibility of a drop
                dropzoneElement.classList.add('drop-target');
                draggableElement.classList.add('can-drop');
            })
            .on('dragleave', function (event) {
                event.draggable.snap(false);

                // when leaving a dropzone, snap to the start position
                //event.draggable.snap({ anchors: [startPos] });

                // remove the drop feedback style
                event.target.classList.remove('drop-target');
                event.relatedTarget.classList.remove('can-drop');
            })
            .on('dropactivate', function (event) {
                // add active dropzone feedback
                event.target.classList.add('drop-active');
            })
            .on('dropdeactivate', function (event) {
                // remove active dropzone feedback
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');
            })
    }

    module.component('designBoardPiece', {
        templateUrl: '/app/components/design-board/design-board-piece.component.html',
        controllerAs: 'model',
        controller: controller
    });
})();