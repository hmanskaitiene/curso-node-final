const { response } = require('express')


const esAdmin = ( req, res = response, next ) => {
    const path = req.originalUrl;
    const metodo = req.method;
    if (ADMINISTRADOR !== true){
        return res.status(401).json({
            error: -1,
            descripcion:`ruta ${path} método ${metodo} no autorizada`
        });
    }

    next();
}

module.exports = {
    esAdmin
}
