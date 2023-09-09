const { Router } = require('express');
const { check } = require('express-validator');

const { obtDeudas, obtDeuda, actDeuda, eliDeuda } = require('../controllers');
const { validarCampos, validarJWT } = require('../middlewares');
const { existePresupuestoPorId } = require('../helpers/db-validators');

const router = Router();


router.get('/', [
    validarJWT,
    validarCampos
], obtDeudas);

router.get('/:id', [
    validarJWT,
    check('id').custom(existePresupuestoPorId),
    validarCampos
], obtDeuda);

router.put('/:id', [
    validarJWT,
    check('fecha', 'La fecha es obligatorio').notEmpty(),
    check('fecha', 'La debe cumplir con el formar AAAA-MM-DD').isDate(),
    check('descripcion', 'La descripcion es obligatorio!').notEmpty(),
    validarCampos
], actDeuda);

router.delete('/:id', [
    validarJWT,
    check('id').custom(existePresupuestoPorId),
    validarCampos
], eliDeuda);


module.exports = router;