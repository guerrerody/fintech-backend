const express = require('express');
const cors = require('cors');

const db = require('../database/db-conection');
const fileUpload = require('express-fileupload');

require('./Gasto');
require('./Categoria_gasto');
require('./Modalidad_pago');
require('./Metodo_pago');
require('./Impuesto');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // Rutas
        this.paths = {
            auth: '/api/auth',
            deudas: '/api/deudas',
            gasto: '/api/gasto',
            ingreso: '/api/ingreso',
            prestamo: '/api/prestamo',
            presupuesto: '/api/presupuesto',
            usuario: '/api/usuario'
        }

        // Conectar con base de datos.
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();
    }

    async conectarDB(){
        try {
            await db.authenticate();
            // await db.sync({alter: true});
            console.log('Base de datos en linea!');
        } catch (error) {
            console.error('No fue posible conectar con base de datos:', error);
        }
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // Lectura y parseo del Body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));

        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use( this.paths.auth , require('../routes/auth.route') );
        this.app.use( this.paths.deudas , require('../routes/deudas.route') );
        this.app.use( this.paths.gasto , require('../routes/gastos.route') );
        this.app.use( this.paths.ingreso , require('../routes/ingresos.route') );
        this.app.use( this.paths.prestamo , require('../routes/prestamos.route') );
        this.app.use( this.paths.presupuesto , require('../routes/presupuesto.route') );
        this.app.use( this.paths.usuario , require('../routes/usuario.route') );
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ' + this.port);
        });
    }
}


module.exports = Server;