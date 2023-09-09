const {DataTypes} = require('sequelize');
const db = require('../database/db-conection');


const Impuesto = db.define('impuesto', {
    idimpuesto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    porcentaje: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    underscored: true,
    timestamps: true,
    paranoid: true,

    createdAt: 'creado_en',
    updatedAt: 'actualizado_en',
    deletedAt: 'eliminado_en'
});

module.exports = Impuesto;