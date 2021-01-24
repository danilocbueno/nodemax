const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodemax', 'root', 'qwe123456', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;