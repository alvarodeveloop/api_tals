'use strict'

module.exports = (sequelize, DataTypes) => {

  const Animation = sequelize.define("animation", {
    
  name: { 
          type: DataTypes.STRING    
        },  
  imagen: { 
          type: DataTypes.STRING    
        },
  audio: { 
          type: DataTypes.STRING    
        },
  texto: { 
          type: DataTypes.STRING    
        },             
  status: { 
          type: DataTypes.BOOLEAN,
          default: true,    
        }, 
  user_id: { 
          type: DataTypes.INTEGER    
        },             

  });

Animation.associate = model => {
      Animation.hasMany(model.AnimationImagen,{
        foreignKey: 'animation_id',
        as : 'animationImg'
      })

  }
    return Animation; 
};
