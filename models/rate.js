'use strict'

module.exports = (sequelize, DataTypes) => {

  const Rate = sequelize.define("rate", {

  user_id: { 
          type: DataTypes.INTEGER    
        },
  rate: { 
          type: DataTypes.INTEGER    
        },        
  status: { 
          type: DataTypes.BOOLEAN,
          default: true,
        },                     
  });
 
     
    return Rate; 

};
