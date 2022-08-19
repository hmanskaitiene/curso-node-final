import OrderService  from '../services/ordenes.js';
const orderService = new OrderService();

const createOrder = async(req, res) => {
    const idCart = req.params.idCart;
    const response = await orderService.createOrder(idCart);
    res.status(response.status).json(response.data)
}

const getOrdersByEmail = async(req, res) => {
    const email = req.params.email;
    const response = await orderService.getOrdersByEmail(email);
    res.status(response.status).json(response.data)
}
export default {
    createOrder,
    getOrdersByEmail,
}