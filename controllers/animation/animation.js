
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

function getViews(req,res){
  models.Animation.findAll( { where: { status: true },
    include: [{
        model: models.AnimationImagen,
        as : 'animationImg',
        required:true
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

   const promise = new Promise((resolve,rejected) => {

   req.files.forEach( function(element, index) {

    params.ruta_imagen = element.filename;

    models.AnimationImagen.create(params).then(stored => {
      console.log("registro");
    }).error(err => res.status(500).json({ message: "error al guardar el registro"}))

   }); 

    resolve()
    res.status(200).send({ message: "Imagenes subidas correctamente"});
    }); 
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

    res.status(200).json({ texto : req.body.texto, message: "Registro Modificado correctamente" });

  }).error(err => res.status(500).json({ message: "error en la petición"} ))
  
}
/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function destroyOne(req,res){

  const id = req.params.id

  models.AnimationImagen.findById(id).then(publi => {
    
    const filePath = 'public/animationImagen/'+publi.dataValues.ruta_imagen; 

    models.AnimationImagen.destroy({ where: { id }}).then(destroy => {
      fs.unlinkSync(filePath);
      res.status(200).send({ message: "Foto eliminada correctamente" });
    }).error(err => res.status(500).json({ message: "error en la petición, por favor contacte a soporte"} ))

  }).error(err => res.status(500).json({ message: "Error, por favor contacte a soporte"} ) )
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function destroyAll(req,res){
  const id = req.params.id
   models.AnimationImagen.findAll( {
      where: { animation_id: id },
   }).then(total => {
     if(total.length < 0){
      res.status(500).json({ message: "Las imagenes no se encuentran. Verifique"} )
    }else
    {
      total.forEach( function(element, index) {
        const filePath = 'public/animationImagen/'+element.ruta_imagen; 

      models.AnimationImagen.destroy({ where: { id: element.id }}).then(destroy => {
        fs.unlinkSync(filePath);
      }).error(err => res.status(500).json({ message: "error en la petición, por favor contacte a soporte"} ))
    });  
      res.status(200).send({ message: "Foto eliminada correctamente" }); 
    }
  }).error(err => res.status(500).json({ message: "error al buscar las Imagenes. Verifiqué"}) )
}
/* /////////////////////////////////////////////////////////////////////////////////////7 */

function destroy(req,res){
  const id = req.params.id
   models.AnimationImagen.findAll( {
      where: { animation_id: id },
   }).then(total => {
     if(total.length < 0){
      res.status(500).json({ message: "Las imagenes no se encuentran. Verifique"} )
    }else
    {
      total.forEach( function(element, index) {
        const filePath = 'public/animationImagen/'+element.ruta_imagen; 

      models.AnimationImagen.destroy({ where: { id: element.id }}).then(destroy => {
        fs.unlinkSync(filePath);
      }).error(err => res.status(500).json({ message: "error en la petición, por favor contacte a soporte"} ))
    });

     //hacer una promesa de eliminar
      models.Animation.findOne( { where: { id: id }}).then(enter_id => { 

      const filePathAudio = 'public/animation/'+enter_id.audio; 
      const filePathAnimacion = 'public/animation/'+enter_id.imagen;  

      models.Animation.destroy({ where: { id }}).then(destroy => {
         //eliminar audio, animation
        fs.unlinkSync(filePathAudio);
        fs.unlinkSync(filePathAnimacion);
        res.status(200).send({ message: "Animación eliminada correctamente" }); 
      }).error(err => res.status(500).json({ message: "error en la petición, por favor contacte a soporte"} ))
     
      }).error(err => res.status(500).json({ message: "error en la petición. Verifiqué y comuníquese con soporte"}) )
    }
  }).error(err => res.status(500).json({ message: "error al buscar las Imagenes. Verifiqué"}) )
}
/* /////////////////////////////////////////////////////////////////////////////////////7 */

module.exports = {
 get,
 getViews,
 stored,
 storedImagenes,
 findById,
 updateAudio,
 updateAnimacion,
 updateTexto,
 destroyOne,
 destroyAll,
 destroy
}