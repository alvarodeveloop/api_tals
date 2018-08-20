const express = require('express')
const api = express.Router()

const EnterpriseAdmin = require('../controllers/admin/enterprise')

api.get('/enterpriseAdmin', EnterpriseAdmin.get)
api.get('/enterpriseAdmin/:id',EnterpriseAdmin.findById)
api.post('/enterpriseAdmin', EnterpriseAdmin.stored)
api.put('/enterpriseAdmin/:id', EnterpriseAdmin.update)
api.delete('/enterpriseAdmin/:id', EnterpriseAdmin.destroy)

module.exports = api