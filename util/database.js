const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const Sequelize = require('sequelize');

if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
/*
const sequelize = new Sequelize(
    'nodemax',
    'root',
    'qwe123456', {
    dialect: 'mysql',
    host: 'localhost'
});
*/

module.exports = sequelize;