
const models = require('../../models/')
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');


function get(req,res){

  let whereOr = {
    [models.Op.or]: [{
      profile_id: 2,
    }]
  }

  models.User.findAll( {
      where: { profile_id: 2 },
      include: [{
        model: models.Profile,
        as : 'perfiles'
      },{
        model: models.Statu,
        as : 'estatusUser'
      }]
  
  }).then(enter => {
    res.json(enter)
  }).error(err => res.status(500).json({ message: "error al buscar las empresas. Verifiqué"}) )
}


function stored(req,res){

  req.body.correo = req.body.correo.toLowerCase();
  var emailpassword = req.body.correo;
  req.body.password = bcrypt.hashSync(req.body.correo, 10);

  req.body.profile_id = 2;
  req.body.statu_id = 1;
  req.body.tipo_profile_id = 1; //opcion desde la vista un seleccione de perfiles de empresa
  req.body.email_verify = false;

  var code = "";
      var lon = 15;
      var chars = "0123456789ABCDEFGHIJLMNOPQRSTXYWZ!#$%&/()=[*:;";

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
        text: 'Tú contraseña es '+emailpassword+ ' <br> para verificar su cuenta este es su codigo de verificación: '+code 
      };

      Service.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(500).send({ message: "Error al enviar el correo" });
        } else {
          res.status(200).send({ message: "Su contraseña fue enviada a su correo electrónico" });
        }
      }) 


      models.Publicity.findAll({ where: {type: '1' }}).then(publicity => {
      
       var emterprise_array ={};

        if(publicity.length > 0){

           publicity.forEach( function(element, index) {

            emterprise_array.id_publicity = element.id;
            emterprise_array.id_enterprise = stored.id;

            models.PublicityEnterprise.create(emterprise_array ).then(publicityenterprise => {
              console.log("inserto correcto");
            }).error(err => res.status(500).json({ message: "error al guardar el registro"}))
         
            });
          
          res.json({ enterprise: stored }) 
        }else{
          res.json({ enterprise: stored }) 
        }
       }).error(err => res.status(500).json({ message: "Error en Consulta Comuníquese con soporte"}))


      }).error(err => res.status(500).json({ message: "error al guardar el registro"}))

    }
  }).error(err => res.status(500).json({ message: "error al guardar el registro"}))
      
}

function findById(req,res){
  models.User.findById(req.params.id).then(enter => {

    res.json(enter)

  }).error(err => res.status(500).json({ message: "error en la petición"} ))
}

function update(req,res){

  if (req.body.statu_id === true){
     req.body.statu_id = 1;
  }else
  {
    req.body.statu_id = 2;
  }

 if (req.body.changePassword === true){
     //cambio de contraseña
     req.body.password = bcrypt.hashSync(req.body.password, 10);
  }else
  {
    delete req.body.password;
  }

  let whereOr = {
    [models.Op.or]: [{
      correo: req.body.correo,
    },{
      correo_ceo: req.body.correo_ceo
    },{
      rut: req.body.rut
    },{
      rut_ceo: req.body.rut_ceo
    }],
    id: { [models.Op.ne] : req.body.id }
  }

  models.User.findAll({ where: whereOr}).then(total => {
    if(total.length > 0){
      res.status(500).json({ message: "Ya esta en uso el correo o el correo del ceo o el rut o el rut del ceo"} )
    }else{
      models.User.update(req.body,{where: {id: req.params.id}}).then(enter => {
        //res.json()
        res.status(200).send({ message: "Registro Modificado correctamente" });
      }).error(err => res.status(500).json({ message: "error en la petición"} ))
    }
  })

      
}

function destroy(req,res){

  const id = req.params.id

  models.User.destroy({ where: { id }}).then(destroy => {
    res.json()
  }).error(err => res.status(500).json({ message: "error en la petición"} ))
}




module.exports = {
  get,
  stored,
  findById,
  update,
  destroy
}