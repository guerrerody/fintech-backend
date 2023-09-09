const {DataTypes} = require('sequelize');
const db = require('../database/db-conection');
const Metodo_pago = require('./Metodo_pago');
const Usuario = require('./Usuario');


const Prestamo = db.define('prestamo', {
    idprestamo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_cumplimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total: {
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

// Relacion con metodo_pago
Prestamo.belongsTo(Metodo_pago,{
    foreignKey: 'metodo_pago_id',
    targetId: 'id'
});

// Relacion con usuario
Prestamo.belongsTo(Usuario,{
    foreignKey: 'usuario_id',
    targetId: 'id'
});

module.exports = Prestamo;