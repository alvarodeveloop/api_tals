'use strict'

module.exports = (sequelize, DataTypes) => {

  const SucriptionEnterprise = sequelize.define("sucription_enterprise", {
      
      id_sucription: { 
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
  

  return SucriptionEnterprise;

};  