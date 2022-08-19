import { Router } from 'express';
import ordersController from '../controllers/orden.js';
import { validarJWT } from '../middlewares/auth-check.js';
const router = Router();

router.post('/:idCart',validarJWT, ordersController.createOrder);
router.get('/email/:email',validarJWT, ordersController.getOrdersByEmail);



export default router;