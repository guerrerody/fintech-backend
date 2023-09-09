const { Router } = require('express');
const { check } = require('express-validator');
const { obtUsuarios, obtUsuario, crearUsuario, eliUsuario, actUsuario } = require('../controllers');
const { validarCampos , validarJWT } = require('../middlewares');
const { existeUsuarioPorNombreUsuario, existeUsuarioPorCorreo, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();

router.get('/', [
    validarJWT,
    validarCampos
], obtUsuarios);

router.get('/:id', [
    validarJWT,
    check('id').custom(existeUsuarioPorId),
    validarCampos
],obtUsuario);

router.post('/', [
    check('nombre_usuario', 'El nombre de usuario es obligatorio!').notEmpty().optional(),
    check('nombre_usuario').custom(existeUsuarioPorNombreUsuario).optional(),
    check('nombre', 'El nombre es obligatorio!').notEmpty(),
    check('apellido', 'El apellido es obligatorio!').notEmpty(),
    check('correo', 'El email es obligatorio!').notEmpty().optional(),
    check('correo', 'El email no es valido!').isEmail().optional(),
    check('correo').custom(existeUsuarioPorCorreo).optional(),
    check('telefono', 'El numero de telefono debe contener solo caracteres numericos!').isNumeric().optional(),
    check('telefono', 'El numero de telefono debe contener 10 digitos solamente!').isLength({ min: 10, max: 10 }).optional(),
    check('contrasenna', 'La contraseña es obligatoria').notEmpty(),
    check('contrasenna', 'La contraseña debe contener entre 8 y 16 caracteres!').isLength({ min: 8, max: 16 }),
    validarCampos
], crearUsuario);

router.put('/:id', [
    validarJWT,
    check('id').custom(existeUsuarioPorId),
    check('nombre_usuario', 'El nombre de usuario es obligatorio!').notEmpty().optional(),
    check('nombre_usuario').custom(existeUsuarioPorNombreUsuario).optional(),
    check('correo', 'El email es obligatorio!').notEmpty().optional(),
    check('correo', 'El email no es valido!').isEmail().optional(),
    check('correo').custom(existeUsuarioPorCorreo).optional(),
    check('telefono', 'El numero de telefono debe contener solo caracteres numericos!').isNumeric().optional(),
    check('telefono', 'El numero de telefono debe contener 10 digitos solamente!').isLength({ min: 10, max: 10 }).optional(),
    check('contrasenna', 'La contraseña es obligatoria').notEmpty().optional(),
    check('contrasenna', 'La contraseña debe contener entre 8 y 16 caracteres!').isLength({ min: 8, max: 16 }).optional(),
    validarCampos
], actUsuario);

router.delete('/:id', [
    validarJWT,
    check('id').custom(existeUsuarioPorId)
], eliUsuario);

module.exports = router;