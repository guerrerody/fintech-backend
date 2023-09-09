const { Router } = require('express');
const { check } = require('express-validator');

const { obtPresupuestos, obtPresupuesto, crearPresupuesto, actPresupuesto, eliPresupuesto } = require('../controllers');
const { validarCampos, validarJWT } = require('../middlewares');
const { existePresupuestoPorId } = require('../helpers/db-validators');

const router = Router();


router.get('/', [
    validarJWT,
    validarCampos
], obtPresupuestos);

router.get('/:id', [
    validarJWT,
    check('id').custom(existePresupuestoPorId),
    validarCampos
], obtPresupuesto);

router.post('/', [
    validarJWT,
    check('fecha', 'La fecha es obligatorio').notEmpty(),
    check('fecha', 'La debe cumplir con el formar AAAA-MM-DD').isDate(),
    check('fecha_culminacion', 'La fecha de cumplimiento es obligatorio').notEmpty(),
    check('fecha_culminacion', 'La fecha de cumplimiento debe cumplir con el formato AAAA-MM-DD').isDate(),
    check('nombre', 'La descripcion es obligatorio!').notEmpty(),
    check('monto', 'El total es obligatorio!').notEmpty(),
    check('monto', 'El total es un valor numerico!').isDecimal(),
    validarCampos
], crearPresupuesto);

router.put('/:id', [
    validarJWT,
    check('fecha', 'La fecha es obligatorio').notEmpty(),
    check('fecha', 'La debe cumplir con el formar AAAA-MM-DD').isDate(),
    check('fecha_culminacion', 'La fecha de cumplimiento es obligatorio').notEmpty(),
    check('fecha_culminacion', 'La fecha de cumplimiento debe cumplir con el formato AAAA-MM-DD').isDate(),
    check('nombre', 'La descripcion es obligatorio!').notEmpty(),
    check('monto', 'El total es obligatorio!').notEmpty(),
    check('monto', 'El total es un valor numerico!').isDecimal(),
    validarCampos
], actPresupuesto);

router.delete('/:id', [
    validarJWT,
    check('id').custom(existePresupuestoPorId),
    validarCampos
], eliPresupuesto);


module.exports = router;