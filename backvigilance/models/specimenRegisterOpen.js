const mongoose = require('mongoose')
let Schema = mongoose.Schema
//add usuario e senha
let userSchema = new Schema({
larva: {
    type: String,  
    required: false, 
},

pupa: {
    type: String,  
    required: false, 
},

quantidadeLarva:{
    type: String,  
    required: [true, "Informe a quantidade de larva"], 
},

codigoDeposito: {
    type: String,  
    required: false, 
},

deposito: {
    type: String,  
    required: [true, "Informe o deposito"], 
},

especie: {
    type: String,  
    required: false, 
}});

//nome da collection que eu quero colocar no banco
module.exports = mongoose.model('User', userSchema);