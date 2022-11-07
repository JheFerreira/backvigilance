
let User = require('../models/User');

module.exports ={
    //Buscar todos elementos (Usuarios)
    getAllUsers : (req, res, next) =>{
        User.find()
            .then(users=>{
            return res.status(200).json(users);
            })   
            .catch(error =>{
            return res.status(500).json({msg: "Erro ao buscar usuários!", error: error.message})  
            }

            )
    },

    getUserByID: async (req, res, next)=>{
        let idUser = req.params.id;
try{
    let user = await User.findById(idUser) // User.find({_id: idUser})
    return res.status(200).json(user)
} catch(error){
    return res.status(500).json({msg: "Erro ao buscar usuário!", error: error.message})
}
    },

        /*let usuarios = usersData.filter(function(usuario){
            return usuario.id == idUser;
        });
        console.log(usuarios);
        if(usuarios.length ==0 ){
            res.status(404).json({msg: "Usuário não encontrado!"})
        }else{
            res.status(200).json(usuarios[0])
        }     
    },*/
    addUser : async (req, res, next) =>{
        let newUser = new User();
        newUser.nome =  req.body.nome;
        newUser.cpf = req.body.cpf;
        newUser.telefone = req.body.telefone ? req.body.telefone: '';
        // duas formas de trabalhar
    /* newUser.save()
        .then(savedUser =>{
            return res.status(201).json({msg: "Usuário adicionado com sucesso !" , user: savedUser})
        })
        .catch (error =>{
            return res.status (500).json({msg: "Erro ao salvar usuário" , error: error.message})

        })*/

        try{
            let savedUser = await newUser.save();
            return res.status(201).json({msg: "Usuário adicionado com sucesso !" , user: savedUser})
        }catch (error){
            return res.status (500).json({msg: "Erro ao salvar usuário" , error: error.message})
        }
    },
   /* updateUser: (req, res, next)=>{
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
    },*/

  /*  deleteUser: (req, res, next)=>{
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
    }*/
}
