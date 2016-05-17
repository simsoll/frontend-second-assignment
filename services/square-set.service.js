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
            reviews: [
                {
                    user: {
                        id: 1,
                        username: "simsoll"
                    },
                    rating: 4,
                    comment: "This is cool!"
                },
                {
                    user: {
                        id: 3,
                        username: "yaya"
                    },
                    rating: 2,
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
            reviews: [
                {
                    user: {
                        id: 3,
                        username: "yaya"
                    },
                    rating: 0,
                    comment: "Booooring!"
                }
            ]
        },
        {
            id: 3,
            userId: 4,
            title: "Personas - Part 1",
            imageSources: [
                "images/squareSets/3/1.jpg",
                "images/squareSets/3/2.jpg",
                "images/squareSets/3/3.jpg",
                "images/squareSets/3/4.jpg",
                "images/squareSets/3/5.jpg",
                "images/squareSets/3/6.jpg",
                "images/squareSets/3/7.jpg",
                "images/squareSets/3/8.jpg",
                "images/squareSets/3/9.jpg",
                "images/squareSets/3/10.jpg",
                "images/squareSets/3/11.jpg",
                "images/squareSets/3/12.jpg",
                "images/squareSets/3/13.jpg",
                "images/squareSets/3/14.jpg",
                "images/squareSets/3/15.jpg",
                "images/squareSets/3/16.jpg",
                "images/squareSets/3/17.jpg",
                "images/squareSets/3/18.jpg",
                "images/squareSets/3/19.jpg",
                "images/squareSets/3/20.jpg"
            ],
            reviews: [
                {
                    user: {
                        id: 3,
                        username: "yaya"
                    },
                    rating: 5,
                    comment: "Just, amazing!"
                }
            ]
        },
        {
            id: 4,
            userId: 4,
            title: "Personas - Part 2",
            imageSources: [
                "images/squareSets/4/1.jpg",
                "images/squareSets/4/2.jpg",
                "images/squareSets/4/3.jpg",
                "images/squareSets/4/4.jpg",
                "images/squareSets/4/5.jpg",
                "images/squareSets/4/6.jpg",
                "images/squareSets/4/7.jpg",
                "images/squareSets/4/8.jpg",
                "images/squareSets/4/9.jpg",
                "images/squareSets/4/10.jpg",
                "images/squareSets/4/11.jpg",
                "images/squareSets/4/12.jpg",
                "images/squareSets/4/13.jpg",
                "images/squareSets/4/14.jpg",
                "images/squareSets/4/15.jpg",
                "images/squareSets/4/16.jpg",
                "images/squareSets/4/17.jpg",
                "images/squareSets/4/18.jpg"
            ],
            reviews: [
                {
                    user: {
                        id: 1,
                        username: "simsoll"
                    },
                    rating: 4,
                    comment: "Nice!"
                }
            ]
        }                
    ];

    return {
        addReview: addReview,
        create: create,
        getAll: getAll,
        getById: getById,
        getByUserId: getByUserId,
        remove: remove
    };
    
    function addReview(review) {
        var squareSet = getById(review.squareSet.id);
        squareSet.reviews.push({
            user: {
                id: review.user.id,
                username: review.user.username
            },
            rating: review.rating,
            comment: review.comment
        });
        
        return squareSet;
    }

    function create(squareSet) {
        var squareSet = {
            id: nextId(),
            userId: squareSet.userId,
            title: squareSet.title,
            imageSources: squareSet.imageSources,
            reviews: squareSet.reviews
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