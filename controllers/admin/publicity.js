
const models = require('../../models/')

function get(req,res){

  models.Publicity.findAll({
     include: [{
        model: models.PublicityEnterprise,
        as : 'publicidades'
      }]
  }).then(public => {
    res.json(public)
  }).error(err => res.status(500).json({ message: "error al buscar los registros"}) )
}

function stored(req,res){

  let params = req.body
  params.image = req.file.filename
  params.register_type = 0

  models.Publicity.findAll({ where: {name: params.name }}).then(total => {
    if(total.length > 0){
      res.status(500).json({ message: "Ya esta en uso el nombre de esta publicidad" })
    }else{
      models.Publicity.create(params).then(stored => {
        res.json({ publicity: stored })
      }).error(err => res.status(500).json({ message: "error al guardar el registro"}))

    }
  }).error(err => res.status(500).json({ message: "error al guardar el registro"}))
      
}

function findById(req,res){
  models.Publicity.findById(req.params.id).then(public => {

    res.json(public)

  }).error(err => res.status(500).json({ message: "error en la petición"} ))
}

function update(req,res){
  

  let params = req.body
  
  if(req.file !== undefined){
    params.image = req.file.filename
  }

  params.register_type = 0

  let whereOr = {
    name: params.name,
    id: { [models.Op.ne ] : req.params.id }
  }

  models.Publicity.findAll({ where: whereOr}).then(total => {
    if(total.length > 0){
      res.status(500).json({ message: "Ya esta en uso el nombre de la publicidad"} )
    }else{
      models.Publicity.update(params,{where: {id: req.params.id}}).then(public => {
        res.json()
      }).error(err => res.status(500).json({ message: "error en la petición"} ))
    }
  })

      
}

function destroy(req,res){

  const id = req.params.id

  models.Publicity.destroy({ where: { id }}).then(destroy => {
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