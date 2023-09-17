const { Sequelize } = require('sequelize');


const db = new Sequelize('fintech', 'postgres', 'zxasqw12', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

module.exports = db;