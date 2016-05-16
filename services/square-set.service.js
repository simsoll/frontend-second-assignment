'use strict';

module.exports = (function () {
    var squareSets = [
        {
            id: 1,
            userId: 2,
            title: "Colors",
            imageSources: [
                "images/squareSets/1/1.png",
                "images/squareSets/1/2.png",
                "images/squareSets/1/3.png",
                "images/squareSets/1/4.png",
                "images/squareSets/1/5.png",
                "images/squareSets/1/6.png",
                "images/squareSets/1/7.png",
                "images/squareSets/1/8.png",
                "images/squareSets/1/9.png",
                "images/squareSets/1/10.png"
            ],
            ratings: [
                {
                    user: {
                        id: 1,
                        name: "Simon"
                    },
                    value: 5,
                    comment: "This is cool!"
                },
                {
                    user: {
                        id: 2,
                        name: "John"
                    },
                    value: 2,
                    comment: "Bahhh..."
                }
            ]
        },
        {
            id: 2,
            userId: 1,
            title: "Colors V2",
            imageSources: [
                "images/squareSets/2/1.png",
                "images/squareSets/2/2.png",
                "images/squareSets/2/3.png",
                "images/squareSets/2/4.png",
                "images/squareSets/2/5.png",
                "images/squareSets/2/6.png",
                "images/squareSets/2/7.png",
                "images/squareSets/2/8.png",
                "images/squareSets/2/9.png",
                "images/squareSets/2/10.png",
                "images/squareSets/2/11.png",
                "images/squareSets/2/12.png"
            ],
            ratings: [
                {
                    user: {
                        id: 2,
                        name: "John"
                    },
                    value: 5,
                    comment: "See, this is a very nice set!"
                }
            ]
        }
    ];

    return {
        create: create,
        getAll: getAll,
        getById: getById,
        getByUserId: getByUserId,
        remove: remove
    };

    function create(squareSet) {
        var squareSet = {
            id: nextId(),
            userId: squareSet.userId,
            title: squareSet.title,
            imageSources: squareSet.imageSources,
            ratings: squareSet.ratings
        }
        
        squareSets.push(squareSet);
        
        return squareSet;
    }

    function getAll() {
        return squareSets;
    }

    function getById(id) {
        for (var i = 0; i < squareSets.length; i++) {
            if (squareSets[i].id === id) {
                return squareSets[i];
            }
        }

        return null;
    }

    function getByUserId(id) {
        return squareSets.filter(function (value) {
            return value.userId === id
        });
    }
    
    function remove(id) {
        var removed;

        squareSets = squareSets.filter(function (element) {
            if (element.id !== id) {
                return true
            }

            removed = element;
            return false;
        });

        return removed;
    }    

    function nextId() {
        var id = 0;

        for (var i = 0; i < squareSets.length; i++) {
            if (id < squareSets[i].id) {
                id = squareSets[i].id;
            }
        }

        return id + 1;
    }
})();