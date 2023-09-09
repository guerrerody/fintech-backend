const { Gasto , Modalidad_pago , Metodo_pago , Impuesto , Categoria_gasto } = require('../models');
const Usuario = require('../models/usuario');


// Valiaciones de usuario
// Validar existe usuario por nombre_usuario
const existeUsuarioPorNombreUsuario = async (nombre_usuario = '') => {
    const existeUsuario = await Usuario.findOne({
        where: {
            nombre_usuario
        }
    });
    if(existeUsuario){
        throw new Error(`El usuario: ${nombre_usuario} ya existe en la BD!`);
    }
}

// Validar existe usuario por correo
const existeUsuarioPorCorreo = async (correo = '') => {
    const existeUsuario = await Usuario.findOne({
        where: {
            correo
        }
    });
    if(existeUsuario){
        throw new Error(`El usuario por correo: ${correo} ya existe en la BD!`);
    }
}

// Validar existe usuario por Id
const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findByPk(id);
    if (!existeUsuario) {
        throw new Error(`El usuario por id: ${id} no existe en la BD!`);
    }
}


// Validaciones de gasto
// Validar existe gasto por Id
const existeGastoPorId = async (id = '') => {
    const existeGasto = await Gasto.findByPk(id);
    if (!existeGasto) {
        throw new Error(`El gasto por id: ${id} no existe en la BD!`);
    }
}

// Validar existe categoria_gasto por Id
const existeCategoriaGastoPorId = async (id = '') => {
    const existeCategoriaGasto = await Categoria_gasto.findByPk(id);
    if (!existeCategoriaGasto) {
        throw new Error(`La categoria por id: ${id} no existe en la BD!`);
    }
}


// Validaciones campos generales
// Validar existe modalidad_pago por Id
const existeModalidaPagoPorId = async (id = '') => {
    const existeModalidad_pago = await Modalidad_pago.findByPk(id);
    if (!existeModalidad_pago) {
        throw new Error(`La modalidad de pago por id: ${id} no existe en la BD!`);
    }
}

// Validar existe metodo_pago por Id
const existeMetodoPagoPorId = async (id = '') => {
    const existeMetodo_pago = await Metodo_pago.findByPk(id);
    if (!existeMetodo_pago) {
        throw new Error(`El metodo de pago por id: ${id} no existe en la BD!`);
    }
}

// Validar existe Impuesto por Id
const existeImpuestoPorId = async (id = '') => {
    const existeImpuesto = await Impuesto.findByPk(id);
    if (!existeImpuesto) {
        throw new Error(`El impuesto por id: ${id} no existe en la BD!`);
    }
}

module.exports = {
    existeUsuarioPorNombreUsuario,
    existeUsuarioPorCorreo,
    existeUsuarioPorId,
    existeGastoPorId,
    existeCategoriaGastoPorId,
    existeModalidaPagoPorId,
    existeMetodoPagoPorId,
    existeImpuestoPorId
}