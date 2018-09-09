
const models = require('../../models/')

var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');

/****************************** registro de clientes *************************************/
function storedClient(req,res){

  req.body.correo = req.body.correo.toLowerCase();
  var emailpassword = req.body.correo;
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  req.body.profile_id = 3;
  req.body.statu_id = 1;
  req.body.tipo_profile_id = 6; //opcion desde la vista un seleccione de perfiles de empresa
  req.body.email_verify = false;

  var code = "";
      var lon = 15;
      var chars = "0123456789ABCDEFGHIJLMNOPQRSTXYWZ*#$";

      for (x=0; x < lon; x++)
      {
      rand = Math.floor(Math.random()*chars.length);
      code += chars.substr(rand, 1);
      }

  req.body.code_verify = code;
  
  let whereOr = {
    [models.Op.or]: [{
      correo: req.body.correo,
    },{
      correo_ceo: req.body.correo_ceo
    },{
      rut: req.body.rut
    },{
      rut_ceo: req.body.rut_ceo
    }]
  }

  models.User.findAll({ where: whereOr}).then(total => {
    if(total.length > 0){
      res.status(500).json({ message: "Ya esta en uso el correo o el correo del ceo o el rut o el rut del ceo" })
    }else{
      models.User.create(req.body).then(stored => {

var Service = nodemailer.createTransport({
      service: global.config.correo.service,
      auth: {
        user: global.config.correo.user,
        pass: global.config.correo.pass
      }
    });

    var mailOptions = {
      from: global.config.correo.from,
        to: emailpassword,
        subject: 'Validación de cuenta',
        
    html: 'Tú contraseña es '+emailpassword+ ' <br> para verificar su cuenta este es su codigo de verificación: '+code+
    '<body> <p style="color:#FF0000";>Red paragraph text</p></body>'

      };

      Service.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(500).send({ message: "Error al enviar el correo" });
        } else {
          res.status(200).send({ message: "Su contraseña fue enviada a su correo electrónico" });
        }
      }) 

      }).error(err => res.status(500).json({ message: "error al guardar el registro"}))

    }
  }).error(err => res.status(500).json({ message: "error al guardar el registro"}))
      
}

/* ------------------------------------------------------------------------------------- */

module.exports = {
  storedClient
}