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

//Controlador user
//Recuperar contraseña
api.get('/user/:email', User.recoveryPassword)

//login
api.post('/login', User.login)

 api.get('/enterpriseAdmin', EnterpriseAdmin.get)
 api.get('/enterpriseAdmin/:id',EnterpriseAdmin.findById)
 api.post('/enterpriseAdmin', EnterpriseAdmin.stored)
 api.put('/enterpriseAdmin/:id', EnterpriseAdmin.update)
 api.delete('/enterpriseAdmin/:id', EnterpriseAdmin.destroy)

 api.get('/publicityModule', Publicity.get)
 api.get('/publicityModule/:id',Publicity.findById)
 api.post('/publicityModule', uploadPublicity.single('publicity'),Publicity.stored)
 api.put('/publicityModule/:id', uploadPublicity.single('publicity'),Publicity.update)
 api.delete('/publicityModule/:id', Publicity.destroy)


module.exports = api