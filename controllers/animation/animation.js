
const models = require('../../models/')
const fs = require('fs');

/* ////////////////////////////////////  Get animation ///////////////////////////////////////////////////////////*/

function get(req,res){
  models.Animation.findAll( { where: { status: true },
  	include: [{
        model: models.AnimationImagen,
        as : 'animationImg'
      }]

   }).then(enter => {
    res.json(enter)
  }).error(err => res.status(500).json({ message: "error al buscar las Animaciones. Verifiqué"}) )
}

/* ///////////////////////////////////////////////////////////////////////////////////*/

function stored(req,res){
  
  models.User.findOne( {
      where: { correo: req.userCorreo }}).then(enter_id => {  

  let params = req.body
  
  
  params.imagen = req.files.animacion[0].filename
  params.audio = req.files.audio[0].filename
  params.status = true
  params.user_id = enter_id.id

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

   let params = req.body
   params.status = true;

   req.files.forEach( function(element, index) {

    params.ruta_imagen = element.filename;

    models.AnimationImagen.create(params).then(stored => {
      console.log("registro");
    }).error(err => res.status(500).json({ message: "error al guardar el registro"}))

   }); 
    res.status(200).send({ message: "Imagenes subidas correctamente"});
}

/* ///////////////////////////////////////////////////////////////////////////////////*/

function findById(req,res){
  
  models.Animation.findOne( { where: { id: req.params.id },
    include: [{
        model: models.AnimationImagen,
        as : 'animationImg'
      }]

   }).then(enter => {
    res.json(enter)
  }).error(err => res.status(500).json({ message: "error al buscar las Animaciones. Verifiqué"}) )

}


/* ///////////////////////////////////////////////////////////////////////////////////*/
function updateAudio(req,res){
  let params = req.body
  
  if(req.file !== undefined){
    params.audio = req.file.filename
  }
 
  models.Animation.findOne( { where: { id: req.params.id }}).then(enter => {
    const filePath = 'public/animation/'+enter.audio; 
    fs.unlinkSync(filePath);
  
  models.Animation.update(params,{where: {id: req.params.id}}).then(public => {
    
  res.status(200).json({ audio : params.audio, message: "Registro Modificado correctamente" });
  
  }).error(err => res.status(500).json({ message: "error en la petición"} ))
  
  }).error(err => res.status(500).json({ message: "error al buscar las Animaciones. Verifiqué"}) )    
}
/* ///////////////////////////////////////////////////////////////////////////////////*/

function updateAnimacion(req,res){
  let params = req.body
  
  if(req.file !== undefined){
    params.imagen = req.file.filename
  }
 
  models.Animation.findOne( { where: { id: req.params.id }}).then(enter => {
    const filePath = 'public/animation/'+enter.imagen; 
    fs.unlinkSync(filePath);
  
  models.Animation.update(params,{where: {id: req.params.id}}).then(public => {
   res.status(200).json({ aminacion : params.imagen, message: "Registro Modificado correctamente" });
   }).error(err => res.status(500).json({ message: "error en la petición"} ))
  
  }).error(err => res.status(500).json({ message: "error al buscar las Animaciones. Verifiqué"}) )    
}
/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function updateTexto(req,res){
  
  models.Animation.update(req.body,{where: {id: req.params.id}}).then(enter => {
    res.status(200).send({ message: "Registro Modificado correctamente" });
  }).error(err => res.status(500).json({ message: "error en la petición"} ))
  
}
/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

module.exports = {
 get,
 stored,
 storedImagenes,
 findById,
 updateAudio,
 updateAnimacion,
 updateTexto
}