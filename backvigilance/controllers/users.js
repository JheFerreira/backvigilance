
let User = require('../models/User');

module.exports ={


//Buscar todos elementos (Usuarios)
    getAllUsers : (req, res, next) =>{
        User.find()
        .then(users => {
            return res.status(200).json(users);
            })   
        .catch(error =>{
            return res.status(500).json({msg: "Erro ao buscar usuários!", error: error.message})  
            });
    },

   getUserByID: async (req, res, next)=>{
        let idUser = req.params.id;
try{
        let user = await User.findById(idUser) // User.find({_id: idUser})
    if(user != null)
        return res.status(200).json(user)
    else
    return res.status(500).json({msg: "Erro ao buscar usuário!", error: "Usuário não existe!"})
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
        newUser.email = req.body.email;
        newUser.senha = req.body.senha;
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

   updateUser: async (req, res, next)=>{
        let idUser = req.params.id;

        let userUpdate = {} ;
        if(req.body.nome) userUpdate.nome = req.body.nome;
        if(req.body.cpf) userUpdate.cpf = req.body.cpf;
        if(req.body.telefone) userUpdate.telefone = req.body.telefone;
        if(req.body.email) userUpdate.email = req.body.email;
        if(req.body.senha) userUpdate.senha = req.body.senha;

       try{
            await User.updateOne ({_id: idUser}, userUpdate)

            return res.status(200).json({msg: "Usuário atualizado com sucesso"});

       }catch(error){
        res.status(500).json({msg: "Erro ao atualizar usuário ! ", error: error.message}) 

       }
       
    }, 


    deleteUser: (req, res, next)=>{
    let idUser = req.params.id;
    
    User.findByIdAndDelete(idUser)
    .then(userDeleted =>{
        res.status(200).json({msg: "Usuário removido com sucesso" , user: userDeleted});
    })
    .catch(error =>{
        res.status(500).json({msg: "Erro ao remover usuário ! ", error: error.message})   

    })
    }
}

            
    
    
    
       
   
     
   
