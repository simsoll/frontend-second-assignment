'use strict';

module.exports = (function () {
    var arts = [
        {
            id: 1,
            userId: 2,
            title: "Proto 1",
            imageSource: "images/arts/1.png",
            reviews: [
                {
                    user: {
                        id: 1,
                        username: "simsoll"
                    },
                    rating: 5,
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
            ],
            squareSetId: 2
        },
        {
            id: 2,
            userId: 1,
            title: "Proto 2",
            imageSource: "images/arts/2.png",
            reviews: [],
            squareSetId: 3
        },
        {
            id: 3,
            userId: 1,
            title: "Proto 3",
            imageSource: "images/arts/3.png",
            reviews: [
                {
                    user: {
                        id: 3,
                        username: "yaya"
                    },
                    rating: 5,
                    comment: "See, this is a masterpiece!"
                }
            ],
            squareSetId: 1
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
        var art = getById(review.art.id);
        art.reviews.push({
            user: {
                id: review.user.id,
                username: review.user.username
            },
            rating: review.rating,
            comment: review.comment
        });

        return art;
    }

    function create(art) {
        var art = {
            id: nextId(),
            userId: art.userId,
            title: art.title,
            imageSource: art.img,
            state: art.state,
            squareSetId: art.squareSetId
        }

        arts.push(art);

        return art;
    }

    function remove(id) {
        var removed;

        arts = arts.filter(function (element) {
            if (element.id !== id) {
                return true
            }

            removed = element;
            return false;
        });

        return removed;
    }

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

    function getByUserId(id) {
        return arts.filter(function (value) {
            return value.userId === id
        });
    }

    function nextId() {
        var id = 0;

        for (var i = 0; i < arts.length; i++) {
            if (id < arts[i].id) {
                id = arts[i].id;
            }
        }

        return id + 1;
    }
})();