
const models = require('../../models/')

var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var jwt = require('../../services/jwt');


/* //////////////////////////////////// Verificación de cuenta/////////////////////////////////////////////////////// */

function verifyToken(req,res){
 
 var params = req.body;
 var code = params.code;


models.User.findOne({ where: {code_verify: code, email_verify: false}}).then(enter => {

   if (!enter) 
      { res.status(500).send({ message: 'Este código No existe o esta Caducado. verifiqué' }); }
   else{

      //cambio de contraseña al correo

       var update_array ={};
       update_array.email_verify = true;
        
       models.User.update(update_array, {where: { correo: enter.correo} }).then(resultado => { 

          res.status(200).send({ message: "Su cuenta ha sido verificada" });

      }).error(err => res.status(500).json({ message: "error al verificar su cuenta de correo. Verifiqué con soporte"}))

   }

  }).catch(err => res.status(500).json({ message: 'Ha ocurrido un error al verificar su cuenta'}) ); // fin f
  

 
}

/* //////////////////////////////////// Recuperación de contraseña  codigo/////////////////////////////////////////////////////// */

function codeRecoveryPassword(req,res){
  var params = req.body;
  var code = params.code;

  //correo_user: email
  models.Code.findOne({ where: {code: code, status: true}}).then(enter => {

   if (!enter) 
      { res.status(500).send({ message: 'Este código No existe o esta Caducado. verifiqué' }); }
   else{

      var code = "";
      var lon = 6;
      var chars = "1234567890";

      for (x=0; x < lon; x++)
      {
      rand = Math.floor(Math.random()*chars.length);
      code += chars.substr(rand, 1);
      }

    code = code+enter.id;

      //cambio de contraseña al correo
    var Service = nodemailer.createTransport({
      service: global.config.correo.service,
      auth: {
        user: global.config.correo.user,
        pass: global.config.correo.pass
      }
    });

    var mailOptions = {
      from: global.config.correo.from,
      to: enter.correo_user,
      subject: 'Nueva Contraseña',
      text: 'Tú nueva contraseña es '+code
    };


    Service.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send({ message: "Error al enviar el correo" });
      } else {

       var nueva_clave = "";

       nueva_clave  = bcrypt.hashSync(code, 10); 

       var update_array ={};
       update_array.password = nueva_clave;
        
       models.User.update(update_array, {where: { correo: enter.correo_user} }).then(resultado => { 

          res.status(200).send({ message: "Su nueva contraseña fue enviada a su correo electrónico" });

      }).error(err => res.status(500).json({ message: "error al guardar el registro Verifiqué con soporte"}))

      }
    })

   }

  }).catch(err => res.status(500).json({ message: 'Ha ocurrido un error al buscar el usuario a modificar'}) ); // fin f
  
}

/* //////////////////////////////////// Recuperación de contraseña /////////////////////////////////////////////////////// */

function recoveryPassword(req,res){

  var params = req.body;
  var email = params.email;

  // ojo revisar esta funcion
  //email = email.toLowerCase();

  models.User.findOne({ where: { correo: email }}).then(enter => {

  if(enter)
    { 
      var code = "";
      var lon = 6;
      var chars = "0123456789ABCDEFGHIJLMNOPQRSTXYWZ";

      for (x=0; x < lon; x++)
      {
      rand = Math.floor(Math.random()*chars.length);
      code += chars.substr(rand, 1);
      }

    var Service = nodemailer.createTransport({
      service: global.config.correo.service,
      auth: {
        user: global.config.correo.user,
        pass: global.config.correo.pass
      }
    });

    var mailOptions = {
      from: global.config.correo.from,
      to: enter.correo,
      subject: 'Recuperación de Contraseña',
      text: 'Tú Codigo de seguridad es '+code
    };

    Service.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send({ message: "Error al enviar el correo" });
      } else {

       var update_array ={};
       update_array.status = false;
        
       models.Code.update(update_array, {where: { correo_user: enter.correo} }).then(resultado => {                                    
       
       models.Code.create({correo_user: enter.correo, code : code, status: true}).then(resultado => {
          res.status(200).send({ message: "Su contraseña fue enviada a su correo electrónico" });
        }).error(err => res.status(500).json({ message: "error al guardar el registro Verifiqué con soporte"}))

      }).error(err => res.status(500).json({ message: "error al guardar el registro Verifiqué con soporte"}))


      }
    })
	
    }else
    {
    	  res.status(500).send({ message: 'No existe este correo verifiqué' });
    }	
  }).error(err => res.status(500).json({ message: "Error en Consulta Comuníquese con soporte"}) )
}

/* //////////////////////////////////// Login /////////////////////////////////////////////////////// */

function login(req, res) {

  var params = req.body;
  var email = params.email;

  // ojo revisar esta funcion
  //email = email.toLowerCase();

  var password = params.password;
  var passemail = password;

  models.User.findOne({ where: { correo: email }}).then(enter => {

   if (!enter) 
      { res.status(500).send({ message: 'Error al comprobar usuario. verifiqué' }); }
   else
      {
       bcrypt.compare(passemail, enter.password,  function(err, respuesta) {
            
            if (!respuesta) { res.status(404).send({ message: 'El usuario no ha podido loguearse correctamente!' }); }
             else
             {  

              var user_array ={};
              user_array.nombre = enter.nombre; 
              user_array.correo = enter.correo; 
              user_array.profile = enter.profile_id;
              user_array.tipo_profile_id = enter.tipo_profile_id;

               res.status(200).send({
                          user: user_array,
                          token: jwt.createToken(enter.dataValues)
                      });
               }
        });
    }
    }).error(err => res.status(500).json({ message: "Error en Consulta Comuníquese con soporte"}) )
}

module.exports = {
  verifyToken,
  codeRecoveryPassword,
  recoveryPassword,
  login
}