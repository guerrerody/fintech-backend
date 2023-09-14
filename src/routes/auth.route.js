const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');


const { login, validarToken } = require('../controllers/auth.controller');
const { existeUsuarioPorCorreo , existeUsuarioPorNombreUsuario } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares');


const router = Router();

router.post('/login',[
    check('identificador', 'El nombre de usuario / correo es obligatorio!').notEmpty(),
    check('contrasenna', 'La contraseña es obligatoria!').not().isEmpty(),
    validarCampos
],login );

router.get('/auth',[
    validarJWT,
    validarCampos
],validarToken );


module.exports = router;