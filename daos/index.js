import config from '../config/config.js';

import CarritosDaoArchivo from './carritos/carritosDaoArchivo.js';
import CarritosDaoMemoria from './carritos/carritosDaoMemoria.js';
import CarritosDaoSQLite from './carritos/carritosDaoSQLite.js';
import CarritosDaoMariaDB from './carritos/carritosDaoMariaDB.js';
import CarritosDaoMongoDB from './carritos/carritosDaoMongoDB.js';
import CarritosDaoFirebase from './carritos/carritosDaoFirebase.js';

import ProductosDaoArchivo from './productos/productosDaoArchivo.js';
import ProductosDaoMemoria from './productos/productosDaoMemoria.js';
import ProductosDaoMariaDB from './productos/productosDaoMariaDB.js';
import ProductosDaoSQLite from './productos/productosDaoSQLite.js';
import ProductosDaoMongoDB from './productos/productosDaoMongoDB.js';
import ProductosDaoFirebase from './productos/productosDaoFirebase.js';

import UsuariosDaoArchivo from './usuarios/usuariosDaoArchivo.js';
import UsuariosDaoMemoria from './usuarios/usuariosDaoMemoria.js';
import UsuariosDaoMariaDB from './usuarios/usuariosDaoMariaDB.js';
import UsuariosDaoSQLite from './usuarios/usuariosDaoSQLite.js';
import UsuariosDaoMongoDB from './usuarios/usuariosDaoMongoDB.js';
import UsuariosDaoFirebase from './usuarios/usuariosDaoFirebase.js';

import OrdenesDaoMongoDB from './ordenes/ordenesDaoMongoDB.js';
import MensajesDaoMongoDB from './mensajes/mensajesDaoMongoDB.js';

let productoSelected,carritoSelected,usuarioSelected,ordenSelected,mensajeSelected;


if (config.app.persistence == 'MONGODB'){
    productoSelected = ProductosDaoMongoDB;
    carritoSelected = CarritosDaoMongoDB;
    usuarioSelected = UsuariosDaoMongoDB;
    ordenSelected = OrdenesDaoMongoDB;
    mensajeSelected = MensajesDaoMongoDB;
}

if (config.app.persistence == 'SQLITE'){
    productoSelected = ProductosDaoSQLite;
    carritoSelected = CarritosDaoSQLite;
    usuarioSelected = UsuariosDaoSQLite;
}

if (config.app.persistence == 'MARIADB'){
    productoSelected = ProductosDaoMariaDB;
    carritoSelected = CarritosDaoMariaDB;
    usuarioSelected = UsuariosDaoMariaDB;
}

if (config.app.persistence == 'FILE'){
    productoSelected = ProductosDaoArchivo;
    carritoSelected = CarritosDaoArchivo;
    usuarioSelected = UsuariosDaoArchivo;
}

if (config.app.persistence == 'FIREBASE'){
    productoSelected = ProductosDaoFirebase;
    carritoSelected = CarritosDaoFirebase;
    usuarioSelected = UsuariosDaoFirebase;
}

if (config.app.persistence == 'MEMORIA'){
    productoSelected = ProductosDaoMemoria;
    carritoSelected = CarritosDaoMemoria;
    usuarioSelected = UsuariosDaoMemoria;
}


export {
    productoSelected as Producto,
    carritoSelected as Carrito,
    usuarioSelected as Usuario,
    ordenSelected as Orden,
    mensajeSelected as Mensaje,
}