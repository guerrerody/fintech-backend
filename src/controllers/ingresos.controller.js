const { request, response } = require("express");
const { Ingreso } = require('../models');
const { verIdUsuario } = require('../helpers/jwt');


// Obtener todos los ingresos - retorna: /Total registros /registros paginados
const obtIngresos = async (req = request, res = response) => {
    const { limite = 5, desde = 1 } = req.query;
    
    usuario_id = await verIdUsuario(req, res);
    const query = { usuario_id };

    try {
        const { count: total, rows: filas } = await Ingreso.findAndCountAll({
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

// Obtener ingreso por id - retorna: /Ingreso por id
const obtIngreso = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        const ingreso = await Ingreso.findByPk(id);

        res.status(200).json({
            ingreso
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

// Crear ingreso - retorna: /Ingreso creado
const crearIngreso = async (req = request, res = response) => {
    const { fecha,
        nombre,
        monto,
        descripcion,
        categoria_ingreso_id,
        metodo_pago_id,
        impuesto_id} = req.body;

        usuario_id = await verIdUsuario(req, res);

    const ingreso = new Ingreso({
        fecha,
        nombre,
        descripcion,
        monto,
        categoria_ingreso_id,
        metodo_pago_id,
        impuesto_id,
        usuario_id
    });

    try {
        await ingreso.save();

        res.json({
            msg: "Ingreso creado correctamente!",
            ingreso
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal Server Error!",
            error
        });
    }
}

// Actualizar ingreso - retorna: /Ingreso actualizado
const actIngreso = async (req = request, res = response) => {
    const { id } = req.params;

    const { fecha,
        nombre,
        monto,
        descripcion,
        categoria_ingreso_id,
        modalidad_pago_id,
        metodo_pago_id,
        impuesto_id } = req.body;

    try {

        const ingreso = await Ingreso.update({
            fecha,
            nombre,
            monto,
            descripcion,
            categoria_ingreso_id,
            modalidad_pago_id,
            metodo_pago_id,
            impuesto_id
        }, {
            where: {
                idingreso: id
            }
        });

        res.status(200).json({
            msg: "Ingreso actualizado correctamente",
            ingreso
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

// Eliminar ingreso - retorna: /Ingreso eliminado
const eliIngreso = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const ingreso = await Ingreso.destroy({
            where: {
                idingreso: id
            }
        });

        res.status(200).json({
            msg: "Ingreso eliminado correctamente",
            ingreso
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

module.exports = {
    obtIngresos,
    obtIngreso,
    crearIngreso,
    actIngreso,
    eliIngreso
}