'use strict'

module.exports = (sequelize, DataTypes) => {

  const Ticket = sequelize.define("ticket", {

  numero_ticket: { 
          type: DataTypes.STRING    
        },  
  // 1 para el admin // 2 para las empresas
  tipo_id: { 
          type: DataTypes.INTEGER    
        },  
  user_id: { 
          type: DataTypes.INTEGER    
        },
   //null tipo_id 1 // <> null si es tipo_id 2     
  enterprise_id: { 
          type: DataTypes.INTEGER    
        },
  motivo_id: { 
          type: DataTypes.INTEGER    
        },      
  description: { 
          type: DataTypes.STRING    
        },
  statu_id: { 
          type: DataTypes.INTEGER    
        },
  visto: { 
          type: DataTypes.BOOLEAN,
          default: false,
        },              

  });

 Ticket.associate = model => {
      Ticket.belongsTo(model.MotivoTicket,{
        foreignKey: 'motivo_id',
        as : 'motivo'
      })

       Ticket.belongsTo(model.Statu,{
        foreignKey: 'statu_id',
        as : 'motivoEstatus'
      })

      Ticket.belongsTo(model.User,{
        foreignKey: 'user_id',
        as : 'userTicket'
      }) 

  }
  
    return Ticket; 

};
