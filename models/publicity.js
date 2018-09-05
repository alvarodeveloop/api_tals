'use strict'

module.exports = (sequelize, DataTypes) => {

  const Publicity = sequelize.define("publicity", {
      image: { 
            type: DataTypes.STRING    
      },
      name: {
        type: DataTypes.STRING    
      },
      type: {
        type: DataTypes.STRING    
      },
      type_register:{
        type: DataTypes.STRING    
      },
      statu: { 
          type: DataTypes.BOOLEAN,
          default: true,
      }
  });
  
  
  Publicity.associate = model => {

    Publicity.hasMany(model.PublicityEnterprise, {
      foreignKey: 'id_publicity',
      'as': 'publicidades'
    })
    
  }
  return Publicity;


};  

  