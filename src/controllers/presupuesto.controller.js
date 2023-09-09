const { request, response } = require("express");
const { Presupuesto } = require('../models');
const { verIdUsuario } = require('../helpers/jwt');


// Obtener todos los presupuestos - retorna: /Total registros /registros paginados
const obtPresupuestos = async (req = request, res = response) => {
    const { limite = 5, desde = 1 } = req.query;

    usuario_id = await verIdUsuario(req, res);
    const query = { usuario_id };

    try {
        const { count: total, rows: filas } = await Presupuesto.findAndCountAll({
            where: query,
            offset: parseInt(desde - 1),
            limit: parseInt(limite)
        });

        res.json({
            total,
            filas
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

// Obtener presupuesto por id - retorna: /Presupuesto por id
const obtPresupuesto = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        const presupuesto = await Presupuesto.findByPk(id);

        res.status(200).json({
            presupuesto
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

// Crear presupuesto - retorna: /Presupuesto creado
const crearPresupuesto = async (req = request, res = response) => {
    const { fecha,
        fecha_culminacion,
        nombre,
        monto,
        descripcion } = req.body;

    usuario_id = await verIdUsuario(req, res);

    const presupuesto = new Presupuesto({
        fecha,
        fecha_culminacion,
        nombre,
        monto,
        descripcion,
        usuario_id
    });

    try {
        await presupuesto.save();

        res.json({
            msg: "Presupuesto creado correctamente!",
            presupuesto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal Server Error!",
            error
        });
    }
}

// Actualizar presupuesto - retorna: /Presupuesto actualizado
const actPresupuesto = async (req = request, res = response) => {
    const { id } = req.params;

    const { fecha,
        fecha_culminacion,
        nombre,
        monto,
        descripcion } = req.body;

    try {

        const presupuesto = await Presupuesto.update({
            fecha,
            fecha_culminacion,
            nombre,
            monto,
            descripcion
        }, {
            where: {
                idpresupuesto: id
            }
        });

        res.status(200).json({
            msg: "Presupuesto actualizado correctamente",
            presupuesto
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

// Eliminar presupuesto - retorna: /Presupuesto eliminado
const eliPresupuesto = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const presupuesto = await Presupuesto.destroy({
            where: {
                idpresupuesto: id
            }
        });

        res.status(200).json({
            msg: "Presupuesto eliminado correctamente",
            presupuesto
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

module.exports = {
    obtPresupuestos,
    obtPresupuesto,
    crearPresupuesto,
    actPresupuesto,
    eliPresupuesto
}