const user = {
    name: 'Diego',
    lastName: 'Alves',
    fullName: function() {
        return `${this.name} ${this.lastName}`
    }
}

const user2 = {
    name: 'Maria',
    lastName: 'Silva',
    fullName: function() {
        return `${this.name} ${this.lastName}`
    }
}

class User {
    #name;
    #lastName;

    constructor(name, lastName) {
        this.#name = name;
        this.#lastName = lastName;
    }

    getFullName() {
        return `${this.#name} ${this.#lastName}`;
    }
}

module.exports = newUser;
