'use strict'

module.exports = (sequelize, DataTypes) => {

  const SubscriptionEnterprise = sequelize.define("subscription_enterprise", {
      
      id_subscription: { 
            type: DataTypes.INTEGER    
      },
      
      id_enterprise: {
        type: DataTypes.INTEGER
      },
     
     statu: { 
          type: DataTypes.BOOLEAN,
          default: true,
      }

     //falta fecha de inicio o algo por el estilo fecha de fin 

  });
  

  return SubscriptionEnterprise;

};  