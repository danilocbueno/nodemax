const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const Sequelize = require('sequelize');

if (config.use_env_variable) {
    let sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {


    if (config.dialect === "sqlite") {
        let sequelize = new Sequelize('sqlite::memory:')
    } else {
        let sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
}

module.exports = sequelize;