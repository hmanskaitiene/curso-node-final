import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {uid};
        jwt.sign(payload, config.app.secretOrPrivateKey,{
            expiresIn:'4h'
        },(err,token) =>{
            if (err){
                reject('No se pudo generar token');
            } else {
                resolve(token);
            }
        });
    })
}



export {
    generarJWT
}