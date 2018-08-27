'use strict'

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define("user", {

      nombre: { 
            type: DataTypes.STRING    
          },         
      rut: { 
            type: DataTypes.STRING
          },         
      direccion: { 
            type: DataTypes.TEXT()    
          },         
      correo: { 
            type: DataTypes.STRING,
            unique: true,     
          },
       password: { 
          type: DataTypes.STRING    
          },
       tipo_id: { 
          type: DataTypes.INTEGER    
          }, 
        profile_id: { 
          type: DataTypes.INTEGER    
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

    return User;
};
