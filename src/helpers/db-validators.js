const { Gasto , Modalidad_pago , Metodo_pago , Impuesto , Categoria_gasto, Ingreso, Categoria_ingreso, Prestamo, Presupuesto, Deudas } = require('../models');
const Usuario = require('../models/Usuario');


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

// Validaciones de gasto
// Validar existe gasto por Id
const existeGastoPorId = async (id = '') => {
    const existeGasto = await Gasto.findByPk(id);
    if (!existeGasto) {
        throw new Error(`El gasto por id: ${id} no existe en la BD!`);
    }
}

// Validaciones de deudas
// Validar existe deudas por Id
const existeDeudaPorId = async (id = '') => {
    const existeDeuda= await Deudas.findByPk(id);
    if (!existeDeuda) {
        throw new Error(`El deuda por id: ${id} no existe en la BD!`);
    }
}

// Validar existe categoria_gasto por Id
const existeCategoriaGastoPorId = async (id = '') => {
    const existeCategoriaGasto = await Categoria_gasto.findByPk(id);
    if (!existeCategoriaGasto) {
        throw new Error(`La categoria por id: ${id} no existe en la BD!`);
    }
}

// Validaciones de ingreso
// Validar existe ingreso por Id
const existeIngresoPorId = async (id = '') => {
    const existeIngreso = await Ingreso.findByPk(id);
    if (!existeIngreso) {
        throw new Error(`El ingreso por id: ${id} no existe en la BD!`);
    }
}

// Validar existe categoria_ingreso por Id
const existeCategoriaIngresoPorId = async (id = '') => {
    const existeCategoriaIngreso = await Categoria_ingreso.findByPk(id);
    if (!existeCategoriaIngreso) {
        throw new Error(`La categoria por id: ${id} no existe en la BD!`);
    }
}

// Validaciones de prestamo
// Validar existe prestamo por Id
const existePrestamoPorId = async (id = '') => {
    const existeIngreso = await Prestamo.findByPk(id);
    if (!existeIngreso) {
        throw new Error(`El prestamo por id: ${id} no existe en la BD!`);
    }
}

// Validaciones de presupuesto
// Validar existe presupuesto por Id
const existePresupuestoPorId = async (id = '') => {
    const existePresupuesto = await Presupuesto.findByPk(id);
    if (!existePresupuesto) {
        throw new Error(`El presupuesto por id: ${id} no existe en la BD!`);
    }
}


module.exports = {
    existeUsuarioPorNombreUsuario,
    existeUsuarioPorCorreo,
    existeUsuarioPorId,
    existeModalidaPagoPorId,
    existeMetodoPagoPorId,
    existeImpuestoPorId,
    existeGastoPorId,
    existeCategoriaGastoPorId,
    existeIngresoPorId,
    existeCategoriaIngresoPorId,
    existePrestamoPorId,
    existePresupuestoPorId
}