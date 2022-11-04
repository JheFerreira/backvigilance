const User = require('./models/User');

let user = new User();

user.cpf = '333.333.333-96'
user.telefone = "(33) 9289-7726";

let error = user.validateSync();

console.log(error.message)