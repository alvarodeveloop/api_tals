
const models = require('../../models/')

function get(req,res){

  models.EnterpriseAdmin.findAll().then(enter => {
    res.json(enter)
  }).error(err => res.status(500).json({ message: "error al guardar el registro"}) )
}

function stored(req,res){

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

  models.EnterpriseAdmin.findAll({ where: whereOr}).then(total => {
    if(total.length > 0){
      res.status(500).json({ message: "Ya esta en uso el correo o el correo del ceo o el rut o el rut del ceo" })
    }else{
      models.EnterpriseAdmin.create(req.body).then(stored => {
        res.json({ enterprise: stored })
      }).error(err => res.status(500).json({ message: "error al guardar el registro"}))

    }
  }).error(err => res.status(500).json({ message: "error al guardar el registro"}))
      
}

function findById(req,res){
  models.EnterpriseAdmin.findById(req.params.id).then(enter => {

    res.json(enter)

  }).error(err => res.status(500).json({ message: "error en la petición"} ))
}

function update(req,res){
  

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

  models.EnterpriseAdmin.findAll({ where: whereOr}).then(total => {
    if(total.length > 0){
      res.status(500).json({ message: "Ya esta en uso el correo o el correo del ceo o el rut o el rut del ceo"} )
    }else{
      models.EnterpriseAdmin.update(req.body,{where: {id: req.params.id}}).then(enter => {
        res.json()
      }).error(err => res.status(500).json({ message: "error en la petición"} ))
    }
  })

      
}

function destroy(req,res){

  const id = req.params.id

  models.EnterpriseAdmin.destroy({ where: { id }}).then(destroy => {
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