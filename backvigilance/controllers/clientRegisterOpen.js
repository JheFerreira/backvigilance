const mongoose = require('mongoose')
let Schema = mongoose.Schema
//add usuario e senha
let userSchema = new Schema({
nome: {
    type: String,  
    required: [true, "O Nome é obrigatório"], 
},

cpf:  {
    type: String, 
    required: [true, "O CPF é obrigatório"], 
    unique: true, 
    match: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
},

telefone: {
    type: String,
    required: false,
    defaut: '', 
    validate:{
        validator: function(valor){
            return /^(\(\d{2}\) 9?\d{4}-\d{4})|$/.test(valor)
        },
        message: props => `${props.value} não é um telefone válido!`
    }
},

email:{
    type: String,
    required: [true, 'O E-mail é obrigatório'],
    validate:{
        validator: function(valor){
return /^([a-zA-Z]([a-zA-Z]|[0-9]|\-||_||.)+\@[a-zA-Z]{3,}\.(com|biz|io|me)(\.[a-zA-Z]{2,3})?)$/
        }
    }
},

senha: {
    type: String,
    required: [true, 'A Senha é obrigatória'],
    validate:{
        validator: function(valor){
        } 
    }
}});

//nome da collection que eu quero colocar no banco
module.exports = mongoose.model('User', userSchema);
