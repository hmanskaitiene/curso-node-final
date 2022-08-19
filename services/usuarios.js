import bcryptjs from 'bcryptjs';
import cloudinary from 'cloudinary'
import config from '../config/config.js';
import { enviarMailAdministrador } from '../utils/mailer.js';
import logger  from '../utils/logger.js';
import { generarJWT } from '../utils/jwt.js';
import UsuarioPersistenceFactory from '../daos/usuarios/usuarioPersistenceFactory.js';   
import UsuarioDto from '../dtos/usuarioDto.js'

cloudinary.config(config.app.cloudinaryUrl);

class UserService {
    constructor() {
        this.usuariosDao;
        this.init();
    }

    init = async () => {
        this.usuariosDao = await UsuarioPersistenceFactory.getPersistence();
      };

    login = async(email, passw) => {
        try {
            
            const usuario = await this.usuariosDao.getByField('email', email);
            if (!usuario) {
                return { status:400, data: {error:'Usuario/Password incorrectos'} }
            }
    
            const userDto = new UsuarioDto(usuario);
            const validPassword = bcryptjs.compareSync(passw, userDto.password);
    
            if (!validPassword) {
                return { status:400, data: {error:'Usuario/Password incorrectos'} }
            }
    
            const token = await generarJWT(userDto.id);

            const { password, ...data } = userDto;

            return { status:200, data:{
                user:data,
                token,
                authenticated:true
            }}
    
        } catch (error) {
            logger.error(error.message);
            return { status:400, data: {error:error.message} }
        }
    }

    signup = async(userData) => {
        const usuario = await this.usuariosDao.save(userData);
        if (usuario.error) {
            const error = usuario.errorCode == 11000 ? 'El correo ya se encuentra registrado.':'No se pudo registrar el usuario';
            logger.error(error);
            return { status:400, data: {error} }
        }

        const userDto = new UsuarioDto(usuario);
        const salt = bcryptjs.genSaltSync();
        userDto.password = bcryptjs.hashSync(userData.password,salt);
    
        await this.usuariosDao.updateById(userDto.id, userDto) ;

        const token = await generarJWT(userDto.id);

        const { password, ...data } = userDto;
        data.token = token;
        data.registered = true;

        enviarMailAdministrador('nuevoRegistro', 'Nuevo registro', userData)

        return { status:201, data}
    }

    userUpdate = async(id, userData) => {
        const usuario = await this.usuariosDao.updateById(id, userData) ;

        const userDto = new UsuarioDto(usuario);
        const { password, ...data } = userDto;
        data.updated = true;

        return { status:200, data}
    }

    userImage = async (id,tempFilePath) => {
        let user = await this.usuariosDao.getById(id);

        //Se borra la imagen en el caso que exista
        if (user.imageProfile) {
            const nombreArr = user.imageProfile.split('/');
            const nombre = nombreArr.slice(-2).join('/');
            const [ public_id] = nombre.split('.');
            cloudinary.v2.uploader.destroy(public_id);
        }
    
        const {secure_url} = await cloudinary.v2.uploader.upload(tempFilePath, {
            folder:'profileImage', 
            responsive_breakpoints: { 
                create_derived: true, bytes_step: 20000, max_width: 150, 
                transformation: { crop: 'fill', aspect_ratio: '16:9', gravity: 'auto' } 
            } 
        });
    
        user.imageProfile = secure_url;

        const usuario = await this.usuariosDao.updateById(id, user) ;
        const userDto = new UsuarioDto(usuario);
    
        const { password, ...data } = userDto;
        data.uploaded = true;
  
        return { status:200, data}
    }

    getUserByEmail = async (email) => {
        const result = await this.usuariosDao.getByField('email', email);
        return result ? new UsuarioDto(result) : null;
    }

    getUserById = async (id) => {
        const result = await this.usuariosDao.getById(id);
        return result ? new UsuarioDto(result) : null;
    }
}

export default UserService;