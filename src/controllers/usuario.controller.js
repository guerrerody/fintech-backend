const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const { Usuario } = require('../models');



const obtUsuarios = async (req = request, res = response) => {
    const { limite = 5, desde = 1 } = req.query;
    const query = { eliminado_en: null };

    try {
        const { count: total, rows: filas } = await Usuario.findAndCountAll({
            where: query,
            offset: parseInt(desde - 1),
            limit: parseInt(limite)
        });

        res.json({
            total,
            filas
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

const obtUsuario = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        const usuario = await Usuario.findByPk(id);

        res.status(200).json({
            usuario
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

const crearUsuario = async (req = request, res = response) => {
    const { nombre_usuario,
        nombre,
        apellido,
        correo,
        telefono,
        contrasenna } = req.body;

    const usuario = new Usuario({
        nombre_usuario,
        nombre,
        apellido,
        correo,
        telefono,
        contrasenna
    });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.contrasenna = bcryptjs.hashSync(contrasenna, salt);

    try {
        await usuario.save();

        res.json({
            msg: "Usuario creado correctamente!",
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal Server Error!"
        });
    }
}

const actUsuario = async (req = request, res = response) => {
    const { id } = req.params;

    const { nombre_usuario,
        nombre,
        apellido,
        correo,
        telefono,
        contrasenna } = req.body;

    // Encriptar la contraseña
    let nuevaContrasenna = contrasenna;

    if (nuevaContrasenna) {
        const salt = bcryptjs.genSaltSync();
        nuevaContrasenna = bcryptjs.hashSync(nuevaContrasenna, salt);
    }

    try {

        const usuario = await Usuario.update({
            nombre_usuario,
            nombre,
            apellido,
            correo,
            telefono,
            contrasenna: nuevaContrasenna
        }, {
            where: {
                idusuario: id
            }
        });

        res.status(200).json({
            msg: "Usuario actualizado correctamente",
            usuario
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}

const eliUsuario = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.destroy({
            where: {
                idusuario: id
            }
        });

        res.status(200).json({
            msg: "Usuario eliminado correctamente",
            usuario
        });
    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error
        });
    }
}


module.exports = {
    obtUsuarios,
    obtUsuario,
    crearUsuario,
    actUsuario,
    eliUsuario
}