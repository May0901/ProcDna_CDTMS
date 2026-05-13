const { Sequelize } = require("sequelize")

const pgsql = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        port: 5432,
        dialect: 'postgres'
    }
);

module.exports = pgsql;