'use strict';
var userService = require('../services/user.service.js');


module.exports.authenticate = function (request, response) {
    var body = request.body;

    var authenticationResult = userService.authenticate(body.username, body.password);

    if (authenticationResult.success) {
        return response.status(200).json(authenticationResult);
    }

    return response.status(500).json(authenticationResult);
};

module.exports.authenticated = function (request, response) {
    return response.status(200).json(userService.authenticated());
}

module.exports.logOut = function(request, response) {
    userService.logOut();
    
    return response.status(200).json({success: true});
}

module.exports.signUp = function(request, response) {
    var user = userService.signUp(request.body.user);
    
    return response.json(user);
}

module.exports.create = function(request, response) {
    var user = userService.create(request.body.user);
    
    return response.json(user);
}