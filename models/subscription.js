'use strict'

module.exports = (sequelize, DataTypes) => {

  const Subscription = sequelize.define("subscription", {

 titulo: { 
          type: DataTypes.STRING    
        },
  descripcion: { 
          type: DataTypes.STRING    
        },
  periodo: { 
          type: DataTypes.INTEGER    
        }, 
  precio: { 
          type: DataTypes.INTEGER    
        },                      
  activo: { 
          type: DataTypes.BOOLEAN,
          default: false,    
        }, 
  });

    Subscription.associate = model => {
       Subscription.hasMany(model.SubscriptionEnterprise,{
        foreignKey: 'id_subscription',
        as : 'subscripciones'
      })
    }
    return Subscription; 
};