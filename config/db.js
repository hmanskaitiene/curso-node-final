import mongoose from 'mongoose'
import knex from "knex";
import {initializeApp,applicationDefault} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
import config from '../config/config.js';


let knexConnection;
let knexConnectionOptions;
let firebaseConnection;
let store_memoria;
let store_file;

const options_sqlite = {
    client:'sqlite3',
    connection:{
        filename:`./${config.app.databaseDirectory}/${config.app.sqliteFilename}`
    },
    useNullAsDefault:true,
}

const options_mariadb = {
    client:'mysql',
    connection:{
        host: config.app.mariadbHost,
        user: config.app.mariadbUser,
        password: config.app.mariadbPassword,
        database: config.app.mariadbDatabase,
    }
}

if (config.app.persistence == 'MARIADB'){
    knexConnection = knex(options_mariadb)
    knexConnectionOptions = options_mariadb
}

if (config.app.persistence == 'SQLITE'){
    knexConnection = knex(options_sqlite)
    knexConnectionOptions = options_sqlite
}


const mongoConnection = async() =>{
    try{
        await mongoose.connect(config.app.mongoCnn,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
    } catch(e){
        throw new Error(`Error en DB ${e.message}`);
    }
}


const getFirebaseConnection = () => {
    initializeApp({
        credential:applicationDefault()
    })

    const db = getFirestore();
    return db;
};

if (config.app.persistence == 'FIREBASE'){
    firebaseConnection = await getFirebaseConnection();
}

if (config.app.persistence == 'MEMORIA'){
    store_memoria = {
        productos_memoria:[],
        carritos_memoria:[],
        usuarios_memoria:[],
        mensajes_memoria:[]
    }
}

if (config.app.persistence == 'FILE'){
    store_file = {
        productos_file : config.app.filenameProductos,
        carritos_file : config.app.filenameCarritos,
        usuarios_file : config.app.filenameUsuarios,
        mensajes_file : config.app.filenameMensajes,
    }
}

export {
    knexConnectionOptions,
    knexConnection,
    mongoConnection,
    firebaseConnection,
    store_memoria,
    store_file
}