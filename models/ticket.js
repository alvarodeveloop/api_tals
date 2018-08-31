'use strict'

module.exports = (sequelize, DataTypes) => {

  const Ticket = sequelize.define("ticket", {
  user_id: { 
          type: DataTypes.INTEGER    
        },
  admin_id: { 
          type: DataTypes.INTEGER    
        },
  motivo_id: { 
          type: DataTypes.INTEGER    
        },      
  description: { 
          type: DataTypes.STRING    
        },
  status_id: { 
          type: DataTypes.INTEGER    
        },
  visto: { 
          type: DataTypes.BOOLEAN,
          default: false,
        },              

  });

/*
  Ticket.associate = model => {
    Ticket.hasMany(model.MotivoTicket, {
      foreignKey: 'motivo_id',
      'as': 'motivo'
    })
  } 
  */   
    return Ticket; 

};
