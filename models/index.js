var Sequelize = require('sequelize'); 


// api heroku 

/*const sequelize = new Sequelize("d6r5m7klc5184d","fnzzpnlymgmwen","466b124d0e21e0515bf80fd764c51668ef5d3a59ce0d3b06392c757f75f78a0c", {  
host: 'ec2-54-225-97-112.compute-1.amazonaws.com',  
dialect: 'postgres',
port: '5432'
})

// api local 

/*const sequelize = new Sequelize("tals","postgres","admin123", {  
dialect: 'postgres',
port: '5432'
})*/

const sequelize = new Sequelize("tals","postgres","123456", {  
dialect: 'postgres',
port: '5434'
})

const models = {
  User: sequelize.import('./user'),
  Publicity: sequelize.import('./publicity'),
  PublicityEnterprise: sequelize.import('./publicityEnterprise'),
  Profile: sequelize.import('./profile'),
  TipoProfile: sequelize.import('./tipoProfile'),
  Code: sequelize.import('./code'),
  Ticket: sequelize.import('./ticket'),
  MotivoTicket: sequelize.import('./motivoTicket'),
  Animation: sequelize.import('./animation'),
  AnimationImagen: sequelize.import('./animationImagen'),
  Statu: sequelize.import('./statu'),
  TicketRes: sequelize.import('./ticketRes'),
  Subscription: sequelize.import('./subscription'),
  SubscriptionEnterprise: sequelize.import('./subscriptionEnterprise'),
}; 



Object.keys(models).forEach((modelName) => {
  if('associate' in models[modelName]) {

    models[modelName].associate(models);
  }
});


models.sequelize = sequelize;

models.Op = Sequelize.Op
module.exports = models;
