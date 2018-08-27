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

    });
    	



}