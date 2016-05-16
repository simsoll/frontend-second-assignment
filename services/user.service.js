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

    var activeUser = null;

    return {
        authenticate: authenticate,
        authenticated: authenticated,
        create: create,
        getAll: getAll,
        getById: getById,
        logOut: logOut,
        signUp: signUp,
        remove: remove,
        update: update
    };

    function signUp(user) {
        var user = create(user);
        activeUser = user;
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

    function getAll() {
        return users;
    }

    function getById(id) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                return users[i];
            }
        }

        return null;
    }
    
    function authenticate(username, password) {
        activeUser = null;

        for (var i = 0; i < users.length; i++) {
            if (users[i].username === username && users[i].password === password) {
                activeUser = {
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
        if (activeUser) {
            return {
                success: true,
                user: activeUser
            }
        }

        return {
            success: false
        };
    };

    function logOut() {
        activeUser = null;
    }

    function remove(id) {
        var removed;

        users = users.filter(function (element) {
            if (element.id !== id) {
                return true
            }

            removed = element;
            return false;
        });

        return removed;
    }

    function update(user) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === user.id) {
                users[i] = user;
                return users[i];
            }
        }
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