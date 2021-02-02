const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const Sequelize = require('sequelize');
let sequelize = null;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {


    if (config.dialect === "sqlite") {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'database.sqlite'
        })
    } else {
        sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
}

module.exports = sequelize;