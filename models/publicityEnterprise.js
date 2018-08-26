'use strict'

module.exports = (sequelize, DataTypes) => {

  const PublicityEnterprise = sequelize.define("publicity_enterprise", {
      id_publicity: { 
            type: DataTypes.INTEGER    
      },
      id_enterprise: {
        type: DataTypes.INTEGER
      }
  },{underscored: true});
  
  PublicityEnterprise.associate = model => {

    PublicityEnterprise.belongsTo(model.EnterpriseAdmin, {
      foreignKey: 'id_enterprise',
      'as': 'empresas'
    })

    PublicityEnterprise.belongsTo(model.Publicity, {
      foreignKey: 'id_publicity',
      'as': 'publicidades'
    })
    
  }


  return PublicityEnterprise;

};  