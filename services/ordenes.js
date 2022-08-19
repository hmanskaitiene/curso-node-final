import { Usuario }  from '../daos/index.js';
import OrdenPersistenceFactory from '../daos/ordenes/ordenPersistenceFactory.js';   
import CartService  from '../services/carrito.js';
import OrdenDto from '../dtos/ordenDto.js'
import { enviarMailAdministrador } from '../utils/mailer.js';
import { sendMessage } from '../utils/messenger.js';
import logger  from '../utils/logger.js';

const cartService = new CartService()

class OrderService {
    constructor() {
        this.ordenesDao;
        this.init();
    }

    init = async () => {
        this.ordenesDao = await OrdenPersistenceFactory.getPersistence();
    };

    createOrder = async (idCart) => {
        const {data : cartInfo} = await cartService.getCartInfo(idCart);
        const productos = cartInfo.productos;
        
        const usuario = new Usuario();
        const user = await usuario.getByField('email', cartInfo.email);
        
        const orderNew = await this.ordenesDao.save(cartInfo)
        await cartService.deleteCart(idCart);

        const smsMsg = `Gracias ${user.nombre}, hemos recibido su pedido y se encuentra en proceso de preparación. Próximamente recibirá novedades en su email.`
        const subject = `Nuevo pedido de ${user.nombre} (${user.email})`


        //Envío de SMS
        await sendMessage(user.telefono, smsMsg)
        //Envío de Whatsapp
        await sendMessage(user.telefono, subject, true)
        //Envío de mail
        await enviarMailAdministrador('nuevoPedido', subject, {user,productos});


        return { status:201, data:{mensaje: `Se ha generado la orden con el numero ${orderNew.numero}`}} 
    }

    getOrdersByEmail = async (email) => {
        const results = await this.ordenesDao.getByField('email', email, false);
        results.forEach((orden) => {
            orden.total = orden.productos.map(item => item.total).reduce((prev, next) => prev + next);
        });

        const data = results.map((orden) => new OrdenDto(orden));
        return { status:200, data} 
    }
}

export default OrderService;