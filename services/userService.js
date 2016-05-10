'use strict';

module.exports = (function () {
    var users = [
        {
            id: 1,
            name: 'Simon Søllingvraa',
            username: 'simsoll',
            email: 'asdf@asdf.com',
            password: 'asdf',
            isAdmin: 'false'            
        },
        {
            id: 2,
            name: 'Mr Admin',
            username: 'chef',
            email: 'admin@admin.com',
            password: 'admin',
            isAdmin: 'true'            
        },
        {
            id: 1,
            name: 'Mr Ordinary',
            username: 'yaya',
            email: 'ordinary@ordinary.com',
            password: 'ordinary',
            isAdmin: 'false'            
        }
    ]
      
    var isAuthenticated = false;      
        
    return {
        authenticate: authenticate,
        authenticated: authenticated
    };
    
    function authenticate(username, password) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === username && users[i].password === password) {
                isAuthenticated = true;
                return isAuthenticated;
            }
        }
        
        isAuthenticated = false;
        return isAuthenticated;
    }
    
    function authenticated() {
        return isAuthenticated;
    }
})();