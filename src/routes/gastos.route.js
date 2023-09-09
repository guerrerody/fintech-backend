const { Router } = require('express');
const { check } = require('express-validator');

const { obtGastos , crearGasto , obtGasto , actGasto, eliGasto } = require('../controllers');
const { validarCampos, validarJWT } = require('../middlewares');
const { existeCategoriaGastoPorId,
    existeModalidaPagoPorId,
    existeMetodoPagoPorId,
    existeImpuestoPorId, 
    existeGastoPorId} = require('../helpers/db-validators');

const router = Router();


router.get('/', [
    validarJWT,
    validarCampos
], obtGastos);

router.get('/:id', [
    validarJWT,
    check('id').custom(existeGastoPorId),
    validarCampos
], obtGasto);

router.post('/', [
    validarJWT,
    check('fecha', 'La fecha es obligatorio').notEmpty(),
    check('fecha', 'La debe cumplir con el formar AAAA-MM-DD').isDate(),
    check('monto', 'El monto es obligatorio!').notEmpty(),
    check('monto', 'El monto es un valor numerico!').isDecimal(),
    check('nombre', 'El nombre es obligatorio!').notEmpty(),
    check('categoria_gasto_id', 'La categoria es obligatoria!').notEmpty(),
    check('categoria_gasto_id', 'La categoria es es un valor entero!').isInt(),
    check('categoria_gasto_id').custom(existeCategoriaGastoPorId),
    check('modalidad_pago_id', 'La modalida de pago es obligatoria!').notEmpty(),
    check('modalidad_pago_id', 'La modalida de pago es un valor entero (id)!').isInt(),
    check('modalidad_pago_id').custom(existeModalidaPagoPorId),
    check('metodo_pago_id', 'El metodo de pago es obligatorio!').notEmpty(),
    check('metodo_pago_id', 'El metodo de pago es un valor entero (id)!').isInt(),
    check('metodo_pago_id').custom(existeMetodoPagoPorId),
    check('impuesto_id', 'El impuesto es obligatorio!').notEmpty(),
    check('impuesto_id', 'El  impuesto es un valor entero (id)!').isInt(),
    check('impuesto_id').custom(existeImpuestoPorId),
    validarCampos
], crearGasto);

router.put('/:id', [
    validarJWT,
    check('id').custom(existeGastoPorId),
    check('fecha', 'La debe cumplir con el formar XX-XX-XXXX').isDate().optional(),
    check('monto', 'El monto es obligatorio!').notEmpty().optional(),
    check('monto', 'El monto es un valor numerico!').isDecimal().optional(),
    check('categoria_gasto_id', 'La categoria es obligatoria!').notEmpty().optional(),
    check('categoria_gasto_id', 'La categoria es es un valor entero!').isInt().optional(),
    check('categoria_gasto_id').custom(existeCategoriaGastoPorId).optional(),
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
], actGasto);

router.delete('/:id', [
    validarJWT,
    check('id').custom(existeGastoPorId),
    validarCampos
], eliGasto);


module.exports = router;