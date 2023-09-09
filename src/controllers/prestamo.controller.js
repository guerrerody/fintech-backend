const { request, response } = require("express");
const { Prestamo } = require('../models');
const { verIdUsuario } = require('../helpers/jwt');


// Obtener todos los prestamos - retorna: /Total registros /registros paginados
const obtPrestamos = async (req = request, res = response) => {
    const { limite = 5, desde = 1 } = req.query;

    usuario_id = await verIdUsuario(req, res);
    const query = { usuario_id };

    try {
        const { count: total, rows: filas } = await Prestamo.findAndCountAll({
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

// Obtener prestamo por id - retorna: /Prestamo por id
const obtPrestamo = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        const prestamo = await Prestamo.findByPk(id);

        res.status(200).json({
            prestamo
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

// Crear prestamo - retorna: /Prestamo creado
const crearPrestamo = async (req = request, res = response) => {
    const { fecha,
        fecha_cumplimiento,
        descripcion,
        total,
        metodo_pago_id } = req.body;

    usuario_id = await verIdUsuario(req, res);

    const prestamo = new Prestamo({
        fecha,
        fecha_cumplimiento,
        descripcion,
        total,
        metodo_pago_id,
        usuario_id
    });

    try {
        await prestamo.save();

        res.json({
            msg: "Prestamo creado correctamente!",
            prestamo
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal Server Error!",
            error
        });
    }
}

// Actualizar prestamo - retorna: /Prestamo actualizado
const actPrestamo = async (req = request, res = response) => {
    const { id } = req.params;

    const { fecha,
        fecha_cumplimiento,
        descripcion,
        total,
        metodo_pago_id } = req.body;

    try {

        const prestamo = await Prestamo.update({
            fecha,
            fecha_cumplimiento,
            descripcion,
            total,
            metodo_pago_id
        }, {
            where: {
                idprestamo: id
            }
        });

        res.status(200).json({
            msg: "Prestamo actualizado correctamente",
            prestamo
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

// Eliminar prestamo - retorna: /Prestamo eliminado
const eliPrestamo = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const prestamo = await Prestamo.destroy({
            where: {
                idprestamo: id
            }
        });

        res.status(200).json({
            msg: "Prestamo eliminado correctamente",
            prestamo
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

module.exports = {
    obtPrestamos,
    obtPrestamo,
    crearPrestamo,
    actPrestamo,
    eliPrestamo
}