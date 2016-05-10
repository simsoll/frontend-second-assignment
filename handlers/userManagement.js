'use strict';
var userService = require('../services/userService.js');


module.exports.authenticate = function(request, response) {
    var body = request.body;
        
    if (userService.authenticate(body.username, body.password)) {
        return response.status(200).json({
            status: 'Login succeeded!'
        });
    } 
    return response.status(500).json({
            error: 'Login failed!'
            });      
};

module.exports.authenticated = function(request, reponse) {
    if (userService.authenticated) {
        return response.status(200).json({
            status: true
        });
    }  
    
    return res.status(200).json({
        status: false
    })
}