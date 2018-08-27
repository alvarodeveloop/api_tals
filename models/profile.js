'use strict'

module.exports = (sequelize, DataTypes) => {

  const Profile = sequelize.define("profile", {
  name: { 
          type: DataTypes.STRING    
        },
  description: { 
          type: DataTypes.STRING    
        },         
  });

  Profile.associate = model => {
    Profile.hasMany(model.User, {
      foreignKey: 'profile_id',
      'as': 'perfiles'
    })
  } 
     
    return Profile; 

};
