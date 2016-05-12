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
    ];
      
    var currentUser = null;      
        
    return {
        authenticate: authenticate,
        authenticated: authenticated,
        hasAdminRights: hasAdminRights
    };
    
    function authenticate(username, password) {
        currentUser = null;
        
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === username && users[i].password === password) {
                currentUser = {
                    name: users[i].name,
                    username: users[i].username,
                    email: users[i].email,
                    isAdmin: users[i].isAdmin
                };
                break;
            }
        }
        
        return authenticated();
    };
    
    function authenticated() {
        if (currentUser) {
            return {
                success: true,
                user: currentUser
            }
        }
        
        return {
            success: false    
        };
    };
    
    function hasAdminRights() {
        if (!currentUser) {
            return false;
        }
        
        return currentUser.isAdmin;
    }
})();