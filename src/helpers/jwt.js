const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const generarJWT = (id = '') => {
    return new Promise((resolve, reject) => {
        const payload = {id};

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: 3600
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token!');
            } else {
                resolve(token);
            }
        });
    });
}

const verIdUsuario = async(req = request , res = response) => {
    const token = req.header('token-e');

    const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    return id;
}

module.exports = {
    generarJWT,
    verIdUsuario
};