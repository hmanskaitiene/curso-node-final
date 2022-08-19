import cluster from 'cluster';
import cookieParser from 'cookie-parser';
import core from 'os';
import express from 'express';
import fileUpload from 'express-fileupload';
import handlebars from 'express-handlebars';
import http from "http";
const { engine } = handlebars;
import path from'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io'; 

import socketInit from '../utils/sockets.js';
import routerCarrito from "../routes/carrito.js"
import routerProductos from "../routes/productos.js"
import routerShop from "../routes/shop.js"
import routerOrdenes from "../routes/ordenes.js"
import routerUsers from "../routes/usuarios.js"
import routerMensajes from "../routes/mensajes.js"
import routerInformation from "../routes/info.js"

import config from '../config/config.js';
import logger from '../utils/logger.js'
import { mongoConnection } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class App {

    constructor() {
        this.app  = express();
        this.server = http.Server(this.app);
        this.io = new Server(this.server);
        this.port = config.app.port;
        this.modo = config.app.modo;
        this.logger = logger;

        this.paths = {
            productos:  '/api/productos',
            carrito:    '/api/carrito',
            users:      '/api/usuarios',
            orders:     '/api/ordenes',
            mensajes:   '/api/mensajes',
            informacion:'/api/informacion',
            shop:       '/',
        }

        this.conectarDB();
        this.middlewares();
        this.views();
        this.routes();
        this.sockets();
    }

    async conectarDB(){
        if (config.app.persistence == 'MONGODB'){
            await mongoConnection();
        }
    }

    middlewares() {
        this.app.use( express.json() );
        this.app.use( express.static('public') );
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));

        this.app.use(cookieParser());
        this.app.set("logger", this.logger);
  
    }

    routes() {
        this.app.use( this.paths.users, routerUsers );
        this.app.use( this.paths.productos, routerProductos);
        this.app.use( this.paths.carrito, routerCarrito );
        this.app.use( this.paths.shop, routerShop );
        this.app.use( this.paths.orders, routerOrdenes );
        this.app.use( this.paths.mensajes, routerMensajes );
        this.app.use( this.paths.informacion, routerInformation );

        this.app.use('*', (req, res) => {
            const path = req.originalUrl;
            const metodo = req.method;
            const descripcion = `ruta ${path} método ${metodo} no implementada`
            this.logger.warn(descripcion)
            res.status(401).json({
                error: -2,
                descripcion
            });
        });
    }

    views() {
        this.app.engine(
            "hbs",
            engine({
                extname: ".hbs",
                defaultLayout: "layout.hbs",
                layoutsDir: path.join(__dirname,'../views/layouts/'),
                partialsDir: path.join(__dirname,'../views/partials/'),
                runtimeOptions: {
                    allowProtoPropertiesByDefault: true,
                    allowProtoMethodsByDefault: true,
                }
            })
          );
        
        this.app.set("views", "./views");
        this.app.set("view engine", "hbs");
    }

    sockets() {
        this.app.set('io',this.io);
        this.io.on('connection', socketInit );
    }

    start() {
        if (this.modo !== 'fork'){
            if (cluster.isPrimary) {
                this.logger.info(`Proceso principal ID:(${process.pid})`)
                for(let i = 0; i <  core.cpus().length; i++) {
                    cluster.fork();
                }
            
                cluster.on('exit', (worker) => {
                    cluster.fork();
                });
            
            } else {
                this.listen();
            }
        } else {
            this.listen();
        }
    }

    listen() {
        this.server.listen( this.port, () => {
            this.logger.info(`Servidor corriendo en puerto ${this.port}`)
        });
    }

}

export default App;
