
const mongoose = require('mongoose')
let Schema = mongoose.Schema
let jwt = require('jsonwebtoken');
let bcrypt = require ('bcrypt');
const segredo = require('../config/chaveToken');

let usuarioSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true, 
        trim: true
    },

    password: {
        type: String,
        required: true, 
        minLength: 8,
    },

    token:{
        type: String
    },

    group:{
        type: String, 
        required: true,
        enum:['user','admin'],
        default: 'user'
    }
});

usuarioSchema.pre('save', function(next){
    const colaborador = this;

    if(colaborador.isModified('password')|| colaborador.isNew){
        //Criptografar a senha
        bcrypt.hash(colaborador.password, 8)
        .then(hash =>{
            colaborador.password = hash;
            next();
        })
        .catch(error =>{
            next(error);
        })
    }else{
        return next();
    }
});

usuarioSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, function(err, isMatch){
        if(err) return cb(err);
        else cb(null, isMatch);
    });
}

usuarioSchema.methods.generateAuthToken = function(){
    return new Promisse ((sucess, reject)=>{
        const colaborador = this;
        const token = jwt.sign(
            {_id: colaborador._id},
            segredo.segredoToken,
            {expiresIn: '5d'}   
        );
        colaborador.token = token;

        colaborador.save()
        .then( usuario =>{
            success({ success: true, token: token})
        })
        .catch(error =>{
            reject({sucess: false, token: null, error: error.message})
        });
    });
}

module.exports = mongoose.model('Usuario', usuarioSchema);

