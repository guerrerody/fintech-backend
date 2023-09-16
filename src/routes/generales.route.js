const { Router } = require('express');

const { obtCategoriaIngresos, obtCategoriaGastos, obtMetodoPago, obtModalidadPago, obtImpuestos, obtRegistroGastos } = require('../controllers');
const { validarCampos, validarJWT } = require('../middlewares');

const router = Router();


router.get('/registrar-gastos', [
    validarJWT,
    validarCampos
], obtRegistroGastos);

router.get('/categorias-ingreso', [
    validarJWT,
    validarCampos
], obtCategoriaIngresos);

router.get('/categorias-gasto', [
    validarJWT,
    validarCampos
], obtCategoriaGastos);

router.get('/metodos-pago', [
    validarJWT,
    validarCampos
], obtMetodoPago);

router.get('/modalidad-pago', [
    validarJWT,
    validarCampos
], obtModalidadPago);

router.get('/impuestos', [
    validarJWT,
    validarCampos
], obtImpuestos);

module.exports = router;