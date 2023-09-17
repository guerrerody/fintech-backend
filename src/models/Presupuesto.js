const {DataTypes} = require('sequelize');
const db = require('../database/db-conection');
const Usuario = require('./Usuario');


const Presupuesto = db.define('presupuesto', {
    idpresupuesto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_culminacion: {
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

// Relacion con usuario
Presupuesto.belongsTo(Usuario,{
    foreignKey: 'usuario_id',
    targetId: 'id'
});

module.exports = Presupuesto;