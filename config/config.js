module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "host": process.env.DB_HOST,
        "database": process.env.DB_DATABASE,
        "dialect": "mysql"
    },
    "test": {
        "database": "products_api_test",
        "dialect": "postgres"
    },
    "production": {
        "use_env_variable": "DATABASE_URL",
        "dialect": "postgres",
        "dialectOptions": {
            "ssl": {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};