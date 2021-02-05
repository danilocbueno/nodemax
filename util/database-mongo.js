const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect(config.mongourl)
        .then(client => {
            console.log('Connected');
            callback(client);
        })
        .catch(err => console.log(err));
}

module.exports = mongoConnect;