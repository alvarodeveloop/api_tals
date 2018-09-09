'use strict'

module.exports = (sequelize, DataTypes) => {

  const Sucription = sequelize.define("sucription", {

 titulo: { 
          type: DataTypes.STRING    
        },
  descripcion: { 
          type: DataTypes.STRING    
        },
  periodo: { 
          type: DataTypes.INTEGER    
        }, 
  precio: { 
          type: DataTypes.INTEGER    
        },                      
  activo: { 
          type: DataTypes.BOOLEAN,
          default: false,    
        }, 
  });

    return Sucription; 
};