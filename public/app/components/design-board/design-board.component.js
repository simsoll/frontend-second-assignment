(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($scope) {
        var model = this;

        model.designBoardPieces = new Array(25);
        model.saveToProfile = saveToProfile;

        function saveToProfile() {
            var doStuffInHere = model.squareSet;
        }

        interact('.square')
            .draggable({
                onmove: function (event) {
                    var target = event.target;
                    var position = {
                        x: (parseFloat(target.dataset.x) || 0) + event.dx,
                        y: (parseFloat(target.dataset.y) || 0) + event.dy
                    }

                    model.squareSet.pieces[target.dataset.id].position = position;

                    model.squareSet.pieces[target.dataset.id].transform = applyTranslation(model.squareSet.pieces[target.dataset.id].transform, position);

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

                if (!model.squareSet.pieces[target.dataset.id].startPosition) {
                    var rect = interact.getElementRect(target);

                    // record center point when starting the very first drag
                    model.squareSet.pieces[target.dataset.id].startPosition = {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                    };
                }

                // snap to the start position
                event.interactable.snap({ anchors: [model.squareSet.pieces[target.dataset.id].startPosition] });

                $scope.$apply(); //TODO: fix this!            
            })
            .on('doubletap', function (event) {
                event.preventDefault();
                var target = event.currentTarget;

                model.squareSet.pieces[target.dataset.id].transform = addRotation(model.squareSet.pieces[target.dataset.id].transform, 90);
                
                $scope.$apply(); //TODO: fix this!                            
            });

        function applyTranslation(transform, position) {
            var translate = 'translate(' + position.x + 'px, ' + position.y + 'px)';
            var indexOfTranslateStart = transform ? transform.indexOf('translate') : -1;

            if (indexOfTranslateStart > -1) {
                var indexOfTranslateEnd = transform.indexOf(')', indexOfTranslateStart) + 1;
                return replaceBetween(transform, indexOfTranslateStart, indexOfTranslateEnd, translate);
            }

            return transform ? transform + ' ' + translate : translate;
        }

        function addRotation(transform, degrees) {
            var indexOfRotateStart = transform ? transform.indexOf('rotate') : -1;

            if (indexOfRotateStart > -1) {
                var indexOfRotateEnd = transform.indexOf(')', indexOfRotateStart) + 1;
                var currentDegrees = parseInt(transform.substring(transform.indexOf('(', indexOfRotateStart) + 1, transform.indexOf('deg', indexOfRotateStart)));
                var newDegress = currentDegrees + degrees > 360 ? currentDegrees + degrees - 360 : currentDegrees + degrees;
                var rotate = 'rotate(' + newDegress + 'deg)';
                return replaceBetween(transform, indexOfRotateStart, indexOfRotateEnd, rotate);
            }

            var rotate = 'rotate(' + degrees + 'deg)';
            return transform ? transform + ' ' + rotate : rotate;
        }

        function replaceBetween(string, start, end, replacement) {
            return string.substring(0, start) + replacement + string.substring(end);
        };
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