'use strict'

module.exports = (sequelize, DataTypes) => {

  const Statu = sequelize.define("statu", {
  // 1 usuarios 
  // 2 ticket
  // 3 publicidad
  // 4 items
  tipo_id: {
          type: DataTypes.INTEGER    
          },   
  name: { 
          type: DataTypes.STRING    
        },
  description: { 
          type: DataTypes.STRING    
        },
  statu: { 
          type: DataTypes.BOOLEAN,
          default: false,
        },
  });

   Statu.associate = model => {
    Statu.hasMany(model.User, {
      foreignKey: 'statu_id',
      'as': 'estatusUser'
    })

    Statu.hasMany(model.Ticket, {
      foreignKey: 'statu_id',
      'as': 'motivoEstatus'
    })
  } 

    return Statu; 

};
