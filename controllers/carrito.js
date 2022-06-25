const Carrito  = require('../models/carrito');
const cart= new Carrito();

const addCart = async(req, res) => {
    const id = await cart.save()
    res.status(201).json({id});
}

const deleteCart = async (req, res) => {
    const id = parseInt(req.params.id);
    const carrito = await cart.getById(id);
    if (carrito !== null) {
        await cart.deleteById(id)
        res.status(200).json({mensaje: `Se ha eliminado el carrito ${id}`});
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

const getProductsCart = async (req, res) => {
    const id = parseInt(req.params.id);
    const carrito = await cart.getById(id);
    if (carrito !== null) {
        res.status(200).json(carrito.productos);
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

const addProductsCart = async (req, res) => {
    const id = parseInt(req.params.id);
    const productos = req.body;
    const carrito = await cart.getById(id);
    if (carrito !== null) {
        await cart.addProductsCart(productos, id);
        res.status(200).json({mensaje: `Productos agregados al carrito: ${id}`});
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

const deleteProductCart = async (req, res) => {
    const id = parseInt(req.params.id);
    const id_prod = parseInt(req.params.id_prod);
    const carrito = await cart.getById(id);
    if (carrito !== null) {
        await cart.deleteProductCart(id_prod, id);
        res.status(200).json({mensaje: `Se ha eliminado el producto ${id_prod} del carrito: ${id}`});
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

module.exports = {
    addCart,
    deleteCart,
    getProductsCart,
    addProductsCart,
    deleteProductCart,
}