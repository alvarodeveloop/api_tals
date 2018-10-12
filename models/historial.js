'use strict'

module.exports = (sequelize, DataTypes) => {

  const Historial = sequelize.define("historial", {
  id_enterprise: { 
          type: DataTypes.INTEGER    
          },  

  id_sordo: { 
          type: DataTypes.INTEGER    
          }, 
   tipo: {  //1 ---> sordo a empresa // 2 ---> empresa a sordo
          type: DataTypes.INTEGER    
          },                   
  mensaje: { 
          type: DataTypes.STRING    
        },

  status: { 
          type: DataTypes.BOOLEAN,
          default: true,
        },                     
  });
 
    return Historial; 

};
