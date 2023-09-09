const { request , response } = require('express');
const bcryptjs = require('bcryptjs')

const { Usuario } = require('../models');

const { generarJWT } = require('../helpers/jwt');


const login = async(req = request, res = response) => {

    const { identificador , contrasenna } = req.body;

    try {
      
        // Verificar si el email existe
        let usuario = await Usuario.findOne({
            where: {
                correo: identificador
            }
        });

        if ( !usuario ) {
            usuario = await Usuario.findOne({
                where: {
                    nombre_usuario: identificador
                }
            });
            if( !usuario ){
                return res.status(400).json({
                    msg: 'Nombre de usuario / correo / contraseña no son correctos - identificador'
                });
            }
        }

        // Verificar la contraseña
        const validarcontrasenna = bcryptjs.compareSync( contrasenna, usuario.contrasenna );
        if ( !validarcontrasenna ) {
            return res.status(400).json({
                msg: 'Nombre de usuario / correo / contraseña no son correctos - contrasenna'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.idusuario );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Internal server error'
        });
    }   

}


module.exports = {
    login
}