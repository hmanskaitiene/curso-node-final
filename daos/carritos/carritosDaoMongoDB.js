import {ContenedorMongoDB} from '../../contenedores/index.js';
import Carrito from '../../models/carrito.js';
import ProductosDaoMongoDB from '../productos/productosDaoMongoDB.js';


class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Carrito);
    }
    async save() {
        try{
            let carrito = {};
            carrito.timestamp = Date.now();
            const nuevo_carrito = await this.saveContent(carrito);
            return nuevo_carrito.id;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async addProductsCart(products, cart_id){
        try{
            const producto = new ProductosDaoMongoDB();
         
            for(const p of products){
                const carrito = await this.getById(cart_id);
                const encontrado = carrito.productos.findIndex(x => (x.valueOf() === p.id));
                if (encontrado < 0){
                    const prod = await producto.getById(p.id);
                    carrito.productos.push(prod);
                }
                await this.updateById(cart_id, carrito);
            }
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }

    async getProductsCart(cart_id){
        try{
            const carrito = await this.getById(cart_id);
            const producto = new ProductosDaoMongoDB();
            const output = [];
            for(const p of carrito.productos){
                output.push( await producto.getById(p) );
            }
            return output;
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }

    async deleteProductCart(product_id, cart_id){
        const carrito = await this.getById(cart_id);
        carrito.productos.pull(product_id);
        await carrito.save();
    }
}

export default CarritosDaoMongoDB;