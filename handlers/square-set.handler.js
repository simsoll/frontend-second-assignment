'use strict';
var squareSetService = require('../services/square-set.service.js');


module.exports.getAll = function (request, response) {
    var squareSets = squareSetService.getAll();
    
    return response.json(squareSets)
};

module.exports.getById = function (request, response) {
    var id = parseInt(request.query.id);
    var squareSet = squareSetService.getById(id);
    
    return response.json(squareSet)
}