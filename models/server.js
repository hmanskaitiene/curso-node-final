import express from 'express'
import routerProductos from "../routes/productos.js"
import routerCarrito from "../routes/carrito.js"
import { mongoConnection } from '../config/db.js';
class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 8080
        this.administrador = false;

        this.paths = {
            productos:       '/api/productos',
            carrito:     '/api/carrito',
        }

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        if (process.env.ENGINE == 'MONGODB'){
            await mongoConnection();
        }
    }

    middlewares() {
        this.app.use( express.json() );
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.paths.productos, routerProductos);
        this.app.use( this.paths.carrito, routerCarrito );

        this.app.use('*', function(req, res){
            const path = req.originalUrl;
            const metodo = req.method;
            res.status(401).json({
                    error: -2,
                    descripcion:`ruta ${path} método ${metodo} no implementada`
            });
        });
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

export default Server;
