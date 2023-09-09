const { Router } = require('express');
const { check } = require('express-validator');

const { obtIngresos, obtIngreso, crearIngreso, actIngreso, eliIngreso } = require('../controllers');
const { validarCampos, validarJWT } = require('../middlewares');
const { existeModalidaPagoPorId,
    existeMetodoPagoPorId,
    existeImpuestoPorId,
    existeIngresoPorId,
    existeCategoriaIngresoPorId} = require('../helpers/db-validators');

const router = Router();


router.get('/', [
    validarJWT,
    validarCampos
], obtIngresos);

router.get('/:id', [
    validarJWT,
    check('id').custom(existeIngresoPorId),
    validarCampos
], obtIngreso);

router.post('/', [
    validarJWT,
    check('fecha', 'La fecha es obligatorio').notEmpty(),
    check('fecha', 'La fecha debe cumplir con el formar AAAA-MM-DD').isDate(),
    check('nombre', 'El nombre es obligatorio!').notEmpty(),
    check('monto', 'El monto es obligatorio!').notEmpty(),
    check('monto', 'El monto es un valor numerico!').isDecimal(),
    check('categoria_ingreso_id', 'La categoria es obligatoria!').notEmpty(),
    check('categoria_ingreso_id', 'La categoria es es un valor entero!').isInt(),
    check('categoria_ingreso_id').custom(existeCategoriaIngresoPorId),
    check('metodo_pago_id', 'El metodo de pago es obligatorio!').notEmpty(),
    check('metodo_pago_id', 'El metodo de pago es un valor entero (id)!').isInt(),
    check('metodo_pago_id').custom(existeMetodoPagoPorId),
    validarCampos
], crearIngreso);

router.put('/:id', [
    validarJWT,
    check('id').custom(existeIngresoPorId),
    check('fecha', 'La fecha debe cumplir con el formato AAAA-MM-DD').isDate().optional(),
    check('monto', 'El monto es obligatorio!').notEmpty().optional(),
    check('monto', 'El monto es un valor numerico!').isDecimal().optional(),
    check('categoria_ingreso_id', 'La categoria es obligatoria!').notEmpty().optional(),
    check('categoria_ingreso_id', 'La categoria es es un valor entero!').isInt().optional(),
    check('categoria_ingreso_id').custom(existeCategoriaIngresoPorId).optional(),
    check('modalidad_pago_id', 'La modalida de pago es obligatoria!').notEmpty().optional(),
    check('modalidad_pago_id', 'La modalida de pago es un valor entero (id)!').isInt().optional(),
    check('modalidad_pago_id').custom(existeModalidaPagoPorId).optional(),
    check('metodo_pago_id', 'El metodo de pago es obligatorio!').notEmpty().optional(),
    check('metodo_pago_id', 'El metodo de pago es un valor entero (id)!').isInt().optional(),
    check('metodo_pago_id').custom(existeMetodoPagoPorId).optional(),
    check('impuesto_id', 'El impuesto es obligatorio!').notEmpty().optional(),
    check('impuesto_id', 'El  impuesto es un valor entero (id)!').isInt().optional(),
    check('impuesto_id').custom(existeImpuestoPorId).optional(),
    validarCampos
], actIngreso);

router.delete('/:id', [
    validarJWT,
    check('id').custom(existeIngresoPorId),
    validarCampos
], eliIngreso);


module.exports = router;