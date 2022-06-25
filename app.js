require('dotenv').config();
const Server = require('./models/server');

//Variable administrador definida temporamente
global.ADMINISTRADOR = true;

const server = new Server();
server.listen();