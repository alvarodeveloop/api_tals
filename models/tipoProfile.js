'use strict'

module.exports = (sequelize, DataTypes) => {

  const TipoProfile = sequelize.define("tipo_profile", {
  profile_id: { 
          type: DataTypes.INTEGER    
        },    
  name: { 
          type: DataTypes.STRING    
        },
  description: { 
          type: DataTypes.STRING    
        },         
  });

  TipoProfile.associate = model => {
    TipoProfile.hasMany(model.User, {
      foreignKey: 'tipo_profile_id',
      'as': 'tipoperfiles'
    })
  } 
     
    return TipoProfile; 

};
