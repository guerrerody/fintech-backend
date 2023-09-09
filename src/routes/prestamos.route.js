const { Router } = require('express');
const { check } = require('express-validator');

const { obtPrestamos, obtPrestamo, crearPrestamo, actPrestamo, eliPrestamo } = require('../controllers');
const { validarCampos, validarJWT } = require('../middlewares');
const { existeMetodoPagoPorId,
    existePrestamoPorId } = require('../helpers/db-validators');

const router = Router();


router.get('/', [
    validarJWT,
    validarCampos
], obtPrestamos);

router.get('/:id', [
    validarJWT,
    
    check('id').custom(existePrestamoPorId),
    validarCampos
], obtPrestamo);

router.post('/', [
    validarJWT,
    check('fecha', 'La fecha es obligatorio').notEmpty(),
    check('fecha', 'La debe cumplir con el formar AAAA-MM-DD').isDate(),
    check('fecha_cumplimiento', 'La fecha de cumplimiento es obligatorio').notEmpty(),
    check('fecha_cumplimiento', 'La fecha de cumplimiento debe cumplir con el formato AAAA-MM-DD').isDate(),
    check('descripcion', 'La descripcion es obligatorio!').notEmpty(),
    check('total', 'El total es obligatorio!').notEmpty(),
    check('total', 'El total es un valor numerico!').isDecimal(),
    check('metodo_pago_id', 'El metodo de pago es obligatorio!').notEmpty(),
    check('metodo_pago_id', 'El metodo de pago es un valor entero (id)!').isInt(),
    check('metodo_pago_id').custom(existeMetodoPagoPorId),
    validarCampos
], crearPrestamo);

router.put('/:id', [
    validarJWT,
    check('fecha', 'La fecha es obligatorio').notEmpty(),
    check('fecha', 'La debe cumplir con el formar AAAA-MM-DD').isDate(),
    check('fecha_cumplimiento', 'La fecha de cumplimiento es obligatorio').notEmpty(),
    check('fecha_cumplimiento', 'La fecha de cumplimiento debe cumplir con el formato AAAA-MM-DD').isDate(),
    check('descripcion', 'La descripcion es obligatorio!').notEmpty(),
    check('total', 'El total es obligatorio!').notEmpty(),
    check('total', 'El total es un valor numerico!').isDecimal(),
    check('metodo_pago_id', 'El metodo de pago es obligatorio!').notEmpty(),
    check('metodo_pago_id', 'El metodo de pago es un valor entero (id)!').isInt(),
    check('metodo_pago_id').custom(existeMetodoPagoPorId),
    validarCampos
], actPrestamo);

router.delete('/:id', [
    validarJWT,
    check('id').custom(existePrestamoPorId),
    validarCampos
], eliPrestamo);


module.exports = router;