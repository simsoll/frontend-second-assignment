'use strict';

var userManagement = require('./handlers/userManagement.js');

module.exports = function(app) {

    // userManagement routes
    app.post('/api/authenticate', userManagement.authenticate);
    app.get('/api/authenticated', userManagement.authenticated);
    
};
