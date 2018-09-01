'use strict'

module.exports = (sequelize, DataTypes) => {

  const Item = sequelize.define("item", {
  
  ruta_foto: { 
          type: DataTypes.STRING    
        },    
  ruta_imagen: { 
          type: DataTypes.STRING    
        },
  ruta_audio: { 
          type: DataTypes.STRING    
        },
  texto_item: { 
          type: DataTypes.STRING    
        },             
  status_id: { 
          type: DataTypes.BOOLEAN,
          default: false,    
        }, 
  user_id: { 
          type: DataTypes.INTEGER    
        },             

  });

    return Item; 
};
