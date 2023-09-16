const auth = require('./auth.controller');
const deudas = require('./deudas.controller')
const gastos = require('./gastos.controller');
const generales = require('./generales.controller');
const ingresos = require('./ingresos.controller');
const prestamos = require('./prestamo.controller');
const presupuestos = require('./presupuesto.controller');
const usuario = require('./usuario.controller');


module.exports = {
    ...auth,
    ...deudas,
    ...gastos,
    ...generales,
    ...ingresos,
    ...prestamos,
    ...presupuestos,
    ...usuario,
}