
// la gallina turuleca

const models = require('../../models/')

var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var jwt = require('../../services/jwt');

/* /////////////////////////////////// Motivos de los tickets ////////////////////////////////////////////////////*/

function allMotivo(req,res){
 models.MotivoTicket.findAll({where: { statu: true}
  }).then(enter => {
    res.json(enter)
  }).error(err => res.status(500).json({ message: "error en la petición"} ))
 }


 /* /////////////////////////////////// status del sistema 1 Usuarios / 2 tickest ////////////////////////////////////////////////////*/

function statu(req,res){
 models.Statu.findAll({where: { tipo_id: req.params.id}
  }).then(enter => {
    res.json(enter)
  }).error(err => res.status(500).json({ message: "error en la petición"} ))
 }


 /* /////////////////////////////////// status del sistema 1 Usuarios / 2 tickest ////////////////////////////////////////////////////*/

function statuClient(req,res){
 models.Statu.findAll({where: { tipo_id: req.params.id, id: 6}
  }).then(enter => {
    res.json(enter)
  }).error(err => res.status(500).json({ message: "error en la petición"} ))
 }

  /* /////////////////////////////////// status del sistema 1 Usuarios / 2 tickest ////////////////////////////////////////////////////*/

 function profile(req,res){
 models.TipoProfile.findAll({where: { profile_id: req.params.id}
  }).then(enter => {
    res.json(enter)
  }).error(err => res.status(500).json({ message: "error en la petición"} ))
 }

module.exports = {
 allMotivo,
 statu,
 statuClient,
 profile
}