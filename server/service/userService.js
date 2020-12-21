const User = require("../model/user");

class UserPool {
  constructor() {
    this.users = []
  }

  newUser(id, name) {
    name = name.trim().toLowerCase();
    const existingUser = this.users.find((tempUser) => tempUser.name === name);
    if (!name) return { error: 'Username is required.' };
    if (existingUser) return { error: 'Username is taken.' };

    let user = new User(id, name)
    this.users.push(user)
    return user
  }

  getUser(name) {
    return this.users.find((user) => user.name === name);
  }

  removeUser(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (this.users[index] !== undefined) {
      this.users[index].machine.plugOutMachine();
    }
    if (index !== -1) return this.users.splice(index, 1)[0];
  }
}

module.exports = UserPool;