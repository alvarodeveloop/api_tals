var app = require('./app'); 
var models = require('./models');
var path = require('path');
var http = require('http');

var port = process.env.PORT || 3789;

models.sequelize.sync().then(runserver);

function runserver(){

  var httpServer = http.createServer(app);
    httpServer.listen(port, function(){
    console.log('Servidor Node y Express está corriendo en el puerto' + port);
    })


    const promise = new Promise((resolve,rejected) => {

    	models.Profile.findAll().then( function(profiles) { 
        if (profiles) {
           if (profiles.length == 0){
           models.Profile.create({name : 'ADMIN', description: 'ADMINISTRADOR DEL SISTEMA' });
           models.Profile.create({name : 'EMPRESA', description: 'EMPRESAS DEL SISTEMA' });
           models.Profile.create({name : 'USUARIO', description: 'USUARIOS' });
           resolve()
          }
          else
          {
            resolve() 
          }
        } 
      })

        models.TipoProfile.findAll().then( function(tipoprofiles) { 
        if (tipoprofiles) {
           if (tipoprofiles.length == 0){
           models.TipoProfile.create({id: 1, profile_id: 1, name : 'ADMINISTRADOR', description: 'ADMIN DEL SISTEMA' });
           models.TipoProfile.create({id: 2, profile_id: 2, name : 'EMPRESA BASICA', description: 'CON PUBLICIDAD IMPUESTA' });
           models.TipoProfile.create({id: 3, profile_id: 2, name : 'EMPRESA MEDIA', description: 'EMPRESA CON PUBLICIDAD MIXTA' });
           models.TipoProfile.create({id: 4, profile_id: 2, name : 'EMPRESA TOTAL', description: 'EMPRESA CON SU PROPIA PUBLICIDAD' });
           models.TipoProfile.create({id: 5, profile_id: 3, name : 'USUARIO REGISTRADO', description: 'USUARIO DEL SISTEMA REGISTRADO POR LA EMPRESA' });
           models.TipoProfile.create({id: 6, profile_id: 3, name : 'USUARIO', description: 'USUARIO DEL SISTEMA' });
           resolve()
          }
          else
          {
            resolve() 
          }
        } 
      })

      models.Statu.findAll().then( function(statu) { 
        if (statu) {
           if (statu.length == 0){
           models.Statu.create({id: 1, tipo_id: 1,  name : 'ACTIVO',      description: 'USUARIO ACTIVO' });
           models.Statu.create({id: 2, tipo_id: 1,  name : 'DESACTIVADO', description: 'USUARIO DESACTIVADO' });
           models.Statu.create({id: 3, tipo_id: 2,  name : 'ABIERTO',     description: 'TICKET ABIERTO' });
           models.Statu.create({id: 4, tipo_id: 2,  name : 'EN ESPERA',   description: 'TICKET EN ESPERA' });
           models.Statu.create({id: 5, tipo_id: 2,  name : 'CERRADO',     description: 'TICKET CERRADO' });
           models.Statu.create({id: 6, tipo_id: 2,  name : 'ANULADO',     description: 'TICKET ANULADO' });
           
           resolve()
          }
          else
          {
            resolve() 
          }
        } 
      })


        models.User.findAll().then( function(users) { 
          if (users) {
             if (users.length == 0){


             //6599319 

             models.User.create({nombre : 'ADMINISTRADOR', correo: 'darwinerc92@gmail.com', 
                                 password :'$2b$10$Lq2iDGK5M2QvHAT./mxZv.hvVS.cvPWazNYVa3aKzFAA2H4gz15Em',
                                 profile_id:1, tipo_profile_id: 1, email_verify: true, statu_id: 1});
             }
          } 

        });




    });
    	



}