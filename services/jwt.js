var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_sistema_tals';

exports.createToken = function (user) {
  
    var payload = {
      CorreoUser: user.correo,
      nombre: user.nombre,
      iat: moment().unix(),
      exp: moment().add(1, 'days').unix()
    }

    return jwt.encode(payload, secret);
 
}
