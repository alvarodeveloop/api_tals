
const models = require('../../models/')

/****************************** registro de clientes *************************************/

function stored(req,res){
    req.body.activo = true;


   models.Subscription.findAll({ where: {titulo: req.body.titulo} }).then(total => {
    if(total.length > 0){
      res.status(500).json({ message: "Ya esta en uso el Título"} )
    }else{

    models.Subscription.create(req.body).then(stored => {
        res.status(200).send({ message: "Su Subscripción fue creada correctamente"});
    }).error(err => res.status(500).json({ message: "error al guardar el registro"}))

    }
  }).error(err => res.status(500).json({ message: "error al guardar el registro"}))

}

/*******************************************************************************/
function get(req,res){
  models.Subscription.findAll({
    include: [
      {
        model: models.SubscriptionEnterprise, 
        as : 'subscripciones',
        where: {statu: true},
        required: false
      }
    ]
  }).then(subscription => {
    res.json(subscription)
  }).error(err => res.status(500).json({ message: "error al buscar los registros"}) )
}

/******************************************************************************/
function update(req,res){

  let whereOr = {
    [models.Op.or]: [{
      titulo: req.body.titulo,
    }],
    id: { [models.Op.ne] : req.body.id }
  }

  models.Subscription.findAll({ where: whereOr}).then(total => {
    if(total.length > 0){
      res.status(500).json({ message: "Ya esta en uso el Título"} )
    }else{
      models.Subscription.update(req.body,{where: {id: req.params.id}}).then(enter => {
        //res.json()
        res.status(200).send({ message: "Registro Modificado correctamente" });
      }).error(err => res.status(500).json({ message: "error en la petición"} ))
    }
  })      
}

/***********************************************************************************/
function destroy(req,res){
  const id = req.params.id
  models.Subscription.destroy({ where: { id }}).then(destroy => {
    
     res.status(200).send({ message: "Registro eliminado correctamente" });
  }).error(err => res.status(500).json({ message: "error en la petición"} ))
}


/* /////////////////////////////////////  buscar por id: una subcripcion ///////////////////////////////////////////////////////////// */
function findById(req,res){
  models.Subscription.findById(req.params.id).then(enter => {

    res.json(enter)

  }).error(err => res.status(500).json({ message: "error en la petición"} ))
}

/* ------------------------------------------------------------------------------------- */

module.exports = {
  stored,
  get,
  update,
  destroy,
  findById
}