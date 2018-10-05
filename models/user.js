'use strict'

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define("user", {

      nombre: { 
            type: DataTypes.STRING    
          },         
      rut: { 
            type: DataTypes.STRING
          },         
      direccion: { 
            type: DataTypes.TEXT()    
          },         
      correo: { 
            type: DataTypes.STRING,
            unique: true,     
          },
       password: { 
          type: DataTypes.STRING    
          },
        profile_id: { 
          type: DataTypes.INTEGER    
          },  
        tipo_profile_id: { 
          type: DataTypes.INTEGER    
          },   
      telefono: { 
            type: DataTypes.STRING
          },         
      ceo: { 
            type: DataTypes.STRING
          },
      rut_ceo: { 
            type: DataTypes.STRING
          } ,
      telefono_ceo: { 
            type: DataTypes.STRING
          },
      correo_ceo: { 
            type: DataTypes.STRING
          },
      giro: { 
            type: DataTypes.STRING
          },
      code_verify: { 
          type: DataTypes.STRING    
        },
      email_verify: { 
          type: DataTypes.BOOLEAN,
          default: false,
        },

      statu_id: { 
          type: DataTypes.INTEGER    
          },
      
      //solo para los usuario profile tipo 3 de la de empresa
      enterprise_id: { 
          type: DataTypes.INTEGER    
          },

      online: { 
          type: DataTypes.BOOLEAN,
          default: false,
        },            

  });

   User.associate = model => {
      User.belongsTo(model.Profile,{
        foreignKey: 'profile_id',
        as : 'perfiles'
      })

       User.belongsTo(model.Statu,{
        foreignKey: 'statu_id',
        as : 'estatusUser'
      })

      User.hasMany(model.Ticket, {
      foreignKey: 'user_id',
      'as': 'userTicket'
      })

      User.hasMany(model.PublicityEnterprise, {
      foreignKey: 'id_enterprise',
      'as': 'empresas'
      }) 


      User.hasMany(model.SocketOnline,{
        foreignKey: 'enterprise_id',
        as : 'enterpriseonline'
      })


  }
    return User;
};
