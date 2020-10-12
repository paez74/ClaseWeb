var Sequelize = require('sequelize');
var _ = require('underscore');
var db = {};

const dbConnection = {
    host: 'localhost',
    database: 'pokemonWeb',
    username: 'root',
    password: 'root',
    
};

const sequelize = new Sequelize(dbConnection.database, dbConnection.username, dbConnection.password, {
    host: dbConnection.host,
    dialect: 'mysql',
    timezone: "America/Mexico_City",
    dialectOptions: {
        multipleStatements: true
    },
    pool: {
        max: 12,
        min: 7,
        acquire: 30000,
        idle: 10000,
    },
    port: '3306'
});



var pokemonCardModel = sequelize.import('../models/pokemon-card.model')
db.pokemonCard = pokemonCardModel;

(async () => {
    try {
        await sequelize.dropAllSchemas();
        await sequelize.sync({ force: true });
    } catch (error) {
        console.log(error);
    }
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;