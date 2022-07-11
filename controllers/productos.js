import {Producto}  from '../daos/index.js';

const product= new Producto();

const getProducts = async(req, res) => {
    const id = req.params.id || null;

    if (id !== null){
        const producto = await product.getById(id);
        if (producto !== null){
            res.status(200).json(producto);
        } else {
            res.status(400).json({error:'producto no encontrado'});
        }
    } else {
        const productos = await product.getAll();        
        res.status(200).json(productos);
    }
}

const addProducts = async(req, res) => {
    const productos = req.body;
    await product.addProducts(productos);
    res.status(201).json({mensaje: `Productos agregados`});
}
  
const updateProduct = async(req, res) => {
    const id = req.params.id;
    const producto = await product.getById(id);

    if (producto !== null) {
        await product.updateById(id, req.body);
        res.status(200).json({mensaje: `Se ha actualizado el producto ${id}`});
    } else {
        res.status(400).json({error:'producto no encontrado'});
    }
}

const deleteProduct = async (req, res) => {

    const id = req.params.id;
    const producto = await product.getById(id);
    if (producto !== null) {
        console.log(id);
        await product.deleteById(id)
        res.status(200).json({mensaje: `Se ha eliminado el producto ${id}`});
    } else {
        res.status(400).json({error:'producto no encontrado'});
    }
}
export {
    getProducts,
    addProducts,
    updateProduct,
    deleteProduct,
}