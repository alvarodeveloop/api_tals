'use strict'

module.exports = (sequelize, DataTypes) => {

  const TicketRes = sequelize.define("ticket_res", {

  ticket_id: { 
          type: DataTypes.INTEGER    
        }, 
  user_id: { 
          type: DataTypes.INTEGER    
        },
  description: { 
          type: DataTypes.STRING    
        },         
  });
  
    return TicketRes; 

};
