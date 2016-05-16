'use strict';

var userHandler = require('./handlers/user.handler.js');
var artHandler = require('./handlers/art.handler.js');
var squareSetHandler = require('./handlers/square-set.handler.js');

module.exports = function(app) {

    // user routes
    app.post('/api/user/authenticate', userHandler.authenticate);
    app.get('/api/user/authenticated', userHandler.authenticated);
    app.get('/api/user/logOut', userHandler.logOut);
    app.post('/api/user/signUp', userHandler.signUp);
    app.post('/api/user/create', userHandler.create);
    app.post('/api/user/remove', userHandler.remove);
    app.put('/api/user/update', userHandler.update);
    app.get('/api/user/getAll', userHandler.getAll);

    // art routes
    app.get('/api/art/getAll', artHandler.getAll);
    app.get('/api/art/getById', artHandler.getById);   
    app.get('/api/art/getByUserId', artHandler.getByUserId);  
    app.post('/api/art/create', artHandler.create); 
    app.post('/api/art/remove', artHandler.remove);
    
    // square set routes
    app.get('/api/squareSet/getAll', squareSetHandler.getAll);
    app.get('/api/squareSet/getById', squareSetHandler.getById);     
    app.get('/api/squareSet/getByUserId', squareSetHandler.getByUserId);     
    app.post('/api/squareSet/create', squareSetHandler.create);
    app.post('/api/squareSet/remove', squareSetHandler.remove);
       
};
