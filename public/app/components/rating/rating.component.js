(function() {
    'use strict';
    
    var module = angular.module('squares');
    
    function buildEntries(value, max) {
        var entries = [];
        
        for (var i = 0; i < max; i++) {
            var icon = i < value ? 'glyphicon-star' : 'glyphicon-star-empty';
            entries.push(icon);
        }
        
        return entries;
    }
    
    module.component('rating', {
            templateUrl: '/public/app/components/rating/rating.component.html',
            bindings: {
                value: '<',
                max: '<',
                setRating: '&'
            },
            controllerAs: 'model',
            controller: function() {
                var model = this;                
                
                model.$onInit = function() {
                    model.entries = buildEntries(model.value, model.max);
                };
                
                model.$onChanges = function() {
                    model.entries = buildEntries(model.value, model.max);
                }
            }
        })
})();