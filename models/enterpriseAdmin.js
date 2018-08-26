'use strict'

module.exports = (sequelize, DataTypes) => {

  const EnterpriseAdmin = sequelize.define("enterprise_admin", {
      nombre: { 
            type: DataTypes.STRING    
          },         
      rut: { 
            type: DataTypes.STRING
          },         
      direccion: { 
            type: DataTypes.TEXT('LONG')    
          },         
      correo: { 
            type: DataTypes.STRING    
          },         
      telefono: { 
            type: DataTypes.STRING
          },         
      ceo: { 
            type: DataTypes.STRING
          },
      rut_ceo: { 
            type: DataTypes.STRING
          } ,
      telefono_ceo: { 
            type: DataTypes.STRING
          },
      correo_ceo: { 
            type: DataTypes.STRING
          },
      giro: { 
            type: DataTypes.STRING
          }    
  });
  
  
  return EnterpriseAdmin;

};  

  