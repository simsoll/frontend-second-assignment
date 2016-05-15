'use strict';

module.exports = (function () {
    var users = [
        {
            id: 1,
            name: 'Simon Søllingvraa',
            username: 'simsoll',
            email: 'asdf@asdf.com',
            password: 'asdf',
            isAdmin: false
        },
        {
            id: 2,
            name: 'Mr Admin',
            username: 'chef',
            email: 'admin@admin.com',
            password: 'admin',
            isAdmin: true
        },
        {
            id: 3,
            name: 'Mr Ordinary',
            username: 'yaya',
            email: 'ordinary@ordinary.com',
            password: 'ordinary',
            isAdmin: false
        }
    ];

    var currentUser = null;

    return {
        authenticate: authenticate,
        authenticated: authenticated,
        signUp: signUp,
        create: create,
        logOut: logOut
    };

    function signUp(user) {
        var user = create(user);
        currentUser = user;
        return user;
    }

    function create(user) {
        var user = {
            id: nextId(),
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
            isAdmin: false
        };

        users.push(user)

        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        };
    }

    function authenticate(username, password) {
        currentUser = null;

        for (var i = 0; i < users.length; i++) {
            if (users[i].username === username && users[i].password === password) {
                currentUser = {
                    id: users[i].id,
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

    function logOut() {
        currentUser = null;
    }

    function nextId() {
        var id = 0;

        for (var i = 0; i < users.length; i++) {
            if (id < users[i].id) {
                id = users[i].id;
            }
        }

        return id + 1;
    }
})();