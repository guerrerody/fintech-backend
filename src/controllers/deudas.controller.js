const { request, response } = require("express");
const { Deudas } = require('../models');
const { verIdUsuario } = require('../helpers/jwt');


// Obtener todos los deudas - retorna: /Total registros /registros paginados
const obtDeudas = async (req = request, res = response) => {
    const { limite = 5, desde = 1 } = req.query;

    usuario_id = await verIdUsuario(req, res);
    const query = { usuario_id };

    try {
        const { count: total, rows: filas } = await Deudas.findAndCountAll({
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

// Obtener deuda por id - retorna: /Deuda por id
const obtDeuda = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        const deuda = await Deudas.findByPk(id);

        res.status(200).json({
            deuda
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

// Crear deuda - retorna: /Deuda creado
const crearDeuda = async (req = request, res = response) => {
    const { fecha,
        descripcion,
        gasto_id } = req.body;

    usuario_id = await verIdUsuario(req, res);

    const deuda = new Deudas({
        fecha,
        descripcion,
        gasto_id
    });

    try {
        await deuda.save();

        res.json({
            msg: "Deuda creado correctamente!",
            deuda
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal Server Error!",
            error
        });
    }
}

// Actualizar deuda - retorna: /Deudas actualizado
const actDeuda = async (req = request, res = response) => {
    const { id } = req.params;

    const { fecha,
        descripcion,
        gasto_id } = req.body;

    try {

        const deuda = await Deudas.update({
            fecha,
            descripcion,
            gasto_id
        }, {
            where: {
                iddeudas: id
            }
        });

        res.status(200).json({
            msg: "Deuda actualizado correctamente",
            deuda
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

// Eliminar deuda - retorna: /Deuda eliminado
const eliDeuda = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const deuda = await Deudas.destroy({
            where: {
                iddeudas: id
            }
        });

        res.status(200).json({
            msg: "Deuda eliminado correctamente",
            deuda
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

module.exports = {
    obtDeudas,
    obtDeuda,
    crearDeuda,
    actDeuda,
    eliDeuda
}