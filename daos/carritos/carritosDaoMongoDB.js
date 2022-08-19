import {ContenedorMongoDB} from '../../containers/index.js';
import Carrito from '../../models/carrito.js';
import CarritoDto from '../../dtos/carritoDto.js';
import ProductoCarritoDto from '../../dtos/productoCarritoDto.js';
import ProductosDaoMongoDB from '../productos/productosDaoMongoDB.js';

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Carrito);
    }
    async save(cart) {
        try{
            cart.timestamp = Date.now();
            const newCart = await this.saveContent(cart);
            return newCart;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async addProductsCart(products, cartId){
        try{
            const producto = new ProductosDaoMongoDB();
            const carrito = await this.getById(cartId)
            for(const p of products){
                const indiceProductoCarrito = carrito.productos.findIndex(x => (x.id === p.id) );

                if (indiceProductoCarrito < 0){
                    const newProducto = await producto.getById(p.id);
                    carrito.productos.push(new ProductoCarritoDto(newProducto));
                } else {
                    let pc = carrito.productos[indiceProductoCarrito]
                    pc.cantidad += 1;
                    carrito.productos[indiceProductoCarrito] = new ProductoCarritoDto(pc);
                }
            }
            await carrito.save();

            return carrito.productos;
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }

    async getProductsCart(cartId){
        try {
            const cart = await this.getById(cartId);
            return cart.productos.map( productoCarrito => new ProductoCarritoDto( productoCarrito ) )
        } catch (error) {
            return `Hubo un error al obtener los productos`
        }
    }

    async deleteProductCart(productId, cartId){
        const carrito = await this.getById(cartId);
        if (carrito === null) 
            throw new Error('El carrito no existe');

        const indiceProductoCarrito = carrito.productos.findIndex(x => (x.id === productId) );

        if (indiceProductoCarrito === -1) 
            throw new Error('El producto no se encuentra en el carrito');

        if (carrito.productos[indiceProductoCarrito].cantidad === 1){
            carrito.productos.splice(indiceProductoCarrito,1);
        } else {
            let pc = carrito.productos[indiceProductoCarrito]
            pc.cantidad -= 1;
            carrito.productos[indiceProductoCarrito] = new ProductoCarritoDto(pc);
        }

        await carrito.save();
        
        return carrito.productos;
    }
}

export default CarritosDaoMongoDB;