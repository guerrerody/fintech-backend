const {DataTypes} = require('sequelize');
const db = require('../database/db-conection');


// Creacion del modelo de usuario
const Usuario = db.define('usuario', {
    idusuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_usuario: {
        type: DataTypes.STRING,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING
    },
    contrasenna: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    underscored: true,
    timestamps: true,
    paranoid: true,

    createdAt: 'creado_en',
    updatedAt: 'actualizado_en',
    deletedAt: 'eliminado_en'
});


module.exports = Usuario;