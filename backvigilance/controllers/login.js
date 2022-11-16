
const usuario = require('../models/usuario.js');
const usuario = require('../models/usuario.js');
let User = require('../models/usuario.js');

module.exports ={
signup: (req, res, next)=>{
    const{ username, password }= req.body;

    const usuario = new usuario ({
        username, password
    });

    usuario.save()
    .then(usuarioSaved =>{
        return res.status(201).json(usuarioSaved)
    })
    .cath(error =>{
        return res.status(500).json(error.message);
    })
},


login: (req, res, next)=>{
    const{ username, password }= req.body;

    //let usuario = await usuario.findOne({'username': username})

},
logout: (req, res, next)=>{

}

};