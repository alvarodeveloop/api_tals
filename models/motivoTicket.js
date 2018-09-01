'use strict'

module.exports = (sequelize, DataTypes) => {

  const MotivoTicket = sequelize.define("motivo_ticket", {
  name: { 
          type: DataTypes.STRING    
        },
  description: { 
          type: DataTypes.STRING    
        },         
  });


  MotivoTicket.associate = model => {
    MotivoTicket.hasMany(model.Ticket, {
      foreignKey: 'motivo_id',
      'as': 'motivo'
    })

  } 
   
    return MotivoTicket; 

};
