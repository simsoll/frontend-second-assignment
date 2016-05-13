'use strict';
var artService = require('../services/art.service.js');


module.exports.getAll = function (request, response) {
    var arts = artService.getAll();
    
    return response.json(arts)
};

module.exports.getById = function (request, response) {
    var id = parseInt(request.query.id);
    var art = artService.getById(id);
    
    return response.json(art)
}