'use strict'

module.exports = (sequelize, DataTypes) => {

  const AnimationImagen = sequelize.define("animation_imagen", {
    
  ruta_imagen: { 
          type: DataTypes.STRING    
        },
  animation_id: { 
          type: DataTypes.INTEGER    
        },            
  status: { 
          type: DataTypes.BOOLEAN,
          default: true,    
        },             
  });

  AnimationImagen.associate = model => {
      AnimationImagen.belongsTo(model.Animation,{
        foreignKey: 'animation_id',
        as : 'animationImg'
      })

  } 

    return AnimationImagen; 
};
