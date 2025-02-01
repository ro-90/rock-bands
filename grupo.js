const user = require('./POO');
console.log(user.getFullName());
user.name = 'Maria';
user.getFullName();
user.lastName = 'Silva';
user.getFullName();
console.log(user);