'use strict'

module.exports = (sequelize, DataTypes) => {

  const Code = sequelize.define("code", {
  correo_user: { 
          type: DataTypes.STRING    
        },        
  code: { 
          type: DataTypes.STRING    
        },
  status: { 
          type: DataTypes.BOOLEAN,
          default: true,
        },                     
  });
 
     
    return Code; 

};
