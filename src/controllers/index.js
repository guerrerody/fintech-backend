const auth = require('./auth.controller');
const gastos = require('./gastos.controller');
const usuario = require('./usuario.controller');


module.exports = {
    ...auth,
    ...gastos,
    ...usuario
}