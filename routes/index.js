const express = require('express')
const multer  = require('multer')
const path = require('path');
const api = express.Router()

const storagePublicity = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/publicity')
  },
  filename: function (req, file, cb) {
    
    cb(null,  Date.now()+'-'+file.originalname)
  }
})

const uploadPublicity = multer({ storage: storagePublicity   })

const EnterpriseAdmin = require('../controllers/admin/enterprise')
const Publicity = require('../controllers/admin/publicity')
const Ticket = require('../controllers/ticket/ticket')
const User = require('../controllers/user/user')
const Maestro = require('../controllers/tals/maestro')
var mdAuth = require('../middlewares/authenticated')




//maestro del sistema
api.get('/AdminMotivo', Maestro.allMotivo)
api.get('/AdminStatu/:id', Maestro.statu)
api.get('/AdminProfile/:id', Maestro.profile)

//Controlador user
//Recuperar contraseña
api.post('/recoveryPassword', User.recoveryPassword)
api.post('/verify_code_recovery_password', User.codeRecoveryPassword)
api.post('/verify_token', User.verifyToken)

api.get('/profile', mdAuth.ensureAuth,User.getProfile)
api.put('/profile/:correo', mdAuth.ensureAuth,User.updateProfile)


//login
api.post('/login', User.login)

 api.get('/enterpriseAdmin', mdAuth.ensureAuth,EnterpriseAdmin.get)
 api.get('/enterpriseAdmin/:id', mdAuth.ensureAuth,EnterpriseAdmin.findById)
 api.post('/enterpriseAdmin', mdAuth.ensureAuth,EnterpriseAdmin.stored)
 api.put('/enterpriseAdmin/:id', mdAuth.ensureAuth,EnterpriseAdmin.update)
 api.delete('/enterpriseAdmin/:id', mdAuth.ensureAuth,EnterpriseAdmin.destroy)

//modo de clientes registrados por empresa
 api.post('/enterpriseClient', mdAuth.ensureAuth,EnterpriseAdmin.storedClient)
 api.get('/enterpriseClient', mdAuth.ensureAuth,EnterpriseAdmin.getClient)
 api.get('/enterpriseClient/:id', mdAuth.ensureAuth,EnterpriseAdmin.findByIdClient)
 api.put('/enterpriseClient/:id', mdAuth.ensureAuth,EnterpriseAdmin.updateClient)
 api.delete('/enterpriseClient/:id', mdAuth.ensureAuth,EnterpriseAdmin.destroyClient)

//publicityEnterprise
 api.get('/publicityEnterprise/:id', mdAuth.ensureAuth,EnterpriseAdmin.publicityEnterprise)
 api.put('/PublicityActive/:id', mdAuth.ensureAuth,EnterpriseAdmin.PublicityActivo)
 api.put('/enterprisePublicityActive/:id', mdAuth.ensureAuth,EnterpriseAdmin.PublicityEnterpriseActivo)

//publicty
 api.get('/publicityModule', mdAuth.ensureAuth,Publicity.get)
 api.get('/publicityModule/:id', mdAuth.ensureAuth,Publicity.findById)
 api.post('/publicityModule', mdAuth.ensureAuth,uploadPublicity.single('publicity'),Publicity.stored)
 api.put('/publicityModule/:id', mdAuth.ensureAuth,uploadPublicity.single('publicity'),Publicity.update)
 api.delete('/publicityModule/:id', mdAuth.ensureAuth,Publicity.destroy)

//ticket
api.post('/ticketAdmin', mdAuth.ensureAuth,Ticket.stored)
api.get('/ticketAdmin', mdAuth.ensureAuth,Ticket.get) // admin ve los tickets de las empresas
api.get('/ticketAdmin/:id', mdAuth.ensureAuth,Ticket.findById)
api.put('/ticketAdmin/:id', mdAuth.ensureAuth,Ticket.update)

api.post('/ticketClient', mdAuth.ensureAuth,Ticket.storedClient)
api.get('/ticketClient', mdAuth.ensureAuth,Ticket.getClient) //enviados por empresas o usuarios

api.get('/ticketEnterprise', mdAuth.ensureAuth,Ticket.getEnterprise) //enviados por usuarios a las empresas


api.post('/ticketResAdmin', mdAuth.ensureAuth,Ticket.storedTicketRes)

api.get('/ticketResAdmin/:id', mdAuth.ensureAuth,Ticket.getRes)





module.exports = api