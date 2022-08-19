import CartService  from '../services/carrito.js';
const cartService = new CartService();

const addCart = async(req, res) => {
    const response = await cartService.addCart(req.body);
    res.status(response.status).json(response.data)
}

const deleteCart = async (req, res) => {
    const id = req.params.id;
    const response = await cartService.deleteCart(id);
    res.status(response.status).json(response.data)
}

const addProductsCart = async (req, res) => {
    const id = req.params.id;
    const productos = req.body;
    const response = await cartService.addProductsCart(id, productos);
    res.status(response.status).json(response.data) 
}

const getProductsCart = async (req, res) => {
    const cartId = req.params.id;
    const response = await cartService.getProductsCart(cartId);
    res.status(response.status).json(response.data) 
}

const deleteProductCart = async (req, res) => {
    const cartId = req.params.id;
    const prodId = req.params.id_prod;
    const response = await cartService.deleteProductCart(cartId, prodId);
    res.status(response.status).json(response.data) 
}

const getCartByEmail = async (req, res) => {
    const email = req.params.email;
    const response = await cartService.getCartByEmail(email);
    res.status(response.status).json(response.data) 
}

export default {
    addCart,
    deleteCart,
    addProductsCart,
    getProductsCart,
    deleteProductCart,
    getCartByEmail,
}