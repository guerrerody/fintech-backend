const { Sequelize } = require('sequelize');


const db = new Sequelize('fintech', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

module.exports = db;