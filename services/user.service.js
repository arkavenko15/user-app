angular.module('userApp')
  .factory('UserService', function() {
    const STORAGE_KEY = 'users';

    function getUsers() {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    }

    function saveUsers(users) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }

    return {
      getAll: function() {
        return getUsers();
      },
      getById: function(id) {
        return getUsers().find(u => u.id === id);
      },
      create: function(user) {
        let users = getUsers();
        if (users.find(u => u.username === user.username)) {
          return { error: 'Username already exists' };
        }
        user.id = Date.now().toString();
        users.push(user);
        saveUsers(users);
        return { success: true };
      },
      update: function(id, updated) {
        let users = getUsers();
        const idx = users.findIndex(u => u.id === id);
        if (idx !== -1) {
          if (
            updated.username !== users[idx].username &&
            users.find(u => u.username === updated.username)
          ) {
            return { error: 'Username already exists' };
          }
          users[idx] = updated;
          saveUsers(users);
          return { success: true };
        }
        return { error: 'User not found' };
      },
      delete: function(id) {
        let users = getUsers().filter(u => u.id !== id);
        saveUsers(users);
      }
    };
  });
