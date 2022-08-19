import { ContenedorMongoDB } from '../../containers/index.js';
import Orden from '../../models/orden.js';
//import ProductosDaoMongoDB from '../productos/productosDaoMongoDB.js';


class OrdenesDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Orden);
    }
    async save(order) {
        try{
            order.timestamp = Date.now();
            const newOrder = await this.saveContent(order);
            return newOrder;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }
}

export default OrdenesDaoMongoDB;