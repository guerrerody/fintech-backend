const {DataTypes} = require('sequelize');
const db = require('../database/db-conection');


const Modalidad_pago = db.define('modalidad_pago', {
    idmodalidad_pago: {
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

module.exports = Modalidad_pago;