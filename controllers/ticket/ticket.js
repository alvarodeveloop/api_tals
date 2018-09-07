
const models = require('../../models/')

var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var jwt = require('../../services/jwt');

/* /////////////////////////////////// guardar ticket de empresas al admin de tals ////////////////////////////////////////////////////*/

function stored(req,res){

  models.User.findOne( {
      where: { correo: req.userCorreo }}).then(enter_id => {  

   var code = "";
      var lon = 4;
      var chars = "1234567890";

      for (x=0; x < lon; x++)
      {
      rand = Math.floor(Math.random()*chars.length);
      code += chars.substr(rand, 1);
      }

    code = code+'-'+enter_id.id;
         
    req.body.numero_ticket = code;
    req.body.tipo_id = 1;
    req.body.user_id = enter_id.id;
    req.body.statu_id = 3;
    req.body.visto = false;

    models.Ticket.create(req.body).then(stored => {

        res.status(200).send({ message: "Su Ticket fue enviado #"+code+'-'+stored.id});

    }).error(err => res.status(500).json({ message: "error al guardar el registro"}))
  
 }).error(err => res.status(500).json({ message: "error al buscar el usuario del token. Verifiqué y comuníquese con soporte"}) )
}


/* ////////////////////////////////////  Tickets para el admin ///////////////////////////////////////////////////////////*/

function get(req,res){

  models.Ticket.findAll( {
      where: { tipo_id: 1 },
      include: [{
        model: models.MotivoTicket,
        as : 'motivo'
      },{
        model: models.Statu,
        as : 'motivoEstatus'
      },
      {
        attributes: ['nombre', 'correo'],
        model: models.User,
        as : 'userTicket'
      }]
  
  }).then(enter => {
    res.json(enter)
  }).error(err => res.status(500).json({ message: "error al buscar las empresas. Verifiqué"}) )
}



/* /////////////////////////////////////  buscar por id: un ticket ////////////////////////////////////////////////////////////// */
function findById(req,res){

  models.Ticket.findOne(
    {
      where: { id: req.params.id},
      include: [{
        model: models.MotivoTicket,
        as : 'motivo'
      },{
        model: models.Statu,
        as : 'motivoEstatus'
      }]
  
  }).then(enter => {

    res.json(enter)

  }).error(err => res.status(500).json({ message: "error en la petición"} ))
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function update(req,res){

      models.Ticket.update(req.body,{where: {id: req.params.id}}).then(enter => {
        res.status(200).send({ message: "Registro Modificado correctamente" });
      }).error(err => res.status(500).json({ message: "error en la petición"} ))
      
}
/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */



/* /////////////////////////////////// guardar ticket de cleintes de las empresas////////////////////////////////////////////////////*/

function storedClient(req,res){

   models.User.findOne( {
      where: { correo: req.userCorreo }}).then(enter_id => {  

   var code = "";
      var lon = 4;
      var chars = "1234567890";

      for (x=0; x < lon; x++)
      {
      rand = Math.floor(Math.random()*chars.length);
      code += chars.substr(rand, 1);
      }

    code = code+'-'+enter_id.id;
         
    req.body.numero_ticket = code;
    req.body.tipo_id = 2;
    req.body.user_id = enter_id.id;
    req.body.enterprise_id = enter_id.enterprise_id;
    req.body.statu_id = 3;
    req.body.visto = false;

    models.Ticket.create(req.body).then(stored => {

        res.status(200).send({ message: "Su Ticket fue enviado #"+code+'-'+stored.id});

    }).error(err => res.status(500).json({ message: "error al guardar el registro"}))
  
 }).error(err => res.status(500).json({ message: "error al buscar el usuario del token. Verifiqué y comuníquese con soporte"}) )

}


/* ////////////////////////////////////  Tickets enviados por la empresa o usuario ///////////////////////////////////////////////////////////*/

function getClient(req,res){

  models.User.findOne( {
      where: { correo: req.userCorreo }}).then(enter_id => {  

   models.Ticket.findAll( {
      where: { user_id: enter_id.id },
      include: [{
        model: models.MotivoTicket,
        as : 'motivo'
      },{
        model: models.Statu,
        as : 'motivoEstatus'
      }]
  
  }).then(enter => {
    res.json(enter)
  }).error(err => res.status(500).json({ message: "error al buscar los tickets. Verifiqué"}) )

 }).error(err => res.status(500).json({ message: "error al buscar el usuario del token. Verifiqué y comuníquese con soporte"}) )

}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function getEnterprise(req,res){

  models.User.findOne( {
      where: { correo: req.userCorreo }}).then(enter_id => {  

   models.Ticket.findAll( {
      where: { enterprise_id: enter_id.id },
      include: [{
        model: models.MotivoTicket,
        as : 'motivo'
      },{
        model: models.Statu,
        as : 'motivoEstatus'
      },
      {
        attributes: ['nombre', 'correo'],
        model: models.User,
        as : 'userTicket'
      }]
  
  }).then(enter => {
    res.json(enter)
  }).error(err => res.status(500).json({ message: "error al buscar los tickets. Verifiqué"}) )

 }).error(err => res.status(500).json({ message: "error al buscar el usuario del token. Verifiqué y comuníquese con soporte"}) )

}


/* /////////////////////////////////// guardar ticket de cleintes de las empresas////////////////////////////////////////////////////*/

function storedTicketRes(req,res){

   models.User.findOne( {
      where: { correo: req.userCorreo }}).then(enter_id => {  
       
    req.body.ticket_id = 1; //viene desde la vista
    req.body.user_id = enter_id.id;
  
    models.TicketRes.create(req.body).then(stored => {

        res.status(200).send({ message: "Su Ticket ha sido Respondido Correctamente"});

    }).error(err => res.status(500).json({ message: "error al guardar el registro"}))
  
 }).error(err => res.status(500).json({ message: "error al buscar el usuario del token. Verifiqué y comuníquese con soporte"}) )

}

/* ////////////////////////////////////  get Tickets respuestas ///////////////////////////////////////////////////////////*/

function getRes(req,res){

  models.TicketRes.findAll( {where: { ticket_id: req.params.id } }).then(enter => {
    res.json(enter)
  }).error(err => res.status(500).json({ message: "error al buscar las respuestas. Verifiqué"}) )
}
/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/



module.exports = {
 stored,
 get,
 findById,
 update,
 storedClient,
 getClient,
 getEnterprise,
 storedTicketRes,
 getRes
}