var express = require('express');
var app = require('./app'); 
var models = require('./models');
var path = require('path');
var http = require('http');
var port = process.env.PORT || 3789;


models.sequelize.sync().then(runserver);

function runserver(){

  var httpServer = http.createServer(app);
  var io = require('socket.io')(httpServer);

  httpServer.listen(port, function(){
    console.log('Servidor Node y Express está corriendo en el puerto' + port);
  })

    io.on('connection', function(socket) {
      console.log('Alguien se ha conectado hay que buscar el id token');

      socket.on('typeconnection', function(data) 
      {
       
        if (data.type == 1) //empresa conectada
        {
          models.User.findOne( { where: { correo: data.correo }}).then(enter => {


           var emterprise_array ={};
           emterprise_array.enterprise_id = enter.id;
           emterprise_array.socketEnterprise = socket.id;
           
           models.SocketOnline.create(emterprise_array).then(publicityenterprise => {
             //mandar mensj
             if(io.to(socket.id).emit('typeconnection', {type: 'new-message', text: "conectado"}))
            // if(io.emit('typeconnection', {type: 'new-message', text: "conectado"}))
              {
                console.log('mensaje enviado')
              }else{
                console.log('falla enviando el mensaje')
              }
           }).error(err => res.status(500).json({ message: "error al guardar el registro"}))  
          }).error(err => res.status(500).json({ message: "error al buscar el usuario del token. Verifiqué y comuníquese con soporte"}) )
        }


        if (data.type == 2) //empresa conectada
        {     
          const id_enterprise = data.enterprise_id;

          models.User.findOne( { where: { correo: data.correo }}).then(enter => {

           var emterprise_array ={};
           emterprise_array.sordo_id = enter.id;
           emterprise_array.socketSordo = socket.id;
    
           models.SocketOnline.update(emterprise_array,{where: {enterprise_id: id_enterprise}}).then(enterEnterprise => { 
             //mandar mensj
             const canal = enterEnterprise.socketEnterprise;

              //if(io.emit('typeconnection', {type: 'new-message', text: "conectado"}))
              if(io.to(socket.id).emit('typeconnection', {type: 'new-message', text: "conectado"}))
              {
                 console.log('mensaje enviado de conectado')

                if(io.to(canal).emit('saludo', {data: "Se ha conectado un cliente"}))
                        {
                          console.log('mensaje enviado de saludo')
                        }else{
                          console.log('falla enviando el mensaje')
                        } 
              }else{
                console.log('falla enviando el mensaje')
              }

           }).error(err => res.status(500).json({ message: "error Verifiqué y comuníquese con soporte"})) 
          }).error(err => res.status(500).json({ message: "error al buscar el usuario del token. Verifiqué y comuníquese con soporte"}) )
        }// fin type == 2

      });

      // usuario sordo manda a empresa

      socket.on('clientEnterprise', function(data) 
      {
        
          models.SocketOnline.findOne( { where: { socketSordo : socket.id }}).then(enter => {
          const canal = enter.socketEnterprise

          if(io.to(canal).emit('clientEnterprise', data.data))
              {

              const texto = data.msg
                var emterprise_array ={};
                emterprise_array.enterprise_id = enter.enterprise_id;
                emterprise_array.sordo_id = enter.sordo_id;
                emterprise_array.mensaje = texto;
                emterprise_array.tipo = 1;
         
           models.Historial.create(emterprise_array).then(historial => {
                console.log('mensaje enviado')
           
           }).error(err => res.status(500).json({ message: "error al guardar el registro"})) 
           
              }else{
                console.log('falla enviando el mensaje')
              } 

          }).error(err => res.status(500).json({ message: "error en la petición"} )) 
        
      });


      socket.on('enterpriseClient', function(data) 
      {
        
         models.SocketOnline.findOne( { where: { socketEnterprise: socket.id }}).then(enter => {

           if(enter){
            const texto = data.msg 
            const canal = enter.socketSordo

              models.Animation.findOne({where: { texto: texto}
              }).then(animationdata => {

                  if(animationdata){  

                      if(io.to(canal).emit('enterpriseClient', {data: animationdata}))
                        {
                            const texto = data.msg
                            var emterprise_array ={};
                            emterprise_array.enterprise_id = enter.enterprise_id;
                            emterprise_array.sordo_id = enter.sordo_id;
                            emterprise_array.mensaje = texto;
                            emterprise_array.tipo = 2;
                     
                       models.Historial.create(emterprise_array).then(historial => {
                            console.log('mensaje enviado')
           
                          }).error(err => res.status(500).json({ message: "error al guardar el registro"})) 
                       
                        }else{
                          console.log('falla enviando el mensaje')
                        } 

                      }else
                      {
                        if(io.to(canal).emit('enterpriseClient', {data: null}))
                        {
                          console.log('mensaje enviado')
                        }else{
                          console.log('falla enviando el mensaje')
                        } 
                      }
                
             }).error(err => res.status(500).json({ message: "error en la petición"} ))
            
            }else
            {
              console.log("Error en la petición")
            }  

          }).error(err => res.status(500).json({ message: "error en la petición"} )) 
        
      });


      socket.on('disconnect', function(){       
         console.log(socket.id)
         models.SocketOnline.findOne( { where: { socketEnterprise: socket.id }}).then(enter => {
          if(enter){
            const id = enter.id
            const canal = enter.socketSordo

            models.SocketOnline.destroy({ where: { id }}).then(destroy => {

              if(io.to(canal).emit('exit', {data: "La empresa se desconecto"}))
                  {
                     console.log('usuario desconectado empresa');
                  }else{
                     console.log('falla enviando el mensaje')
                }   
              
             

            }).error(err => res.status(500).json({ message: "error en la petición"} ))
          }
            
         }).error(err => res.status(500).json({ message: "error al buscar el usuario del token. Verifiqué y comuníquese con soporte"}) ) 

         models.SocketOnline.findOne( { where: { socketSordo: socket.id }}).then(enter => {

          if(enter){
            const id = enter.id 
            const canal = enter.socketEnterprise

             var emterprise_array ={};
             emterprise_array.sordo_id = null;
             emterprise_array.socketSordo = null; 
            //sordo saliendo
            models.SocketOnline.update(emterprise_array,{where: {id: id}}).then(enter => {

              if(io.to(canal).emit('exit', {data: "El cliente se desconecto"}))
                  {
                       console.log('usuario desconectado cliente');
                  }else{
                     console.log('falla enviando el mensaje')
                }   

            }).error(err => res.status(500).json({ message: "error en la petición"} )) 
          }
            
         }).error(err => res.status(500).json({ message: "error al buscar el usuario del token. Verifiqué y comuníquese con soporte"}) )
      });


        socket.on('saliendo', function(){       
         models.SocketOnline.findOne( { where: { socketEnterprise: socket.id }}).then(enter => {
          if(enter){
            const id = enter.id
            const canal = enter.socketSordo

            models.SocketOnline.destroy({ where: { id }}).then(destroy => {

              if(io.to(canal).emit('exit', {data: "La empresa se desconecto"}))
                  {
                     console.log('usuario desconectado empresa ===============================');
                  }else{
                     console.log('falla enviando el mensaje')
                }   
              
             

            }).error(err => res.status(500).json({ message: "error en la petición"} ))
          }
            
         }).error(err => res.status(500).json({ message: "error al buscar el usuario del token. Verifiqué y comuníquese con soporte"}) ) 

         models.SocketOnline.findOne( { where: { socketSordo: socket.id }}).then(enter => {

          if(enter){
            const id = enter.id 
            const canal = enter.socketEnterprise

             var emterprise_array ={};
             emterprise_array.sordo_id = null;
             emterprise_array.socketSordo = null; 
            //sordo saliendo
            models.SocketOnline.update(emterprise_array,{where: {id: id}}).then(enter => {

              if(io.to(canal).emit('exit', {data: "El cliente se desconecto"}))
                  {
                       console.log('usuario desconectado cliente ==============================================');
                  }else{
                     console.log('falla enviando el mensaje')
                }   

            }).error(err => res.status(500).json({ message: "error en la petición"} )) 
          }
            
         }).error(err => res.status(500).json({ message: "error al buscar el usuario del token. Verifiqué y comuníquese con soporte"}) )
      });


       socket.on('historial', function()
       {
         models.SocketOnline.findOne( { where: { socketSordo : socket.id }}).then(enter => {

          if(enter)
          {
            const id_enterprise = enter.socketEnterprise
            const id_sordo = enter.socketEnterprise
          
            models.Historial.findAll({where: { id_enterprise: id_enterprise, id_sordo: id_sordo }}).then(mensj => {
              if(io.to(socket.id).emit('historial', {data: mensj}))
                  {
                    console.log('mensaje enviado de salida ======================')
                  }else{
                     console.log('falla enviando el mensaje')
                }   

            }).error(err => res.status(500).json({ message: "error en la petición"} ))          
          }
         }).error(err => res.status(500).json({ message: "error en la petición"} )) 



         models.SocketOnline.findOne( { where: { socketEnterprise : socket.id }}).then(enter => {

          if(enter)
          {
            const id_enterprise = enter.socketEnterprise
            const id_sordo = enter.socketEnterprise
          
            models.Historial.findAll({where: { id_enterprise: id_enterprise, id_sordo: id_sordo }}).then(mensj => {
              if(io.to(socket.id).emit('historial', {data: mensj}))
                  {
                    console.log('mensaje enviado de salida1 ======================')
                  }else{
                     console.log('falla enviando el mensaje')
                }   

            }).error(err => res.status(500).json({ message: "error en la petición"} ))          
          }
         }).error(err => res.status(500).json({ message: "error en la petición"} )) 

       });       
   
    }); //fin del socket
          

    const promise = new Promise((resolve,rejected) => {

    	models.Profile.findAll().then( function(profiles) { 
        if (profiles) {
           if (profiles.length == 0){
           models.Profile.create({id: 1, name : 'ADMIN', description: 'ADMINISTRADOR DEL SISTEMA' });
           models.Profile.create({id: 2, name : 'EMPRESA', description: 'EMPRESAS DEL SISTEMA' });
           models.Profile.create({id: 3, name : 'USUARIO', description: 'USUARIOS' });
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
           models.Statu.create({id: 1, tipo_id: 1,  name : 'ACTIVO',      statu: true, description: 'USUARIO ACTIVO' });
           models.Statu.create({id: 2, tipo_id: 1,  name : 'DESACTIVADO', statu: true, description: 'USUARIO DESACTIVADO' });
           models.Statu.create({id: 3, tipo_id: 2,  name : 'ABIERTO',     statu: true, description: 'TICKET ABIERTO' });
           models.Statu.create({id: 4, tipo_id: 2,  name : 'EN ESPERA',   statu: true, description: 'TICKET EN ESPERA' });
           models.Statu.create({id: 5, tipo_id: 2,  name : 'CERRADO',     statu: true, description: 'TICKET CERRADO' });
           models.Statu.create({id: 6, tipo_id: 2,  name : 'ANULADO',     statu: true, description: 'TICKET ANULADO' });
           
           resolve()
          }
          else
          {
            resolve() 
          }
        } 
      })

       models.MotivoTicket.findAll().then( function(motivo) { 
        if (motivo) {
           if (motivo.length == 0){
           models.MotivoTicket.create({id: 1, name : 'Otros',           statu: true,  description: 'cualquier falla que no se encuentre en el listado' });   
           models.MotivoTicket.create({id: 2, name : 'Falla de logueo', statu: true,  description: 'Si presenta fallas en el logueo' });  
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
             //6599319
             models.User.create({nombre : 'Plumrose', correo: 'alvaro.develoop@gmail.com', 
                                 password :'$2b$10$CW4Gn7vVPSiZwn6zAzD6xuwlxUXvmGZyW8FVEdA3yE6XyPyB7dfda',
                                 profile_id:2, tipo_profile_id: 2, email_verify: true, statu_id: 1});
             
             models.User.create({nombre : 'Prueba', correo: 'prueba@gmail.com', 
                                 password :'$2b$10$CW4Gn7vVPSiZwn6zAzD6xuwlxUXvmGZyW8FVEdA3yE6XyPyB7dfda',
                                 profile_id:3, tipo_profile_id: 5, email_verify: true, statu_id: 1, 
                                 enterprise_id: 1});
            }
          } 

        });




    });
    	



}