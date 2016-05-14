(function () {
    'use strict';

    var module = angular.module('squares');

    var controller = function ($scope) {
        var model = this;

        model.designBoardPieces = new Array(25);
        model.saveToProfile = saveToProfile;

        model.$onChanges = function () {
            model.squareAttributes = {};

            if (!model.squareSet) {
                return;
            }

            console.log(model.squareSet);

            var initialPosition = { x: 0, y: 0 };
            for (var i = 0; i < model.squareSet.imageSources.length; i++) {
                model.squareAttributes[i] = {
                    // transform: applyTranslation('', initialPosition)
                };
            }

            console.log(model.squareAttributes);
        }

        function saveToProfile() {
            var doStuffInHere = model.squareAttributes;
        }

        interact('.square')
            .draggable({
                onmove: function (event) {
                    var target = event.target;
                    var position = {
                        x: (parseFloat(target.dataset.x) || 0) + event.dx,
                        y: (parseFloat(target.dataset.y) || 0) + event.dy
                    }

                    target.style.webkitTransform =
                        target.style.transform =
                        'translate(' + position.x + 'px, ' + position.y + 'px)';

                    model.squareAttributes[target.dataset.id].position = position;

                    model.squareAttributes[target.dataset.id].transform = applyTranslation(model.squareAttributes[target.dataset.id].transform, position);

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

                if (!model.squareAttributes[target.dataset.id].startPosition) {
                    var rect = interact.getElementRect(target);

                    // record center point when starting the very first drag
                    model.squareAttributes[target.dataset.id].startPosition = {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                    };
                }

                // snap to the start position
                event.interactable.snap({ anchors: [model.squareAttributes[target.dataset.id].startPosition] });

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

        function applyRotation(transform, degrees) {
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