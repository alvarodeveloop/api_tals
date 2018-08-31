'use strict'

const models = require('../models/');
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_sistema_tals';

exports.ensureAuth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'La petición no tiene cabecera de autorización' });
    }

  var token = req.headers.authorization.split(' ')[1];
    
    try {
        var payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'El token ha expirado!' });
        }
    } catch (ex) {
        return res.status(404).send({ message: 'El token no es valido!' });
    }
    //consulta

    

    console.log("-------------"+payload.CorreoUser);



    req.user = payload;

    next();
}