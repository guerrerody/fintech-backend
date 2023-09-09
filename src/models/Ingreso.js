const {DataTypes} = require('sequelize');
const db = require('../database/db-conection');
const Categoria_ingreso = require('./Categoria_ingreso');
const Modalidad_pago = require('./Modalidad_pago');
const Metodo_pago = require('./Metodo_pago');
const Impuesto = require('./Impuesto');
const Usuario = require('./Usuario');

// Creacion del modelo de ingreso
const Ingreso = db.define('ingreso', {
    idingreso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    monto: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING
    }
}, {
    underscored: true,
    timestamps: true,
    paranoid: true,

    createdAt: 'creado_en',
    updatedAt: 'actualizado_en',
    deletedAt: 'eliminado_en'
});

// Relacion con categoria_ingreso
Ingreso.belongsTo(Categoria_ingreso,{
    foreignKey: 'categoria_ingreso_id',
    targetId: 'id'
});

// Relacion con metodo_pago
Ingreso.belongsTo(Metodo_pago,{
    foreignKey: 'metodo_pago_id',
    targetId: 'id'
});

// Relacion con usuario
Ingreso.belongsTo(Usuario,{
    foreignKey: 'usuario_id',
    targetId: 'id'
});


module.exports = Ingreso;