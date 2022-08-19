import { ContenedorMongoDB } from '../../containers/index.js';
import Mensaje from '../../models/mensaje.js';


class MensajesDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Mensaje);
    }
    async save(mensaje) {
        try{
            const newMsg = await this.saveContent(mensaje);
            return newMsg;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }
    async getMensajesSenders() {
        const senders = await this.distinct('email',{ tipo : 'USER' });
        return senders;
    }
}

export default MensajesDaoMongoDB;