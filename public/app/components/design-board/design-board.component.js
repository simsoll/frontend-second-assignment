(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($scope) {
        var model = this;

        model.designBoardPieces = new Array(25);
        model.getTransform = getTransform;

        interact('.square')
            .draggable({
                onmove: function (event) {
                    var target = event.target;
                    var position = {
                        x: (parseInt(target.dataset.x, 10) || 0) + Math.round(event.dx),
                        y: (parseInt(target.dataset.y, 10) || 0) + Math.round(event.dy)
                    }

                    model.squareSet.pieces[target.dataset.id].position = position;

                    $scope.$apply(); //TODO: fix this!
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
                var target = event.target;

                if (!model.squareSet || !model.squareSet.pieces) {
                    return;
                }

                if (!model.squareSet.pieces[target.dataset.id].startPosition) {
                    var rect = interact.getElementRect(target);

                    // record center point when starting the very first drag
                    model.squareSet.pieces[target.dataset.id].startPosition = {
                        x: Math.round(rect.left + rect.width / 2),
                        y: Math.round(rect.top + rect.height / 2)
                    };
                }

                // snap to the start position
                event.interactable.snap({ anchors: [model.squareSet.pieces[target.dataset.id].startPosition] });

                $scope.$apply(); //TODO: fix this!            
            })
            .on('doubletap', function (event) {
                event.preventDefault();
                var target = event.currentTarget;

                if (!model.squareSet || !model.squareSet.pieces) {
                    return;
                }

                var rotation = 90;
                var currentRotation = model.squareSet.pieces[target.dataset.id].degrees ? model.squareSet.pieces[target.dataset.id].degrees : 0;

                model.squareSet.pieces[target.dataset.id].degrees = currentRotation + rotation > 360 ? currentRotation + rotation - 360 : currentRotation + rotation;

                $scope.$apply(); //TODO: fix this!                            
            });

        function getTransform(piece) {
            var transform = applyTranslation('', piece.position);

            return addRotation(transform, piece.degrees);
        }

        function applyTranslation(transform, position) {
            var pos = position || { x: 0, y: 0 };

            var translate = 'translate(' + pos.x + 'px, ' + pos.y + 'px)';
            var indexOfTranslateStart = transform ? transform.indexOf('translate') : -1;

            if (indexOfTranslateStart > -1) {
                var indexOfTranslateEnd = transform.indexOf(')', indexOfTranslateStart) + 1;
                return replaceBetween(transform, indexOfTranslateStart, indexOfTranslateEnd, translate);
            }

            return transform ? transform + ' ' + translate : translate;
        }

        function addRotation(transform, degrees) {
            var deg = degrees || 0;
            var indexOfRotateStart = transform ? transform.indexOf('rotate') : -1;

            if (indexOfRotateStart > -1) {
                var indexOfRotateEnd = transform.indexOf(')', indexOfRotateStart) + 1;
                var currentDegrees = parseInt(transform.substring(transform.indexOf('(', indexOfRotateStart) + 1, transform.indexOf('deg', indexOfRotateStart)), 10);
                var newDegress = currentDegrees + deg > 360 ? currentDegrees + deg - 360 : currentDegrees + deg;
                var rotate = 'rotate(' + newDegress + 'deg)';
                return replaceBetween(transform, indexOfRotateStart, indexOfRotateEnd, rotate);
            }

            var rotate = 'rotate(' + deg + 'deg)';
            return transform ? transform + ' ' + rotate : rotate;
        }

        function replaceBetween(string, start, end, replacement) {
            return string.substring(0, start) + replacement + string.substring(end);
        }
    }

    module.component('designBoard', {
        bindings: {
            squareSet: '<'
        },
        controllerAs: 'model',
        controller: controller,
        templateUrl: '/app/components/design-board/design-board.component.html'
    });
})();