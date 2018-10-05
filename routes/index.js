const express = require('express')
const multer  = require('multer')
const path = require('path');
const api = express.Router()

/*//////////////////////////////////////////////////////////////////////////////////////*/

const storagePublicity = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/publicity')
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now()+'-'+file.originalname)
  }
})

/*//////////////////////////////////////////////////////////////////////////////////////*/
const storageAnimation = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/animation')
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now()+'-'+file.originalname)
  }
})

const storageAudio = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/animation')
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now()+'-'+file.originalname)
  }
})

const storageAnimationImagen = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/animationImagen')
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now()+'-'+file.originalname)
  }
})
/*//////////////////////////////////////////////////////////////////////////////////////*/

const uploadPublicity = multer({ storage: storagePublicity })
const uploadAnimation = multer({ storage: storageAnimation }) //imagen referencial
const uploadAudio     = multer({ storage: storageAudio }) //audio mp3
const uploadAnimationImagen     = multer({ storage: storageAnimationImagen }) //audio mp3



const EnterpriseAdmin = require('../controllers/admin/enterprise')
const Publicity = require('../controllers/admin/publicity')
const Ticket = require('../controllers/ticket/ticket')
const User = require('../controllers/user/user')
const Client = require('../controllers/client/client')
const Subscription = require('../controllers/subscription/subscription')
const Maestro = require('../controllers/tals/maestro')
const Animation = require('../controllers/animation/animation')

var mdAuth = require('../middlewares/authenticated')




//maestro del sistema
api.get('/AdminMotivo', Maestro.allMotivo)
api.get('/AdminStatu/:id', Maestro.statu)
api.get('/AdminStatuClient/:id', Maestro.statuClient)
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

 api.get('/enterpriseOnline', mdAuth.ensureAuth,EnterpriseAdmin.getOnline)
 api.get('/enterpriseSocket', mdAuth.ensureAuth,EnterpriseAdmin.getEnterpirseOnline)

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
 api.get('/enterprisePublicity', mdAuth.ensureAuth,EnterpriseAdmin.publicityEnterpriseId)
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



//clientes registrados por su cuenta
api.post('/clientEnterprise', Client.storedClient)


//clientes registrados por su cuenta
api.post('/SubscriptionEnterprise', Subscription.stored)


api.post('/SubscriptionEnterprise', mdAuth.ensureAuth,Subscription.stored)
api.get('/SubscriptionEnterprise', mdAuth.ensureAuth,Subscription.get) // admin ve los tickets de las empresas
api.get('/SubscriptionEnterprise/:id', mdAuth.ensureAuth,Subscription.findById)
api.put('/SubscriptionEnterprise/:id', mdAuth.ensureAuth,Subscription.update)
api.delete('/SubscriptionEnterprise/:id', mdAuth.ensureAuth,Subscription.destroy)

api.get('/Subscription', mdAuth.ensureAuth,Subscription.getSubscription)


//Animations
api.get('/Animations', mdAuth.ensureAuth,Animation.get)

api.get('/AnimationsViews', mdAuth.ensureAuth,Animation.getViews)

api.post('/Animations', mdAuth.ensureAuth,uploadAnimation.fields([
    {
      name: "animacion"
    },
    {
      name: "audio"
    }
  ]),Animation.stored)

 api.post('/AnimationsImagen', mdAuth.ensureAuth,uploadAnimationImagen.array('imagenes', 50),Animation.storedImagenes)
 api.get('/Animations/:id', mdAuth.ensureAuth,Animation.findById)
 api.put('/AnimationsAudio/:id', mdAuth.ensureAuth,uploadAnimation.single('audio'),Animation.updateAudio)
 api.put('/AnimationsAnimacion/:id', mdAuth.ensureAuth,uploadAnimation.single('animacion'),Animation.updateAnimacion)
 api.put('/AnimationsTexto/:id', mdAuth.ensureAuth,Animation.updateTexto)

 api.delete('/AnimationsOne/:id', mdAuth.ensureAuth,Animation.destroyOne)
 api.delete('/AnimationsAll/:id', mdAuth.ensureAuth,Animation.destroyAll)
 api.delete('/Animations/:id', mdAuth.ensureAuth,Animation.destroy)


module.exports = api