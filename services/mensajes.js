import config from '../config/config.js';
import MensajePersistenceFactory from '../daos/mensajes/mensajePersistenceFactory.js';   
import MensajeDto from '../dtos/mensajeDto.js'
import UserService from './usuarios.js'
import logger  from '../utils/logger.js';
const userService = new UserService();

class MensajeService {
    constructor() {
        this.mensajesDao;
        this.init();
    }

    init = async () => {
        this.mensajesDao = await MensajePersistenceFactory.getPersistence();
    };

    createMensaje = async (message) => {
        const msg = await this.mensajesDao.save(message)
        const user = await userService.getUserByEmail(message.email);
        const data = new MensajeDto(msg);
        data.imageProfile = (msg.tipo === 'USER') ? user.imageProfile : config.app.imageProfileCommerce;
       
        return { status:201, data }
    }

    getMensajesByEmail = async (email) => {
        const result = await this.mensajesDao.getByField('email', email, false);

        const user = await userService.getUserByEmail(email);
        const data = result.map((message) => {
            const msg = new MensajeDto(message);
            msg.imageProfile = (msg.tipo === 'USER') ? user.imageProfile : config.app.imageProfileCommerce;
            return msg;
        });

        return { status:200, data} 
    }
    getMensajesSenders = async () => {
        const result = await this.mensajesDao.getMensajesSenders();

        const promises = result.map(async (email) => {
            const user = await userService.getUserByEmail(email);
            return {
                imageProfile: user.imageProfile,
                email
            }
        });

        const data = await Promise.all(promises)
        return { status:200, data} 
    }
}

export default MensajeService;