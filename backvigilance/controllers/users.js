
let User = require('../models/User');


let usersData = [
    {'id': 1, "nome": "Jessica", "cpf": "111.111.111-11" },
    {'id': 2, "nome": "Ana Paula", "cpf": "222.222.222-22" } 
    
];

let nextID = 3;

module.exports ={
    //Buscar todos elementos (Usuarios)
    getAllUsers : (req, res, next) =>{
        res.status(200).json(usersData);
    },
    getUserByID: (req, res, next)=>{
        let idUser = req.params.id;

        let usuarios = usersData.filter(function(usuario){
            return usuario.id == idUser;
        });
        console.log(usuarios);
        if(usuarios.length ==0 ){
            res.status(404).json({msg: "Usuário não encontrado!"})
        }else{
            res.status(200).json(usuarios[0])
        }     
    },
    addUser : (req, res, next) =>{
        let nome = req.body.nome;
        let cpf = req.body.cpf;

        let newUser = new User(nextID, nome, cpf);
        nextID++;

        usersData.push(newUser);
        return res.status(201).json({msg: "Usuário adicionado com sucesso!", user: newUser});

    },
    updateUser: (req, res, next)=>{
        let idUser = req.params.id;
        let userData = req.body;
        let found = false;

        
        User.forEach((user, index) => {
            if(user.id == idUser){
                found = true;
                user[index].nome = userData.nome;
                user[index].cpf = userData.cfp;
                res.status(200).json({msg: "Usuário alterado com sucesso"});
            }
        });
        if(!found) res.status(404).json({msg: "Usuário não encontrado"});     
    },

    deleteUser: (req, res, next)=>{
    let idUser = req.params.id;
    let found = false;

    User.forEach((user, index) => {
        if(user.id == idUser){
            found = true;
            user.splice(index, 1)
            console.log("Users: ", user)
            res.status(200).json({msg: "Usuário removido com sucesso"});
        }
    });
    if(!found) res.status(404).json({msg: "Usuário não encontrado"});     
    }
}