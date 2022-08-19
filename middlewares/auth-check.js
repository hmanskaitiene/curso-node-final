import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import UserService from '../services/usuarios.js';
const userService = new UserService();

const validarJWT = async ( req , res, next)=> {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            error:'No hay token'
        });
    }

    try {
        const {uid} = jwt.verify(token,config.app.secretOrPrivateKey);
        req.uid = uid;

        const usuario = await userService.getUserById(uid);

        if (!usuario) {
            return res.status(401).json({
                error:'Token no valido. User no existe'
            });
        }
        const { password, ...data } = usuario;
        req.usuario = data;

        next();        
    } catch (error) {
        res.status(401).json({error: 'Token no válido' });
    }
}


const esAdmin = (req, res, next) => {
    if (!req.usuario){
        res.status(500).json({
            error:'Error al verificar token'
        })
    }
    const{ rol, nombre } = req.usuario;

    if (rol !== 'ADMIN') {
        res.status(401).json({
            error :`${nombre} no es un administrador`
        })
    }

    next();
}

export {
    validarJWT,
    esAdmin,
}