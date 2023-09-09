const {DataTypes} = require('sequelize');
const db = require('../database/db-conection');
const Categoria_gasto = require('./Categoria_gasto');
const Modalidad_pago = require('./Modalidad_pago');
const Metodo_pago = require('./Metodo_pago');
const Impuesto = require('./Impuesto');
const Usuario = require('./usuario');

// Creacion del modelo
const Gasto = db.define('gasto', {
    idgasto: {
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

// Relacion con categoria_gasto
Gasto.belongsTo(Categoria_gasto,{
    foreignKey: 'categoria_gasto_id',
    targetId: 'id'
});

// Relacion con modalidad_pago
Gasto.belongsTo(Modalidad_pago,{
    foreignKey: 'modalidad_pago_id',
    targetId: 'id'
});

// Relacion con metodo_pago
Gasto.belongsTo(Metodo_pago,{
    foreignKey: 'metodo_pago_id',
    targetId: 'id'
});

// Relacion con impuesto
Gasto.belongsTo(Impuesto,{
    foreignKey: 'impuesto_id',
    targetId: 'id'
});

// Relacion con usuario
Gasto.belongsTo(Usuario,{
    foreignKey: 'usuario_id',
    targetId: 'id'
});


module.exports = Gasto;