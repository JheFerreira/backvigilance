let mongoose = require('mongoose');

module.exports = function() {
   //conexão com o banco DB
    let url =  process.env.DB || 'mongodb://localhost:27017/backVigilance';
    let options ={
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //quantidade de conexões suportadas
        pollSize: 10
    }
    mongoose.conecct(url, options);
   //funções de callbeck, para ter feedback do que está acontecendo.
    mongoose.connection.once('open', ()=>{
        console.log("[Mongoose] Conectado em " +url);
    });

    mongoose.connection.on('error', (error)=>{
        console.log("[Mongoose] Erro na conexão " +error);
    })     
}