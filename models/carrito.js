const fs = require('fs').promises
const Producto  = require('../models/producto');
const db_path = './db'

class Carrito {
    constructor(filename = 'carritos.json'){
        this.filename = `${db_path}/${filename}`;
    }

    
    async save() {
        try{
            let carrito = {};
            carrito.id = await this.__getNextId();
            carrito.timestamp = Date.now();
            const carritos = await this.getAll();
            carrito.productos = [];
            carritos.push(carrito);
            await fs.writeFile(this.filename,JSON.stringify(carritos));
            return carrito.id;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }
    async getAll() {
        try{
            const info = await fs.readFile(this.filename,'utf-8')
            const data = JSON.parse(info);
            return data.map(p => p);
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async getById(id){

        try{
            if (typeof id === 'undefined') {
                throw new Error(`Debe completar el id`);
            }

            const carritos = await this.getAll();
            const carrito = carritos.find(p => p.id === id);
            
            return typeof carrito === 'undefined' ? null: carrito;
        }
        catch(e){
            return `Hubo un error "${e.message}"`
        }
    }
    async deleteById(id){
        try{
            if (typeof id === 'undefined') {
                throw new Error(`Debe completar el id`);
            }

            const carritos = await this.getAll();
            const index = carritos.findIndex(p => {return p.id === id;});

            //Por si no existe el producto
            if (index > -1){
                let carritos = await this.getAll();
                carritos.splice(index, 1);
                await fs.writeFile(this.filename,JSON.stringify(carritos));
            }
        }
        catch(e){
            return `Hubo un error "${e.message}"`
        }

    }

    async updateById(id, cart){
        try{
            const carritos = await this.getAll();
            const index = carritos.findIndex(p => p.id === id);

            cart.id = id;
            carritos[index] = cart;
            await fs.writeFile(this.filename,JSON.stringify(carritos));
        }
        catch(e){
            return `Hubo un error "${e.message}"`
        }
    }

    async deleteAll(){
        try{
            await fs.writeFile(this.filename,"[]");
        }
        catch(e){
            return `Hubo un error "${e}"`
        }
    }

    async __getNextId(){
        try{
            const carritos = await this.getAll();
            const ids = carritos.map(p => (p.id) );
            
            return ids.length === 0 ? 1 : Math.max(...ids) + 1;
        }
        catch(e){
            return `Hubo un error "${e}"`
        }
    }

    async addProductsCart(products, cart_id){
        try{
            const carrito = await this.getById(cart_id);
            const producto = new Producto();
            for(const p of products){
                const prod = await producto.getById(p.id);
                if (prod !== null){
                    carrito.productos.push(prod);
                }
            }
            await this.updateById(cart_id, carrito);
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }

    async deleteProductCart(product_id, cart_id){
        const carrito = await this.getById(cart_id);
        let productos = carrito.productos;
        const index = productos.findIndex(p => p.id === product_id);
        productos.splice(index, 1);
        carrito.productos = productos;

        await this.updateById(cart_id, carrito);
    }
}

module.exports = Carrito;