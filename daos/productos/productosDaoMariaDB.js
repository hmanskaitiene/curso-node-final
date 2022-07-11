import {ContenedorDB} from '../../contenedores/index.js';

class ProductosDaoMariaDB extends ContenedorDB {
    constructor() {
        super('productos');
    }
    async save(item) {
        try{
            item.timestamp = Date.now();
            const id = await this.saveContent(item);
            return id;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }
    async addProducts(products){
        try{
            for(const p of products){
                await this.save(p);
            }
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }
}

export default ProductosDaoMariaDB;