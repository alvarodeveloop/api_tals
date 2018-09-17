
const models = require('../../models/')

/* ////////////////////////////////////  Get animation ///////////////////////////////////////////////////////////*/

function get(req,res){
  models.Animation.findAll( { where: { status: true },
  	include: [{
        model: models.AnimationImagen,
        as : 'animationImg'
      }]

   }).then(enter => {
    res.json(enter)
  }).error(err => res.status(500).json({ message: "error al buscar las empresas. Verifiqué"}) )
}

/* ///////////////////////////////////////////////////////////////////////////////////*/

function stored(req,res){
  
  models.User.findOne( {
      where: { correo: req.userCorreo }}).then(enter_id => {  

  let params = req.body

  req.body.status = true;
  req.body.user_id = enter_id.id;
  
  models.Animation.findAll({ where: {name: params.name }}).then(total => {
    if(total.length > 0){
      res.status(500).json({ message: "Ya esta en uso el nombre de esta Animación" })
    }else{
      models.Animation.create(params).then(stored => {
         res.json({ amination: stored })
      }).error(err => res.status(500).json({ message: "error al guardar el registro"}))
    }
  }).error(err => res.status(500).json({ message: "error al guardar el registro"}))

}).error(err => res.status(500).json({ message: "error al buscar el usuario del token. Verifiqué y comuníquese con soporte"}) )

}

/* ///////////////////////////////////////////////////////////////////////////////////*/

function storedImagenes(req,res){

    req.body.ruta_imagen = "imagen1.png";
    req.body.animation_id = 3;
    req.body.status = true;

    models.AnimationImagen.create(req.body).then(stored => {
        res.status(200).send({ message: "-------"+stored.id});
    }).error(err => res.status(500).json({ message: "error al guardar el registro"}))
}

/* ///////////////////////////////////////////////////////////////////////////////////*/

module.exports = {
 get,
 stored,
 storedImagenes
}