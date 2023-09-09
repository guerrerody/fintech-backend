const {DataTypes} = require('sequelize');
const db = require('../database/db-conection');
const Gasto = require('./Gasto');
const Presupuesto = require('./Presupuesto');


const Gasto_presupuesto = db.define('gasto_presupuesto', {
    idgasto_presupuesto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }/*,
    gasto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gasto,
            key: 'idgasto'
        }
    },
    presupuesto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Presupuesto,
            key: 'idpresupuesto'
        }
    }*/
}, {
    underscored: true,
    timestamps: true,
    paranoid: true,

    createdAt: 'creado_en',
    updatedAt: 'actualizado_en',
    deletedAt: 'eliminado_en'
});

Gasto.belongsToMany(Presupuesto, { through: 'gasto_presupuesto' });
Presupuesto.belongsToMany(Gasto, { through: 'gasto_presupuesto' });

module.exports = Gasto_presupuesto;