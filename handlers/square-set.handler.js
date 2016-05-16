'use strict';
var squareSetService = require('../services/square-set.service.js');


module.exports.getAll = function (request, response) {
    var squareSets = squareSetService.getAll();
    
    return response.json(squareSets);
};

module.exports.getById = function (request, response) {
    var id = parseInt(request.query.id);
    var squareSet = squareSetService.getById(id);
    
    return response.json(squareSet);
}

module.exports.getByUserId = function (request, response) {
    var id = parseInt(request.query.id);
    var squareSets = squareSetService.getByUserId(id);
    
    return response.json(squareSets);
}

module.exports.create = function(request, response) {
    var squareSet = squareSetService.create(request.body.squareSet);
    
    return response.json(squareSet);    
}

module.exports.remove = function(request, response) {
    var squareSet = squareSetService.remove(request.body.id);
    
    return response.json(squareSet);
}

module.exports.addReview = function(request, response) {
    var squareSet = squareSetService.addReview(request.body.review);
    
    return response.json(squareSet);
}