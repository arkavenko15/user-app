angular.module("userApp").factory("UserService", function () {
  const STORAGE_KEY = "users";

  function getUsers() {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return users;
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  // ✅ Preload default users if not already stored
  function seedUsers() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const defaultUsers = [
        {
          id: Date.now().toString(),
          username: "admin1",
          first_name: "Alice",
          last_name: "Admin",
          email: "alice.admin@example.com",
          password: "admin1234",
          user_type: "Admin",
        },
        {
          id: (Date.now() + 1).toString(),
          username: "driver1",
          first_name: "Bob",
          last_name: "Driver",
          email: "bob.driver@example.com",
          password: "driver1234",
          user_type: "Driver",
        },
        {
          id: (Date.now() + 2).toString(),
          username: "admin2",
          first_name: "Charlie",
          last_name: "Admin",
          email: "charlie.admin@example.com",
          password: "password123",
          user_type: "Admin",
        },
      ];
      saveUsers(defaultUsers);
    }
  }

  // Seed users immediately
  seedUsers();

  return {
    getAll: getUsers,
    getById: function (id) {
      return getUsers().find((u) => u.id === id);
    },
    create: function (user) {
      const users = getUsers();
      if (users.find((u) => u.username === user.username)) {
        return { error: "Username already exists" };
      }
      user.id = Date.now().toString();
      users.push(user);
      saveUsers(users);
      return { success: true };
    },
    update: function (id, updated) {
      let users = getUsers();
      const idx = users.findIndex((u) => u.id === id);
      if (idx !== -1) {
        if (updated.username !== users[idx].username && users.find((u) => u.username === updated.username)) {
          return { error: "Username already exists" };
        }
        users[idx] = updated;
        saveUsers(users);
        return { success: true };
      }
      return { error: "User not found" };
    },
    delete: function (id) {
      const users = getUsers().filter((u) => u.id !== id);
      saveUsers(users);
    },
  };
});
