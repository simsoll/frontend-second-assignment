'use strict';

var userHandler = require('./handlers/user.handler.js');

module.exports = function(app) {

    // user routes
    app.post('/api/authenticate', userHandler.authenticate);
    app.get('/api/authenticated', userHandler.authenticated);
};
