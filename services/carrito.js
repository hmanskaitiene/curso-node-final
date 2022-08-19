import CarritoPersistenceFactory from '../daos/carritos/carritoPersistenceFactory.js';   
import CarritoDto from '../dtos/carritoDto.js'
import UserService from '../services/usuarios.js';
const userService = new UserService();

import logger  from '../utils/logger.js';

class CartService {
    constructor() {
        this.carritosDao;
        this.init();
    }

    init = async () => {
        this.carritosDao = await CarritoPersistenceFactory.getPersistence();
      };

    addCart = async(cartObject) => {
        const cart = await this.carritosDao.save(cartObject);
        return { status:201, data: new CarritoDto(cart) }
    }

    deleteCart = async (id) => {
        const carrito = await this.carritosDao.getById(id);
        if (carrito !== null) {
            const data = await this.carritosDao.deleteById(id)
            return { status:200, data: new CarritoDto(data) }
        } else {
            const error = `carrito no encontrado`;
            logger.error(error);
            return { status:400, data:{ error }}
        }
    }

    addProductsCart = async (id, products) => {
        const carrito = await this.carritosDao.getById(id);
        if (carrito !== null) {
            const data = await this.carritosDao.addProductsCart(products, id);
            return { status:201, data}
        } else {
            const error = `carrito no encontrado`;
            logger.error(error);
            return { status:400, data:{ error }}
        }
    }

    getProductsCart = async (cartId) => {
        const carrito = await this.carritosDao.getById(cartId);
        if (carrito !== null) {
            const data = await this.carritosDao.getProductsCart(cartId);
            return { status:200, data}
        } else {
            const error = `carrito no encontrado`;
            return { status:400, data:{ error }}
        }
    }

    deleteProductCart = async (cartId, productId) => {
        try {
            const data = await this.carritosDao.deleteProductCart(productId, cartId);
            return { status:200, data}
        } catch (error) {
            return { status:400, data:{ error : error.message } }
        }
    }

    getCartInfo = async (cartId) => {
        if (cartId !== null){
            const data = await this.carritosDao.getById(cartId);
            return { status:200, data:new CarritoDto(data) };
        } else {
            const error = `Debe ingresar un identificador de carrito`;
            logger.error(error);
            return { status:400, data:{ error }}
        }
        
    }

    getCartByEmail = async (email) => {
        const user = await userService.getUserByEmail( email );

        if (user === null) {
            return { status:400, data:{error: 'Usuario no encontrado'} }
        }

        const cartFromDb = await this.carritosDao.getByField('email', email);

        if (cartFromDb === null) {
            return await this.addCart({ email, direccion:user.direccion });
        }

        const carrito = new CarritoDto(cartFromDb);
        const data = await this.carritosDao.getById(carrito.id)

        return { status:200, data:new CarritoDto(data) }
    }
}

export default CartService;