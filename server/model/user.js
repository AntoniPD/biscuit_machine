const Machine = require("../biscuit_machine/machine");

class User {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.machine = new Machine()
    }
}

module.exports = User