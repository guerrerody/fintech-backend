const {DataTypes} = require('sequelize');
const db = require('../database/db-conection');


const Metodo_pago = db.define('metodo_pago', {
    idmetodo_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
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

module.exports = Metodo_pago;