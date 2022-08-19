import logger  from '../utils/logger.js';
import ProductoDto from '../dtos/productoDto.js'
import ProductoPersistenceFactory from '../daos/productos/productoPersistenceFactory.js';   

class ProductService {
    constructor() {
        this.productosDao;
        this.init();
    }

    init = async () => {
        this.productosDao = await ProductoPersistenceFactory.getPersistence();
    };

    getProducts = async ( id ) => {
        if (id !== null){
            const producto = await this.productosDao.getById(id);
            if (producto !== null){
                return { status:200, data:new ProductoDto(producto) }
            } else {
                const error = `Producto no encontrado`;
                logger.error(error);
                return { status:400, data:{error} }
            }
        } else {
            let result = await this.productosDao.getAll();  
            let data = result.map((product) => new ProductoDto(product));
            return { status:200, data }      
        }
    }

    getProductsCategory = async ( categoria ) => {
        if (categoria !== null){
            const results = await this.productosDao.getByField('categoria', categoria, false);
            const data = results.map((producto) => new ProductoDto(producto));
            return { status:200, data }
        } else {
            let result = await this.productosDao.getAll();  
            let data = result.map((product) => new ProductoDto(product));
            return { status:200, data }      
        }
    }

    addProducts = async(productos) => {
        const data = await this.productosDao.addProducts(productos);
        return { status:201, data}
    }

    updateProduct = async(id, content) => {
        const producto = await this.productosDao.getById(id);
    
        if (producto !== null) {
            const data = await this.productosDao.updateById(id, content);
            return { status:200, data }
        } else {
            const error = `Producto no encontrado`;
            logger.error(error);
            return { status:400, data:{error} }
        }
    }
    deleteProduct = async (id) => {
        const producto = await this.productosDao.getById(id);

        if (producto !== null) {
            const data = await this.productosDao.deleteById(id)
            return { status:200, data }
        } else {
            const error = `Producto no encontrado`;
            logger.error(error);
            return { status:400, data:{error} }
        }
    }
    
}

export default ProductService;