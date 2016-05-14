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

module.exports.logOut = function(request, reponse) {
    userService.logOut();
    
    return reponse.status(200).json({success: true});
}