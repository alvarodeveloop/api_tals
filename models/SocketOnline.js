'use strict'

module.exports = (sequelize, DataTypes) => {

  const SocketOnline = sequelize.define("socketOnline", {

      enterprise_id: { 
          type: DataTypes.INTEGER    
          },  
         
      socketEnterprise: { 
            type: DataTypes.STRING
          }, 

      sordo_id: { 
          type: DataTypes.INTEGER    
          }, 
          
      socketSordo: { 
            type: DataTypes.STRING
          },   
  });


   SocketOnline.associate = model => {
      SocketOnline.belongsTo(model.User,{
        foreignKey: 'enterprise_id',
        as : 'enterpriseonline'
      })

  } 



    return SocketOnline;
};
