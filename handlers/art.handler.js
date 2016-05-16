'use strict';
var artService = require('../services/art.service.js');


module.exports.getAll = function (request, response) {
    var arts = artService.getAll();
    
    return response.json(arts);
};

module.exports.getById = function (request, response) {
    var id = parseInt(request.query.id);
    var art = artService.getById(id);
    
    return response.json(art);
}

module.exports.getByUserId = function (request, response) {
    var id = parseInt(request.query.id);
    var arts = artService.getByUserId(id);
    
    return response.json(arts);
}

module.exports.create = function(request, response) {
    var art = artService.create(request.body.art);
    
    return response.json(art);    
}

module.exports.remove = function(request, response) {
    var user = artService.remove(request.body.id);
    
    return response.json(user);
}