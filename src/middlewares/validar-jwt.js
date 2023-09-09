const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const { Usuario } = require('../models');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('token-e');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición!'
        });
    }

    try {
        
        const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el usuario que corresponde al id
        const usuario = await Usuario.findByPk( id );

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe BD!'
            })
        }
        
        
        req.usuario = usuario;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no valido!'
        })
    }
}


module.exports = {
    validarJWT
}