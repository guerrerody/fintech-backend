const {DataTypes} = require('sequelize');
const db = require('../database/db-conection');


const Categoria_ingreso = db.define('categoria_ingreso', {
    idcategoria_ingreso: {
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

module.exports = Categoria_ingreso;