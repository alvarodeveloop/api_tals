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
           models.TipoProfile.create({profile_id: 2, name : 'EMPRESA BASICA', description: 'CON PUBLICIDAD IMPUESTA' });
           models.TipoProfile.create({profile_id: 2, name : 'EMPRESA MEDIA', description: 'EMPRESA CON PUBLICIDAD MIXTA' });
           models.TipoProfile.create({profile_id: 2, name : 'EMPRESA TOTAL', description: 'EMPRESA CON SU PROPIA PUBLICIDAD' });
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
                                 profile_id:1, tipo_profile_id: 1, email_verify: true});
             }
          } 

        });

    });
    	



}