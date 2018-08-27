var Sequelize = require('sequelize'); 

// api producción
/*const sequelize = new Sequelize("d93r81asapair4","frnstsdpuwfyxk","71ef749af9d51f6d085a8f1988efc7e45b4448cf3775d2df67a9153deba6503b", {  
host: 'ec2-174-129-33-29.compute-1.amazonaws.com',  
dialect: 'postgres'
});*/



// api desarrollo
/*const sequelize = new Sequelize("d6l70oee33k7iv","pzkzqhempagund","145754e7e678bebb2387bda2989845c1751bcb3e58584f81741a5eea5d609ec5", {  
host: 'ec2-184-73-202-79.compute-1.amazonaws.com',  
dialect: 'postgres'
});*/

// repositorio desarrollo https://git.heroku.com/heroku-pronotas-api-desarrollo.git


// api local 

const sequelize = new Sequelize("tals","postgres","admin123", {  
dialect: 'postgres',
port: '5432'
})


const models = {
  User: sequelize.import('./user'),
  Publicity: sequelize.import('./publicity'),
  PublicityEnterprise: sequelize.import('./publicityEnterprise'),
  Profile: sequelize.import('./profile'),
  TipoProfile: sequelize.import('./tipoProfile'),
}; 



Object.keys(models).forEach((modelName) => {
  if('associate' in models[modelName]) {

    models[modelName].associate(models);
  }
});


models.sequelize = sequelize;

models.Op = Sequelize.Op
module.exports = models;
