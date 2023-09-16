const { request, response } = require("express");
const { Categoria_ingreso, Categoria_gasto, Metodo_pago, Modalidad_pago, Impuesto } = require("../models");


const obtRegistroGastos = async (req = request, res = response) => {
    try {
        const catIng = await Categoria_ingreso.findAll();
        nombresCatIng = catIng.map(categorias => [categorias.nombre , categorias.idcategoria_ingreso]);

        const catGas = await Categoria_gasto.findAll();
        nombresCatGas = catGas.map(categorias => [categorias.nombre , categorias.idcategoria_gasto]);

        const metPag = await Metodo_pago.findAll();
        nombresMetPag = metPag.map(metodosPago => [metodosPago.nombre, metodosPago.idmetodo_pago]);

        const modPag = await Modalidad_pago.findAll();
        nombresModPag = modPag.map(modalidadPago => [modalidadPago.nombre, modalidadPago.idmodalidad_pago]);

        const imp = await Impuesto.findAll();
        nombresImp = imp.map(impuestos => [impuestos.nombre, impuestos.idimpuesto]);

        res.json({
            nombresCatIng,
            nombresCatGas,
            nombresMetPag,
            nombresModPag,
            nombresImp
        });

    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

const obtCategoriaIngresos = async (req = request, res = response) => {
    try {
        const catIng = await Categoria_ingreso.findAll();

        nombres = catIng.map(categorias => categorias.nombre);

        res.json({
            nombres
        });

    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

const obtCategoriaGastos = async (req = request, res = response) => {
    try {
        const catGas = await Categoria_gasto.findAll();

        nombres = catGas.map(categorias => categorias.nombre);

        res.json({
            nombres
        });

    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

const obtMetodoPago = async (req = request, res = response) => {
    try {
        const metPag = await Metodo_pago.findAll();

        nombres = metPag.map(metodosPago => metodosPago.nombre);

        res.json({
            nombres
        });

    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

const obtModalidadPago = async (req = request, res = response) => {
    try {
        const modPag = await Modalidad_pago.findAll();

        nombres = modPag.map(modalidadPago => modalidadPago.nombre);

        res.json({
            nombres
        });

    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

const obtImpuestos = async (req = request, res = response) => {
    try {
        const imp = await Impuesto.findAll();

        nombres = imp.map(impuestos => impuestos.nombre);

        res.json({
            nombres
        });

    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

module.exports = {
    obtRegistroGastos,
    obtCategoriaIngresos,
    obtCategoriaGastos,
    obtMetodoPago,
    obtModalidadPago,
    obtImpuestos
}