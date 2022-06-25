const Producto  = require('../models/producto');
const product= new Producto();

const getProducts = async(req, res) => {
    const id = req.params.id || null;

    if (id !== null){
        const filter = await product.getById(parseInt(id));
        res.status(200).json(filter);
    } else {
        const productos = await product.getAll();        
        res.status(200).json(productos);
    }
}

const addProduct = async(req, res) => {
    const producto = req.body;
    const id = await product.save(producto)
    res.status(201).json({id});
}

const updateProduct = async(req, res) => {
    const id = parseInt(req.params.id);
    const producto = await product.getById(id);

    if (producto !== null) {
        await product.updateById(id, req.body);
        res.status(200).json({mensaje: `Se ha actualizado el producto ${id}`});
    } else {
        res.status(400).json({error:'producto no encontrado'});
    }
}

const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await product.getById(id);
    if (producto !== null) {
        await product.deleteById(id)
        res.status(200).json({mensaje: `Se ha eliminado el producto ${id}`});
    } else {
        res.status(400).json({error:'producto no encontrado'});
    }
}
module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
}