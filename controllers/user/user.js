
const models = require('../../models/')

var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');


/* //////////////////////////////////// Recuperación de contraseña /////////////////////////////////////////////////////// */

function recoveryPassword(req,res){

  //.toLowerCase()

  models.User.findOne({ where: { correo: req.params.email }}).then(enter => {

  if(enter)
    {  

    var Service = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'sistemaweb2018@gmail.com',
        pass: 'programacion01%'
      }
    });

    var mailOptions = {
      from: '"tals" <sistemaweb2018@gmail.com>',
      to: enter.correo,
      subject: 'Recuperación de Contraseña',
      text: 'Tú contraseña es '+enter.password
    };

    Service.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send({ message: "Error al enviar el correo" });
      } else {
        res.status(200).send({ message: "Su contraseña fue enviada a su correo electrónico" });
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
  email = email.toLowerCase();

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
             {  res.status(200).send(enter); }
        });
    }
    }).error(err => res.status(500).json({ message: "Error en Consulta Comuníquese con soporte"}) )
}

module.exports = {
  recoveryPassword,
  login
}