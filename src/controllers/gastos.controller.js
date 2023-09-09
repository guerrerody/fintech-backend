const { request, response } = require("express");
const { Gasto } = require('../models');
const { verIdUsuario } = require('../helpers/jwt');


// Obtener todos los gastos - retorna: /Total registros /registros paginados
const obtGastos = async (req = request, res = response) => {
    const { limite = 5, desde = 1 } = req.query;
    const query = { deleted_at: null };

    try {
        const { count: total, rows: filas } = await Gasto.findAndCountAll({
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

// Obtener gasto por id - retorna: /Gasto por id
const obtGasto = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        const gasto = await Gasto.findByPk(id);

        res.status(200).json({
            gasto
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

// Crear gasto - retorna: /Gasto creado
const crearGasto = async (req = request, res = response) => {
    const { fecha,
        nombre,
        descripcion,
        monto,
        categoria_gasto_id,
        modalidad_pago_id,
        metodo_pago_id,
        impuesto_id } = req.body;

        usuario_id = await verIdUsuario(req, res);

    const gasto = new Gasto({
        fecha,
        nombre,
        descripcion,
        monto,
        categoria_gasto_id,
        modalidad_pago_id,
        metodo_pago_id,
        impuesto_id,
        usuario_id
    });

    try {
        await gasto.save();

        res.json({
            msg: "Gasto creado correctamente!",
            gasto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal Server Error!",
            error
        });
    }
}

// Actualizar gasto - retorna: /Gasto actualizado
const actGasto = async (req = request, res = response) => {
    const { id } = req.params;

    const { fecha,
        descripcion,
        monto,
        categoria_gasto_id,
        modalidad_pago_id,
        metodo_pago_id,
        impuesto_id } = req.body;

    try {

        const gasto = await Gasto.update({
            fecha,
            descripcion,
            monto,
            categoria_gasto_id,
            modalidad_pago_id,
            metodo_pago_id,
            impuesto_id
        }, {
            where: {
                id: id
            }
        });

        res.status(200).json({
            msg: "Gasto actualizado correctamente",
            gasto
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

// Eliminar gasto - retorna: /Gasto eliminado
const eliGasto = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const gasto = await Gasto.destroy({
            where: {
                id: id
            }
        });

        res.status(200).json({
            msg: "Gasto eliminado correctamente",
            gasto
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

module.exports = {
    obtGastos,
    obtGasto,
    crearGasto,
    actGasto,
    eliGasto
}