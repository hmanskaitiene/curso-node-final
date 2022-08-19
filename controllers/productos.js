import ProductService  from '../services/productos.js';
const productService = new ProductService();

const getProducts = async(req, res) => {
    const id = req.params.id || null;
    const response = await productService.getProducts(id);
    res.status(response.status).json(response.data)
}

const getProductsCategory = async(req, res) => {
    const categoria = req.params.categoria || null;
    const response = await productService.getProductsCategory(categoria);
    res.status(response.status).json(response.data)
}
const addProducts = async(req, res) => {
    const productos = req.body;
    const response = await productService.addProducts(productos);
    res.status(response.status).json(response.data)
}

const updateProduct = async(req, res) => {
    const id = req.params.id;
    const producto = req.body
    const response = await productService.updateProduct(id, producto);
    res.status(response.status).json(response.data)
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const response = await productService.deleteProduct(id);
    res.status(response.status).json(response.data)
}

export default {
    getProducts,
    getProductsCategory,
    addProducts,
    updateProduct,
    deleteProduct,
}