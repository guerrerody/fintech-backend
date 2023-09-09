const {DataTypes} = require('sequelize');
const db = require('../database/db-conection');
const Gasto = require('./Gasto');


const Deudas = db.define('deudas', {
    iddeudas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    descripcion: {
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

// Relacion con categoria_gasto
Deudas.hasOne(Gasto,{
    foreignKey: 'gasto_credito',
    targetId: 'id'
});

module.exports = Deudas;