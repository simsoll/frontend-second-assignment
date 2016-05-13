'use strict';

module.exports = (function () {
    var arts = [
        {
            id: 1,
            userId: 2,
            title: "Proto 1",
            imageSource: "images/arts/1.png",
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
            ],
            squareSetId: 2
        },
        {
            id: 2,
            userId: 1,
            title: "Proto 2",
            imageSource: "images/arts/2.png",
            ratings: [],
            squareSetId: 3
        },
        {
            id: 3,
            userId: 1,
            title: "Proto 3",
            imageSource: "images/arts/3.png",
            ratings: [
                {
                    user: {
                        id: 2,
                        name: "John"
                    },
                    value: 5,
                    comment: "See, this is a masterpiece!"
                }
            ],
            squareSetId: 1
        }
    ];

    return {
        getAll: getAll,
        getById: getById,
    };

    function getAll() {
        return arts;
    }
    
    function getById(id) {
        for (var i = 0; i < arts.length; i++) {
            if (arts[i].id === id) {
                return arts[i];
            }
        }
        
        return null;
    }

})();