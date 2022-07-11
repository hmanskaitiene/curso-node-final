import dotenv from 'dotenv';
dotenv.config();

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

let productoSelected;
let carritoSelected;

if (process.env.ENGINE == 'MONGODB'){
    console.log('MongoDB elegido');
    productoSelected = ProductosDaoMongoDB;
    carritoSelected = CarritosDaoMongoDB;
}

if (process.env.ENGINE == 'SQLITE'){
    console.log('Sqlite elegido');
    productoSelected = ProductosDaoSQLite;
    carritoSelected = CarritosDaoSQLite;
}

if (process.env.ENGINE == 'MARIADB'){
    console.log('MariaDB elegido');
    productoSelected = ProductosDaoMariaDB;
    carritoSelected = CarritosDaoMariaDB;
}

if (process.env.ENGINE == 'FILE'){
    console.log('File elegido');
    productoSelected = ProductosDaoArchivo;
    carritoSelected = CarritosDaoArchivo;
}

if (process.env.ENGINE == 'FIREBASE'){
    console.log('Firebase elegido');
    productoSelected = ProductosDaoFirebase;
    carritoSelected = CarritosDaoFirebase;
}

if (process.env.ENGINE == 'MEMORIA'){
    console.log('Memoria elegido');
    productoSelected = ProductosDaoMemoria;
    carritoSelected = CarritosDaoMemoria;
}


export {
    productoSelected as Producto,
    carritoSelected as Carrito,
}