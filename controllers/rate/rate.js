
const models = require('../../models/')

var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');
var jwt = require('../../services/jwt');


function stored(req,res){

  let params = req.body

  models.User.findOne( {
      where: { correo: req.userCorreo }}).then(enter_id => {  
        s
      params.user_id = enter_id.id;
      params.status = true;

    models.Rate.create(params).then(stored => {

        res.status(200).send({ message: "Su Opinión fue enviada correctamente"});

    }).error(err => res.status(500).json({ message: "error al guardar el registro"}))
  
 }).error(err => res.status(500).json({ message: "error al buscar el usuario del token. Verifiqué y comuníquese con soporte"}) )


}


/* ///////////////////////////////////////////////////////////////////////////////////////////////*/
function get(req,res){
   models.User.findOne( {
      where: { correo: req.userCorreo }}).then(enter_id => {  

      models.Rate.findOne( {
      where: { user_id: enter_id.id }}).then(rate_id => { 

      if(rate_id){
        res.json({ rate: true })
      }else
      {
         res.json({ rate: false })
      } 
        
    }).error(err => res.status(500).json({ message: "error al buscar el usuario. Verifiqué y comuníquese con soporte"}) )
    }).error(err => res.status(500).json({ message: "error al buscar el usuario del token. Verifiqué y comuníquese con soporte"}) )
     
}

/************************************************************************************************/
module.exports = {
  stored,
  get
}