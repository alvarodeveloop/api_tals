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
const User = require('../controllers/user/user')
var mdAuth = require('../middlewares/authenticated')

//Controlador user
//Recuperar contraseña
api.post('/recoveryPassword', User.recoveryPassword)
api.post('/verify_code_recovery_password', User.codeRecoveryPassword)
api.post('/verify_token', User.verifyToken)

api.get('/profile', mdAuth.ensureAuth,User.getProfile)
api.patch('/profile/:correo', mdAuth.ensureAuth,User.updateProfile)


//login
api.post('/login', User.login)

 api.get('/enterpriseAdmin', mdAuth.ensureAuth,EnterpriseAdmin.get)
 api.get('/enterpriseAdmin/:id', mdAuth.ensureAuth,EnterpriseAdmin.findById)
 api.post('/enterpriseAdmin', mdAuth.ensureAuth,EnterpriseAdmin.stored)
 api.put('/enterpriseAdmin/:id', mdAuth.ensureAuth,EnterpriseAdmin.update)
 api.delete('/enterpriseAdmin/:id', mdAuth.ensureAuth,EnterpriseAdmin.destroy)

 api.get('/publicityModule', mdAuth.ensureAuth,Publicity.get)
 api.get('/publicityModule/:id', mdAuth.ensureAuth,Publicity.findById)
 api.post('/publicityModule', mdAuth.ensureAuth,uploadPublicity.single('publicity'),Publicity.stored)
 api.put('/publicityModule/:id', mdAuth.ensureAuth,uploadPublicity.single('publicity'),Publicity.update)
 api.delete('/publicityModule/:id', mdAuth.ensureAuth,Publicity.destroy)




module.exports = api